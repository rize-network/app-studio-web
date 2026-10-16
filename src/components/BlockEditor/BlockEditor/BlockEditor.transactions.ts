import {
  Block,
  EditorSelection,
  Inline,
  parseInline,
  replaceRange,
} from './BlockEditor.model';

type Transaction = { value: string; selection: EditorSelection };
const listPrefix = /^(\s*)([-*+] |\d+[.)] )/;

function splitInline(raw: string, at: number): [string, string] {
  for (const node of parseInline(raw)) {
    const start = node.children?.[0]?.start ?? node.contentStart;
    const end =
      node.children?.[node.children.length - 1]?.end ??
      (start === undefined ? undefined : node.end - (start - node.start));
    if (start !== undefined && end !== undefined && at >= start && at <= end) {
      const [left, right] = splitInline(raw.slice(start, end), at - start);
      const wrap = (text: string) =>
        text
          ? raw.slice(node.start, start) + text + raw.slice(end, node.end)
          : '';
      return [
        raw.slice(0, node.start) + wrap(left),
        wrap(right) + raw.slice(node.end),
      ];
    }
    if (node.kind === 'text' && at === node.start && raw[at - 1] === '\\') at--;
  }
  return [raw.slice(0, at), raw.slice(at)];
}

function transaction(
  value: string,
  target: EditorSelection,
  text: string,
  caret: number
): Transaction {
  return {
    value: replaceRange(value, target, text),
    selection: { start: caret, end: caret },
  };
}

export function splitEditorBlock(
  value: string,
  blocks: Block[],
  selected: EditorSelection,
  soft = false
): Transaction | null {
  const block = blocks.find(
    (item) => selected.start >= item.start && selected.end <= item.end
  );
  if (!block) return null;
  const newline =
    block.raw.includes('\r\n') || value.includes('\r\n') ? '\r\n' : '\n';
  if (block.kind === 'codeBlock' || block.kind === 'table' || soft) {
    if (
      block.kind === 'table' &&
      /[|\r\n]/.test(value.slice(selected.start, selected.end))
    )
      return null;
    const text = block.kind === 'codeBlock' ? newline : '<br>';
    return transaction(value, selected, text, selected.start + text.length);
  }
  const start = selected.start - block.start;
  const end = selected.end - block.start;
  let left: string;
  let right: string;
  if (block.kind === 'bullet' || block.kind === 'number') {
    const rowStart = block.raw.lastIndexOf('\n', Math.max(0, start - 1)) + 1;
    const endOfRow = block.raw.indexOf('\n', end);
    const rowEnd = endOfRow < 0 ? block.raw.length : endOfRow;
    const firstLine = block.raw
      .slice(
        rowStart,
        block.raw.indexOf('\n', start) < 0
          ? block.raw.length
          : block.raw.indexOf('\n', start)
      )
      .replace(/\r$/, '');
    const prefix = firstLine.match(listPrefix)?.[0] || '';
    const lastStart = block.raw.lastIndexOf('\n', Math.max(0, end - 1)) + 1;
    const lastLine = block.raw.slice(lastStart, rowEnd).replace(/\r$/, '');
    const lastPrefix = lastLine.match(listPrefix)?.[0] || '';
    left = splitInline(
      firstLine.slice(prefix.length),
      Math.max(0, start - rowStart - prefix.length)
    )[0];
    right = splitInline(
      lastLine.slice(lastPrefix.length),
      Math.max(0, end - lastStart - lastPrefix.length)
    )[1];
    const before = block.raw.slice(0, rowStart).replace(/\r?\n$/, '');
    let after = block.raw.slice(rowEnd).replace(/^\r?\n/, '');
    if (!left && !right) {
      if (/^\s/.test(prefix)) {
        const outdented = prefix.replace(/^(?: {1,2}|\t)/, '');
        const text = [before, outdented, after]
          .filter((part, i) => part || i === 1)
          .join(newline);
        return transaction(
          value,
          block,
          text,
          block.start +
            (before ? before.length + newline.length : 0) +
            outdented.length
        );
      }
      const text = [before, '', after]
        .filter((part, i) => part || i === 1)
        .join(newline + newline);
      return transaction(
        value,
        block,
        text,
        block.start + (before ? before.length + newline.length * 2 : 0)
      );
    }
    const nextPrefix = prefix.replace(
      /(\d+)([.)] )$/,
      (_, number, marker) => `${Number(number) + 1}${marker}`
    );
    if (/\d+[.)] $/.test(prefix)) {
      const indent = prefix.match(/^\s*/)?.[0] || '';
      after = after
        .split(newline)
        .map((line) =>
          line.replace(/^(\s*)(\d+)([.)] )/, (raw, spaces, number, marker) =>
            spaces === indent ? spaces + (Number(number) + 1) + marker : raw
          )
        )
        .join(newline);
    }
    const text = [before, prefix + left, nextPrefix + right, after]
      .filter((part, i) => part || i === 1 || i === 2)
      .join(newline);
    return transaction(
      value,
      block,
      text,
      block.start +
        (before ? before.length + newline.length : 0) +
        prefix.length +
        left.length +
        newline.length +
        nextPrefix.length
    );
  }
  const prefix = block.raw.slice(0, block.bodyStart - block.start);
  left = splitInline(block.body, Math.max(0, start - prefix.length))[0];
  right = splitInline(block.body, Math.max(0, end - prefix.length))[1];
  if (!left && right) right = prefix + right;
  else {
    left = prefix + left;
    if (block.kind === 'quote' && right) right = '> ' + right;
  }
  const text = left + newline + newline + right;
  return transaction(
    value,
    block,
    text,
    block.start +
      left.length +
      newline.length * 2 +
      (!left && right ? prefix.length : block.kind === 'quote' && right ? 2 : 0)
  );
}

function prose(block: Block) {
  if (block.kind === 'codeBlock') {
    return block.body
      .split(/\r?\n/)
      .map((line) => {
        if (!line) return '';
        const fence = '`'.repeat(
          Math.max(
            1,
            ...Array.from(line.matchAll(/`+/g), (match) => match[0].length + 1)
          )
        );
        return fence + line + fence;
      })
      .join('<br>');
  }
  return (
    block.kind === 'quote'
      ? block.raw.replace(/^> ?/gm, '')
      : block.kind === 'bullet' || block.kind === 'number'
      ? block.raw.replace(/^(\s*)([-*+] |\d+[.)] )/gm, '')
      : block.body
  ).replace(/\r?\n/g, '<br>');
}

export function mergeEditorBlock(
  value: string,
  blocks: Block[],
  id: string,
  itemPosition?: number
): Transaction | null {
  const index = blocks.findIndex((block) => block.id === id);
  const block = blocks[index];
  const previous = blocks[index - 1];
  if (
    block &&
    itemPosition !== undefined &&
    (block.kind === 'bullet' || block.kind === 'number')
  ) {
    const start =
      block.raw.lastIndexOf('\n', itemPosition - block.start - 1) + 1;
    const prefix = block.raw.slice(start).match(listPrefix)?.[0];
    if (!start || !prefix) return null;
    const end = start - (block.raw[start - 2] === '\r' ? 2 : 1);
    let tail = block.raw.slice(start + prefix.length);
    if (/\d+[.)] $/.test(prefix)) {
      const indent = prefix.match(/^\s*/)?.[0] || '';
      tail = tail.replace(
        /(\r?\n)([ \t]*)(\d+)([.)] )/g,
        (raw, newline, spaces, number, marker) =>
          spaces === indent
            ? newline + spaces + Math.max(1, Number(number) - 1) + marker
            : raw
      );
    }
    return transaction(
      value,
      block,
      block.raw.slice(0, end) + tail,
      block.start + end
    );
  }
  // Tables keep their cell boundaries instead of flattening the matrix into text.
  if (
    !block ||
    !previous ||
    block.kind === 'table' ||
    previous.kind === 'table'
  )
    return null;
  if (!previous.raw) {
    return transaction(
      value,
      { start: previous.start, end: block.end },
      block.raw,
      previous.start + block.bodyStart - block.start
    );
  }
  let text = prose(block);
  const caret =
    previous.kind === 'codeBlock'
      ? previous.bodyStart + previous.body.length
      : previous.end;
  if (previous.kind === 'codeBlock') {
    const plain = (nodes: Inline[]): string =>
      nodes
        .map((node) =>
          node.children
            ? plain(node.children)
            : node.kind === 'break'
            ? '\n'
            : node.text || ''
        )
        .join('');
    text = block.kind === 'codeBlock' ? block.body : plain(parseInline(text));
    const raw = replaceRange(
      previous.raw,
      { start: caret - previous.start, end: caret - previous.start },
      text
    );
    return transaction(
      value,
      { start: previous.start, end: block.end },
      raw,
      caret
    );
  }
  return transaction(
    value,
    { start: previous.end, end: block.end },
    text,
    caret
  );
}
