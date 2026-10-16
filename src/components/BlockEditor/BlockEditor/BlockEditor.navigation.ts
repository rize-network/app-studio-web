import { editorSourceOffset, readEditorSelection } from './BlockEditor.dom';
import { EditorSelection } from './BlockEditor.model';

type Caret = { node: Node; offset: number; source: number };
let graphemes: Intl.Segmenter | undefined;

function carets(block: HTMLElement): Caret[] {
  graphemes ??= new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  const points: Caret[] = [];
  const walker = block.ownerDocument.createTreeWalker(
    block,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT
  );
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest('[contenteditable="false"]')) continue;
    if (node.nodeType === 1) {
      if ((node as Element).tagName !== 'BR') continue;
      const parent = node.parentNode!;
      const offset = Array.from(parent.childNodes).indexOf(node as ChildNode);
      const leaf = parent as HTMLElement;
      if (
        leaf.dataset.sourceStart !== undefined &&
        leaf.dataset.sourceStart === leaf.dataset.sourceEnd &&
        !leaf.textContent
      ) {
        points.push({
          node: parent,
          offset: 0,
          source: Number(leaf.dataset.sourceStart),
        });
        continue;
      }
      const source =
        (node as HTMLElement).dataset.sourceEnd !== undefined
          ? Number((node as HTMLElement).dataset.sourceEnd)
          : editorSourceOffset(block, parent, offset + 1);
      if (!points.length) {
        const before = editorSourceOffset(block, parent, offset);
        if (before !== null)
          points.push({ node: parent, offset, source: before });
      }
      if (
        source !== null &&
        Number.isFinite(source) &&
        points[points.length - 1]?.source !== source
      )
        points.push({ node: parent, offset: offset + 1, source });
      continue;
    }
    const text = node.textContent || '';
    const offsets = [
      0,
      ...Array.from(
        graphemes.segment(text),
        (part) => part.index + part.segment.length
      ),
    ];
    for (const offset of offsets) {
      const source = editorSourceOffset(block, node, offset);
      if (source !== null && points[points.length - 1]?.source !== source)
        points.push({ node, offset, source });
    }
  }
  if (!points.length) {
    const leaf = block.querySelector<HTMLElement>('[data-source-start]');
    if (leaf)
      points.push({
        node: leaf,
        offset: 0,
        source: Number(leaf.dataset.sourceStart),
      });
  }
  return points;
}

function rect(point: Caret) {
  const range = point.node.ownerDocument!.createRange();
  range.setStart(point.node, point.offset);
  range.collapse(true);
  const bounds = range.getBoundingClientRect?.();
  return bounds?.height
    ? bounds
    : (point.node.nodeType === 1
        ? (point.node as Element)
        : point.node.parentElement
      )?.getBoundingClientRect();
}

function sameTextBoundary(a: Caret, b: Caret) {
  const line = 'p,h1,h2,h3,li,td,th,pre,blockquote,div';
  return (
    a.node !== b.node &&
    a.offset === a.node.textContent?.length &&
    b.offset === 0 &&
    a.node.parentElement?.closest(line) === b.node.parentElement?.closest(line)
  );
}

/** Move the focus, retaining the original anchor even when the selection reverses. */
export function moveEditorSelection(
  host: HTMLElement,
  key: string,
  extend: boolean,
  preferredX: number | null
): { selection: EditorSelection; x: number | null } | null {
  // shortcut: older engines keep native arrows; polyfill Segmenter if they need cross-block navigation.
  if (typeof Intl.Segmenter !== 'function') return null;
  const selected = host.ownerDocument.getSelection();
  const previous = readEditorSelection(host, true);
  if (!previous || !selected?.focusNode || !selected.anchorNode) return null;
  const blocks = Array.from(
    host.querySelectorAll<HTMLElement>('[data-block-id]')
  );
  const backward = key === 'ArrowLeft' || key === 'ArrowUp';
  const vertical = key === 'ArrowUp' || key === 'ArrowDown';
  const focusElement =
    selected.focusNode.nodeType === 1
      ? (selected.focusNode as Element)
      : selected.focusNode.parentElement;
  let index = blocks.indexOf(
    focusElement?.closest<HTMLElement>('[data-block-id]')!
  );
  if (index < 0) return null;
  let points = carets(blocks[index]);
  if (!points.length) return null;
  const focus = previous.backward ? previous.start : previous.end;
  let at = points.findIndex(
    (point) =>
      point.node === selected.focusNode && point.offset === selected.focusOffset
  );
  if (at < 0)
    at = points.reduce(
      (best, point, i) =>
        Math.abs(point.source - focus) < Math.abs(points[best].source - focus)
          ? i
          : best,
      0
    );
  let next = points[at];
  let x = vertical ? preferredX ?? rect(next)?.left ?? 0 : null;
  if (!extend && previous.start !== previous.end && !vertical) {
    // A plain horizontal arrow collapses to the corresponding selection edge.
    const edge = backward ? previous.start : previous.end;
    const edgeBlock = blocks.find((block) => {
      const leaves = block.querySelectorAll<HTMLElement>('[data-source-start]');
      return (
        leaves.length &&
        edge >= Number(leaves[0].dataset.sourceStart) &&
        edge <= Number(leaves[leaves.length - 1].dataset.sourceEnd)
      );
    });
    const candidates = edgeBlock ? carets(edgeBlock) : points;
    next = candidates.reduce((best, point) =>
      Math.abs(point.source - edge) < Math.abs(best.source - edge)
        ? point
        : best
    );
  } else if (!vertical) {
    const step = backward ? -1 : 1;
    let to = at + step;
    if (
      to >= 0 &&
      to < points.length &&
      (backward
        ? sameTextBoundary(points[to], points[at])
        : sameTextBoundary(points[at], points[to]))
    )
      to += step;
    if (to >= 0 && to < points.length) next = points[to];
    else {
      points = blocks[index + step] ? carets(blocks[index + step]) : [];
      if (points.length) next = points[backward ? points.length - 1 : 0];
    }
  } else {
    const current = rect(next);
    const line = (candidates: Caret[], within: boolean) => {
      const measured = candidates
        .map((point) => ({ point, rect: rect(point) }))
        .filter(
          (item) =>
            item.rect &&
            (!within ||
              !current ||
              (backward
                ? item.rect.bottom < current.bottom - current.height / 2
                : item.rect.top > current.top + current.height / 2))
        );
      if (!measured.length) return null;
      const y = backward
        ? Math.max(...measured.map((item) => item.rect!.top))
        : Math.min(...measured.map((item) => item.rect!.top));
      const row = measured.filter(
        (item) =>
          Math.abs(item.rect!.top - y) < Math.max(1, item.rect!.height / 2)
      );
      return row.reduce((best, item) =>
        Math.abs(item.rect!.left - x!) < Math.abs(best.rect!.left - x!)
          ? item
          : best
      ).point;
    };
    const within = line(points, true);
    if (within) next = within;
    else {
      index += backward ? -1 : 1;
      if (blocks[index]) next = line(carets(blocks[index]), false) ?? next;
    }
  }
  const anchor: Caret = extend
    ? {
        node: selected.anchorNode,
        offset: selected.anchorOffset,
        source: previous.backward ? previous.end : previous.start,
      }
    : next;
  const editable = (
    next.node.nodeType === 1
      ? (next.node as HTMLElement)
      : next.node.parentElement
  )?.closest<HTMLElement>('[data-editor-input]');
  editable?.focus({ preventScroll: true });
  selected.setBaseAndExtent(anchor.node, anchor.offset, next.node, next.offset);
  const caretRect = rect(next);
  if (
    caretRect &&
    (caretRect.top < 0 ||
      caretRect.bottom >
        (host.ownerDocument.defaultView?.innerHeight ?? Infinity))
  )
    next.node.parentElement?.scrollIntoView?.({ block: 'nearest' });
  return {
    selection: {
      start: Math.min(anchor.source, next.source),
      end: Math.max(anchor.source, next.source),
      ...(next.source < anchor.source ? { backward: true } : {}),
    },
    x,
  };
}
