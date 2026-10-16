import { EditorSelection } from './BlockEditor.model';

const sourcePositions = new WeakMap<Node, number[]>();

export function readEditorSelection(
  host: HTMLElement,
  directional = false
): EditorSelection | null {
  const selected = host.ownerDocument.getSelection();
  if (
    !selected?.anchorNode ||
    !selected.focusNode ||
    !host.contains(selected.anchorNode) ||
    !host.contains(selected.focusNode)
  )
    return null;
  const anchor = editorSourceOffset(
    host,
    selected.anchorNode,
    selected.anchorOffset
  );
  const focus = editorSourceOffset(
    host,
    selected.focusNode,
    selected.focusOffset
  );
  return anchor === null || focus === null
    ? null
    : {
        start: Math.min(anchor, focus),
        end: Math.max(anchor, focus),
        ...(directional && focus < anchor ? { backward: true } : {}),
      };
}

export function editorSourceOffset(
  host: HTMLElement,
  node: Node,
  position: number
): number | null {
  const element = node.nodeType === 1 ? (node as Element) : node.parentElement;
  const block = element?.closest<HTMLElement>('[data-block-start]');
  const positions = sourcePositions.get(node);
  if (positions?.[position] !== undefined)
    return Number(block?.dataset.blockStart || 0) + positions[position];
  const leaf = element?.closest<HTMLElement>('[data-source-start]');
  if (leaf && host.contains(leaf)) {
    if (node.nodeType === 3 && leaf.childNodes.length === 1)
      return Number(leaf.dataset.sourceStart) + position;
    const range = host.ownerDocument.createRange();
    range.selectNodeContents(leaf);
    range.setEnd(node, position);
    return Number(leaf.dataset.sourceStart) + range.toString().length;
  }
  if (!block) return null;
  if (node.nodeType === 1) {
    const child = node.childNodes[position] || node.childNodes[position - 1];
    if (child?.nodeType === 1) {
      const element = child as HTMLElement;
      const leaves = element.matches('[data-source-start]')
        ? [element]
        : Array.from(
            element.querySelectorAll<HTMLElement>('[data-source-start]')
          );
      const after = position === node.childNodes.length;
      const leaf = after ? leaves[leaves.length - 1] : leaves[0];
      if (leaf)
        return Number(
          after ? leaf.dataset.sourceEnd : leaf.dataset.sourceStart
        );
    }
  }
  const leaves = Array.from(
    block.querySelectorAll<HTMLElement>('[data-source-start]')
  );
  return position === 0
    ? Number(leaves[0]?.dataset.sourceStart ?? block.dataset.blockStart)
    : Number(
        leaves[leaves.length - 1]?.dataset.sourceEnd ?? block.dataset.blockStart
      );
}

export function restoreEditorSelection(
  host: HTMLElement,
  selection: EditorSelection
): boolean {
  const leaves = Array.from(
    host.querySelectorAll<HTMLElement>('[data-source-start]')
  );
  const point = (position: number): [Node, number] | null => {
    let best: HTMLElement | undefined;
    let distance = Infinity;
    for (const leaf of leaves) {
      const start = Number(leaf.dataset.sourceStart);
      const end = Number(leaf.dataset.sourceEnd);
      const gap =
        position < start
          ? start - position
          : position > end
          ? position - end
          : 0;
      if (gap < distance) {
        best = leaf;
        distance = gap;
      }
    }
    if (!best) return null;
    if (best.tagName === 'BR' && best.parentNode) {
      const index = Array.from(best.parentNode.childNodes).indexOf(best);
      return [
        best.parentNode,
        index + (position >= Number(best.dataset.sourceEnd) ? 1 : 0),
      ];
    }
    const text = best.firstChild;
    return text?.nodeType === 3
      ? [
          text,
          Math.max(
            0,
            Math.min(
              position - Number(best.dataset.sourceStart),
              text.textContent?.length || 0
            )
          ),
        ]
      : [best, 0];
  };
  const start = point(selection.start);
  const end = point(selection.end);
  if (!start || !end) return false;
  const range = host.ownerDocument.createRange();
  range.setStart(...start);
  range.setEnd(...end);
  (
    (selection.backward ? start : end)[0].parentElement?.closest(
      '[contenteditable="true"]'
    ) as HTMLElement | null
  )?.focus({ preventScroll: true });
  const selected = host.ownerDocument.getSelection();
  if (selected?.setBaseAndExtent) {
    const anchor = selection.backward ? end : start;
    const focus = selection.backward ? start : end;
    selected.setBaseAndExtent(...anchor, ...focus);
  } else {
    selected?.removeAllRanges();
    selected?.addRange(range);
    if (selection.backward && selected?.extend) {
      selected.collapse(...end);
      selected.extend(...start);
    }
  }
  return true;
}

/** Only editor-owned semantic elements are read. Pasted HTML is never imported. */
export function serializeEditorDom(root: HTMLElement): {
  text: string;
  selection: EditorSelection;
} {
  const selected = root.ownerDocument.getSelection();
  let output = '';
  let anchor: number | undefined;
  let focus: number | undefined;
  const boundary = (node: Node, offset: number) => {
    const positions = sourcePositions.get(node) || [];
    positions[offset] = output.length;
    sourcePositions.set(node, positions);
    if (selected?.anchorNode === node && selected.anchorOffset === offset)
      anchor = output.length;
    if (selected?.focusNode === node && selected.focusOffset === offset)
      focus = output.length;
  };
  const write = (value: string) => {
    output += value;
  };
  const walk = (node: Node, indent = '', code = false, quote = false) => {
    if (node.nodeType === 3) {
      const text = node.textContent || '';
      for (let i = 0; i <= text.length; i++) {
        boundary(node, i);
        if (i < text.length)
          write(
            code
              ? text[i]
              : text[i] === '\n' && quote
              ? '\n> '
              : /[\\`*_[\]<>~|#+]/.test(text[i])
              ? '\\' + text[i]
              : text[i]
          );
      }
      return;
    }
    if (node.nodeType !== 1) return;
    const element = node as HTMLElement;
    const tag = element.tagName.toLowerCase();
    if (
      ['script', 'style', 'iframe', 'object', 'embed'].includes(tag) ||
      element.contentEditable === 'false'
    )
      return;
    const wrap: Record<string, [string, string]> = {
      strong: ['**', '**'],
      b: ['**', '**'],
      em: ['*', '*'],
      i: ['*', '*'],
      u: ['<u>', '</u>'],
      s: ['~~', '~~'],
      del: ['~~', '~~'],
      strike: ['~~', '~~'],
      code: ['`', '`'],
      a: ['[', `](${element.getAttribute('href') || ''})`],
    };
    if (tag === 'code') {
      const fence = '`'.repeat(
        Math.max(
          1,
          ...Array.from(
            (element.textContent || '').matchAll(/`+/g),
            (match) => match[0].length + 1
          )
        )
      );
      wrap.code = [fence, fence];
    }
    if (tag === 'br') {
      boundary(node, 0);
      write(
        quote
          ? '\n> '
          : element.hasAttribute('data-source-start')
          ? '<br>'
          : '\n'
      );
      return;
    }
    const block =
      [
        'p',
        'div',
        'h1',
        'h2',
        'h3',
        'blockquote',
        'ul',
        'ol',
        'table',
      ].includes(tag) && node !== root;
    if (block && output && !output.endsWith(code ? '\n' : '\n\n'))
      write(code || output.endsWith('\n') ? '\n' : '\n\n');
    if (/^h[123]$/.test(tag)) write('#'.repeat(Number(tag[1])) + ' ');
    if (tag === 'blockquote') write('> ');
    if (tag === 'li') {
      if (output && !output.endsWith('\n')) write('\n');
      const ordered = element.parentElement?.tagName === 'OL';
      const index = element.parentElement
        ? Array.from(element.parentElement.children).indexOf(element) + 1
        : 1;
      write(
        (element.dataset.listIndent ?? indent) +
          (element.dataset.listMarker ?? (ordered ? `${index}. ` : '- '))
      );
    }
    if (tag === 'table') {
      const rows = Array.from(element.querySelectorAll('tr'));
      rows.forEach((row, index) => {
        if (index) write('\n');
        write('| ');
        Array.from(row.children).forEach((cell) => {
          walk(cell, indent);
          write(' | ');
        });
        if (index === 0)
          write(
            '\n' +
              (element.dataset.tableSeparator ||
                '| ' +
                  Array.from(row.children)
                    .map(() => '---')
                    .join(' | ') +
                  ' |')
          );
      });
      return;
    }
    if (!code && wrap[tag] && element.textContent) write(wrap[tag][0]);
    const children = Array.from(node.childNodes);
    children.forEach((child, index) => {
      boundary(node, index);
      walk(
        child,
        tag === 'li' ? indent + '  ' : indent,
        code || tag === 'code',
        quote || tag === 'blockquote'
      );
    });
    boundary(node, children.length);
    if (!code && wrap[tag] && element.textContent) write(wrap[tag][1]);
  };
  walk(root, '', root.hasAttribute('data-code-block'));
  return {
    text: output,
    selection: {
      start: Math.min(anchor ?? output.length, focus ?? output.length),
      end: Math.max(anchor ?? output.length, focus ?? output.length),
    },
  };
}
