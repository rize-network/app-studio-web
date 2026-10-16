import { generateId } from '../../../utils/id';

export type BlockKind =
  | 'paragraph'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bullet'
  | 'number'
  | 'quote'
  | 'codeBlock'
  | 'table';
export type EditorSelection = { start: number; end: number };
export type Block = {
  id: string;
  kind: BlockKind;
  start: number;
  end: number;
  raw: string;
  body: string;
  bodyStart: number;
  language?: string;
};
export type Inline = {
  kind:
    | 'text'
    | 'bold'
    | 'italic'
    | 'underline'
    | 'strikethrough'
    | 'code'
    | 'link'
    | 'break';
  start: number;
  end: number;
  text?: string;
  url?: string;
  contentStart?: number;
  children?: Inline[];
};
export const blockKinds: BlockKind[] = [
  'paragraph',
  'h1',
  'h2',
  'h3',
  'bullet',
  'number',
  'quote',
  'codeBlock',
  'table',
];

export function safeEditorUrl(value: string): boolean {
  const url = value.trim();
  return (
    !!url &&
    !/[\u0000-\u0020\u007f\\]/.test(url) &&
    (!/^[a-z][a-z\d+.-]*:/i.test(url) || /^(https?:|mailto:|tel:)/i.test(url))
  );
}

/** Offsets always refer to the original Markdown, including escaped characters. */
export function parseInline(value: string, offset = 0, depth = 0): Inline[] {
  if (depth > 20)
    return [
      { kind: 'text', text: value, start: offset, end: offset + value.length },
    ];
  const nodes: Inline[] = [];
  let i = 0;
  const plain = (text: string, start: number, end: number) =>
    nodes.push({
      kind: 'text',
      text,
      start: offset + start,
      end: offset + end,
    });
  while (i < value.length) {
    if (
      value[i] === '\\' &&
      /[\\`*{}\[\]()#+.!_>~|]/.test(value[i + 1] || '')
    ) {
      plain(value[i + 1], i + 1, i + 2);
      i += 2;
      continue;
    }
    const br = /^<br\s*\/?\s*>/i.exec(value.slice(i));
    if (br) {
      nodes.push({
        kind: 'break',
        start: offset + i,
        end: offset + i + br[0].length,
      });
      i += br[0].length;
      continue;
    }
    const ticks = /^`+/.exec(value.slice(i));
    if (ticks) {
      const close = value.indexOf(ticks[0], i + ticks[0].length);
      if (close >= 0) {
        nodes.push({
          kind: 'code',
          text: value.slice(i + ticks[0].length, close),
          start: offset + i,
          end: offset + close + ticks[0].length,
          contentStart: offset + i + ticks[0].length,
        });
        i = close + ticks[0].length;
        continue;
      }
    }
    const link = /^\[([^\]\n]+)\]\(([^\s()]*)\)/.exec(value.slice(i));
    if (link) {
      nodes.push({
        kind: 'link',
        start: offset + i,
        end: offset + i + link[0].length,
        url: link[2],
        children: parseInline(link[1], offset + i + 1, depth + 1),
      });
      i += link[0].length;
      continue;
    }
    const delimiters: Array<[string, string, Inline['kind']]> = [
      ['***', '***', 'bold'],
      ['**', '**', 'bold'],
      ['__', '__', 'bold'],
      ['~~', '~~', 'strikethrough'],
      ['<u>', '</u>', 'underline'],
      ['`', '`', 'code'],
      ['*', '*', 'italic'],
      ['_', '_', 'italic'],
    ];
    let matched = false;
    for (const [open, close, kind] of delimiters) {
      if (!value.startsWith(open, i)) continue;
      let end = value.indexOf(close, i + open.length);
      while (end >= 0 && value[end - 1] === '\\')
        end = value.indexOf(close, end + close.length);
      if (
        (open === '*' || open === '_') &&
        value.startsWith(open + open, end)
      ) {
        const nestedEnd = value.indexOf(open + open, end + 2);
        if (nestedEnd >= 0) end = value.indexOf(open, nestedEnd + 2);
      }
      if (
        (open === '**' || open === '__') &&
        value[end + 2] === open[0] &&
        (value
          .slice(i + 2, end)
          .match(new RegExp(`\\${open[0]}(?!\\${open[0]})`, 'g'))?.length ||
          0) %
          2 ===
          1
      )
        end++;
      if (end <= i + open.length) continue;
      if (
        open === '_' &&
        /\w/.test(value[i - 1] || '') &&
        /\w/.test(value[end + 1] || '')
      )
        continue;
      const body = value.slice(i + open.length, end);
      let children =
        kind === 'code'
          ? undefined
          : parseInline(body, offset + i + open.length, depth + 1);
      if (open === '***')
        children = [
          {
            kind: 'italic',
            start: offset + i + 2,
            end: offset + end + 1,
            children,
          },
        ];
      nodes.push({
        kind,
        start: offset + i,
        end: offset + end + close.length,
        text: kind === 'code' ? body : undefined,
        children,
      });
      matched = true;
      i = end + close.length;
      break;
    }
    if (!matched) {
      plain(value[i], i, i + 1);
      i++;
    }
  }
  // Merge adjacent text so a long paragraph does not create one DOM node per character.
  return nodes.reduce<Inline[]>((result, node) => {
    const last = result[result.length - 1];
    if (
      last?.kind === 'text' &&
      node.kind === 'text' &&
      last.end === node.start
    ) {
      last.text += node.text!;
      last.end = node.end;
    } else result.push(node);
    return result;
  }, []);
}

export function parseDocument(
  value: string,
  previous: Block[] = [],
  editedId?: string
): { blocks: Block[]; sourceMode: boolean } {
  const prose = value
    .replace(/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1\s*$/gm, '')
    .replace(/`[^`\n]*`/g, '');
  // shortcut: visual mode covers the documented subset, extend it when another construct needs visual editing.
  const unsupported =
    /^(?:import |export |-{3,}\s*$|\+\+\+\s*$|\s*:::|\s*\[.+\]:|\s*#{4,}\s|\s*(?:\*\s*){3,}$|\s*(?:-\s*){3,}$|\s*(?:_\s*){3,}$|\s*={3,}\s*$)|!\[|\[\^[^\]]+\]|\$\$|\{[^}\n]*\}|<(?!(?:\/?u>|br\s*\/?>))\/?[A-Za-z!]|&(?:#\w+|\w+);/m.test(
      prose
    ) ||
    /^[ \t]{2,}(?:`{3,}|~{3,})/m.test(value) ||
    /^(?:>[ \t]*>| {1,3}#{1,6}\s|#{1,6}\t|[ \t]{2,}(?:>|#{1,6}\s|\|)|[ \t]*(?:[-*+] |\d+[.)] )\[[ xX]\])|(?: {2,}|\\)\r?$/m.test(
      prose
    ) ||
    Array.from(prose.matchAll(/\[[^\]\n]+\]\(([^)\n]*)\)/g)).some(
      (match) => /[\s(]/.test(match[1]) || !safeEditorUrl(match[1])
    );
  const lines: Array<{ text: string; start: number; end: number }> = [];
  const re = /[^\r\n]+|\r\n|\n|\r/g;
  let start = 0;
  for (const match of value.matchAll(re)) {
    if (/^[\r\n]/.test(match[0])) {
      lines.push({
        text: value.slice(start, match.index),
        start,
        end: match.index!,
      });
      start = match.index! + match[0].length;
    }
  }
  if (start < value.length || !lines.length)
    lines.push({ text: value.slice(start), start, end: value.length });
  const blocks: Block[] = [];
  const used = new Set<string>();
  let sourceMode = unsupported;
  const list = /^\s*(?:[-*+] |\d+[.)] )/;
  const tableRule = /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/;
  for (let i = 0; i < lines.length; ) {
    if (!lines[i].text.trim()) {
      if (
        blocks.length &&
        (i === lines.length - 1 ||
          (i > 0 && !lines[i - 1].text.trim() && lines[i + 1]?.text.trim()))
      ) {
        const position = i === lines.length - 1 ? value.length : lines[i].start;
        const id =
          previous.find((b) => !b.raw && !used.has(b.id))?.id ||
          generateId('block');
        used.add(id);
        blocks.push({
          id,
          kind: 'paragraph',
          raw: '',
          body: '',
          start: position,
          end: position,
          bodyStart: position,
        });
      }
      i++;
      continue;
    }
    const first = lines[i];
    let last = i;
    let kind: BlockKind = 'paragraph';
    let prefix = 0;
    let language: string | undefined;
    const heading = /^(#{1,3}) (.*)$/.exec(first.text);
    const fence = /^ {0,3}(`{3,}|~{3,})([\w+-]*)\s*$/.exec(first.text);
    if (heading) {
      kind = `h${heading[1].length}` as BlockKind;
      prefix = heading[1].length + 1;
    } else if (fence) {
      kind = 'codeBlock';
      language = fence[2];
      last++;
      while (
        last < lines.length &&
        !new RegExp(`^ {0,3}${fence[1][0]}{${fence[1].length},}\\s*$`).test(
          lines[last].text
        )
      )
        last++;
      if (last >= lines.length) {
        sourceMode = true;
        last = lines.length - 1;
      }
      prefix =
        first.end -
        first.start +
        (value.slice(first.end, first.end + 2) === '\r\n' ? 2 : 1);
    } else if (
      i + 1 < lines.length &&
      first.text.includes('|') &&
      tableRule.test(lines[i + 1].text)
    ) {
      kind = 'table';
      last = i + 1;
      while (
        last + 1 < lines.length &&
        lines[last + 1].text.trim() &&
        lines[last + 1].text.includes('|')
      )
        last++;
    } else if (list.test(first.text)) {
      kind = /^\s*\d/.test(first.text) ? 'number' : 'bullet';
      while (
        last + 1 < lines.length &&
        lines[last + 1].text.trim() &&
        (list.test(lines[last + 1].text) ||
          /^\s{2,}\S/.test(lines[last + 1].text))
      )
        last++;
      prefix = first.text.match(list)![0].length;
    } else if (/^> ?/.test(first.text)) {
      kind = 'quote';
      prefix = first.text.match(/^> ?/)![0].length;
      while (last + 1 < lines.length && /^> ?/.test(lines[last + 1].text))
        last++;
    } else {
      while (
        last + 1 < lines.length &&
        lines[last + 1].text.trim() &&
        !/^(?:#{1,6} |>|`{3}|~{3})/.test(lines[last + 1].text) &&
        !list.test(lines[last + 1].text)
      )
        last++;
      if (/^ {4}\S/.test(first.text)) sourceMode = true;
    }
    const raw = value.slice(first.start, lines[last].end);
    const edited = previous.find(
      (b) => b.id === editedId && b.start === first.start && !used.has(b.id)
    );
    const candidate = previous[blocks.length];
    const prior =
      edited ||
      previous.find((b) => b.raw === raw && !used.has(b.id)) ||
      (candidate &&
      !used.has(candidate.id) &&
      value.indexOf(candidate.raw, lines[last].end) < 0
        ? candidate
        : undefined);
    const id = prior?.id || generateId('block');
    used.add(id);
    let body = raw.slice(prefix);
    if (kind === 'codeBlock')
      body = value
        .slice(first.start + prefix, lines[last].start)
        .replace(/\r?\n$/, '');
    blocks.push({
      id,
      kind,
      raw,
      start: first.start,
      end: lines[last].end,
      body,
      bodyStart: first.start + prefix,
      language,
    });
    i = last + 1;
  }
  if (!blocks.length)
    blocks.push({
      id: previous[0]?.id || generateId('block'),
      kind: 'paragraph',
      raw: '',
      body: '',
      start: value.length,
      end: value.length,
      bodyStart: value.length,
    });
  return { blocks, sourceMode };
}

export function replaceRange(
  value: string,
  selection: EditorSelection,
  text: string
): string {
  const start = Math.max(0, Math.min(selection.start, value.length));
  const end = Math.max(start, Math.min(selection.end, value.length));
  return value.slice(0, start) + text + value.slice(end);
}

export function transformBlock(block: Block, kind: BlockKind): string {
  const text =
    block.kind === 'codeBlock'
      ? block.body
      : block.raw.replace(/^(?:#{1,3} |\s*[-*+] |\s*\d+[.)] |> ?)/gm, '');
  if (kind === 'codeBlock') {
    const fence = '`'.repeat(
      Math.max(3, ...Array.from(text.matchAll(/`+/g), (m) => m[0].length + 1))
    );
    return `${fence}\n${text}\n${fence}`;
  }
  if (kind === 'table')
    return (
      '| Column 1 | Column 2 | Column 3 |\n| --- | --- | --- |\n| ' +
      text.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ') +
      ' |  |  |'
    );
  const prefix = (
    {
      paragraph: '',
      h1: '# ',
      h2: '## ',
      h3: '### ',
      bullet: '- ',
      number: '1. ',
      quote: '> ',
    } as const
  )[kind];
  return text
    .split(/\r?\n/)
    .map((line, index) =>
      kind === 'number' ? `${index + 1}. ${line}` : prefix + line
    )
    .join('\n');
}

/** Deleting all of an inline span also removes its now-empty Markdown markers. */
export function deletionRange(
  blocks: Block[],
  selection: EditorSelection
): EditorSelection {
  const target = { ...selection };
  const visit = (node: Inline) => {
    node.children?.forEach(visit);
    const first = node.children?.[0];
    const last = node.children?.[node.children.length - 1];
    const start = node.kind === 'code' ? node.contentStart : first?.start;
    const end =
      node.kind === 'code'
        ? node.contentStart! + (node.text?.length || 0)
        : last?.end;
    if (
      start !== undefined &&
      end !== undefined &&
      target.start <= start &&
      target.end >= end
    ) {
      target.start = Math.min(target.start, node.start);
      target.end = Math.max(target.end, node.end);
    }
  };
  blocks
    .filter(
      (block) =>
        block.kind !== 'codeBlock' &&
        selection.start < block.end &&
        selection.end > block.start
    )
    .forEach((block) => parseInline(block.raw, block.start).forEach(visit));
  return target;
}

/** Format text runs individually; block markers, code fences and table rules stay intact. */
export function formatBlocks(
  value: string,
  blocks: Block[],
  selection: EditorSelection,
  format: Inline['kind'],
  url?: string
): { value: string; selection: EditorSelection } {
  const ranges: EditorSelection[] = [];
  for (const block of blocks) {
    if (
      block.kind === 'codeBlock' ||
      block.end <= selection.start ||
      block.start >= selection.end
    )
      continue;
    let position = block.start;
    block.raw.split(/\r?\n/).forEach((line, index) => {
      const start = position;
      position += line.length + (block.raw.includes('\r\n') ? 2 : 1);
      const add = (from: number, to: number) => {
        const range = {
          start: Math.max(selection.start, from),
          end: Math.min(selection.end, to),
        };
        if (range.end > range.start) ranges.push(range);
      };
      if (block.kind === 'table') {
        if (index === 1) return;
        let from = line.startsWith('|') ? 1 : 0;
        for (let i = from; i <= line.length; i++) {
          if (i === line.length || (line[i] === '|' && line[i - 1] !== '\\')) {
            const raw = line.slice(from, i);
            const text = raw.trim();
            const offset = start + from + raw.indexOf(text);
            add(offset, offset + text.length);
            from = i + 1;
          }
        }
      } else {
        const prefix =
          line.match(/^(?:#{1,3} |\s*(?:[-*+] |\d+[.)] )|> ?)/)?.[0].length ||
          0;
        add(start + prefix, start + line.length);
      }
    });
  }
  let next = value;
  const target = { ...selection };
  const remove =
    ranges.length > 0 &&
    ranges.every((range) => formatRange(value, range, format, url).removed);
  for (const range of ranges.reverse()) {
    const result = formatRange(next, range, format, url);
    if (!remove && result.removed) continue;
    target.end =
      range.end === selection.end
        ? result.selection.end
        : target.end + result.value.length - next.length;
    if (range.start === selection.start) target.start = result.selection.start;
    next = result.value;
  }
  return { value: next, selection: target };
}

export function formatRange(
  value: string,
  selection: EditorSelection,
  format: Inline['kind'],
  url?: string
): { value: string; selection: EditorSelection; removed?: boolean } {
  const markers: Partial<Record<Inline['kind'], [string, string]>> = {
    bold: ['**', '**'],
    italic: ['*', '*'],
    underline: ['<u>', '</u>'],
    strikethrough: ['~~', '~~'],
    code: ['`', '`'],
  };
  let [open, close] =
    format === 'link' ? ['[', `](${url})`] : markers[format] || ['', ''];
  const selected =
    value.slice(selection.start, selection.end) ||
    (format === 'link' ? url || '' : '');
  const nodes = parseInline(selected);
  if (
    format !== 'link' &&
    nodes.length === 1 &&
    nodes[0].kind === format &&
    nodes[0].end === selected.length
  ) {
    const opening = format === 'code' ? nodes[0].contentStart! : open.length;
    const closing = format === 'code' ? opening : close.length;
    const text = selected.slice(opening, selected.length - closing);
    return {
      removed: true,
      value: replaceRange(value, selection, text),
      selection: { start: selection.start, end: selection.start + text.length },
    };
  }
  if (format === 'code')
    open = close = '`'.repeat(
      Math.max(
        1,
        ...Array.from(selected.matchAll(/`+/g), (m) => m[0].length + 1)
      )
    );
  if (
    value.slice(selection.start - open.length, selection.start) === open &&
    value.slice(selection.end, selection.end + close.length) === close
  ) {
    return {
      removed: true,
      value: replaceRange(
        value,
        {
          start: selection.start - open.length,
          end: selection.end + close.length,
        },
        selected
      ),
      selection: {
        start: selection.start - open.length,
        end: selection.end - open.length,
      },
    };
  }
  const markerRanges: Array<{ start: number; end: number }> = [];
  const strip = (node: Inline) => {
    node.children?.forEach(strip);
    if (node.kind !== format) return;
    const width =
      format === 'code' ? node.contentStart! - node.start : open.length;
    markerRanges.push(
      { start: node.start, end: node.start + width },
      {
        start:
          format === 'link'
            ? node.children![node.children!.length - 1].end
            : node.end - (format === 'code' ? width : close.length),
        end: node.end,
      }
    );
  };
  nodes.forEach(strip);
  let text = selected;
  markerRanges
    .sort((a, b) => b.start - a.start)
    .forEach((range) => {
      text = text.slice(0, range.start) + text.slice(range.end);
    });
  return {
    value: replaceRange(value, selection, open + text + close),
    selection: {
      start: selection.start + open.length,
      end: selection.start + open.length + text.length,
    },
  };
}
