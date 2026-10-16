import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { vi } from 'vitest';
import { BlockEditor } from '../components/BlockEditor/BlockEditor';
import { readEditorSelection } from '../components/BlockEditor/BlockEditor/BlockEditor.dom';

const fields = () => screen.getAllByRole('textbox');
const text = (index: number, leaf = 0) =>
  fields()[index].querySelectorAll('[data-source-start]')[leaf].firstChild!;
const select = (
  anchor: Node,
  anchorOffset: number,
  focus = anchor,
  focusOffset = anchorOffset
) => {
  act(() => {
    (focus.nodeType === 1 ? (focus as HTMLElement) : focus.parentElement)
      ?.closest<HTMLElement>('[data-editor-input]')
      ?.focus();
    document
      .getSelection()!
      .setBaseAndExtent(anchor, anchorOffset, focus, focusOffset);
    fireEvent(document, new Event('selectionchange'));
  });
};
const arrow = (key: string, shiftKey = false) =>
  fireEvent.keyDown(document.activeElement!, { key, shiftKey });
const selection = () => document.getSelection()!;

beforeAll(() => {
  Range.prototype.getBoundingClientRect ??= () => new DOMRect();
});
beforeEach(() => {
  vi.spyOn(Range.prototype, 'getBoundingClientRect').mockImplementation(
    function (this: Range) {
      const block = this.startContainer.parentElement?.closest(
        '[data-editor-input]'
      );
      const index = fields().indexOf(block as HTMLElement);
      const source = this.startContainer.textContent || '';
      const before = source.slice(0, this.startOffset).split('\n');
      const top = 100 + index * 100 + (before.length - 1) * 20;
      const left = before[before.length - 1].length * 10;
      return {
        top,
        bottom: top + 20,
        left,
        right: left,
        width: 0,
        height: 20,
        x: left,
        y: top,
        toJSON: () => ({}),
      };
    }
  );
});
afterEach(() => {
  cleanup();
  document.getSelection()?.removeAllRanges();
  vi.restoreAllMocks();
});

test('horizontal arrows cross block boundaries, skip Markdown markers and never change the document', () => {
  const change = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'One\n\n## Two'}
      onChange={change}
    />
  );
  select(text(0), 3);
  arrow('ArrowRight');
  expect(document.activeElement).toBe(fields()[1]);
  expect(selection().focusNode).toBe(text(1));
  expect(selection().focusOffset).toBe(0);
  arrow('ArrowLeft');
  expect(selection().focusNode).toBe(text(0));
  expect(selection().focusOffset).toBe(3);
  expect(change).not.toHaveBeenCalled();
});

test('Shift+arrows preserve the anchor while expanding, shrinking and reversing through three blocks', () => {
  render(<BlockEditor label="Editor" defaultValue={'One\n\nTwo\n\nThree'} />);
  const anchor = text(1);
  select(anchor, 0);
  arrow('ArrowLeft', true);
  arrow('ArrowLeft', true);
  expect(selection().anchorNode).toBe(anchor);
  expect(selection().anchorOffset).toBe(0);
  expect(selection().focusNode).toBe(text(0));
  expect(selection().focusOffset).toBe(2);
  expect(
    readEditorSelection(fields()[0].parentElement!.parentElement!, true)
      ?.backward
  ).toBe(true);
  arrow('ArrowRight', true);
  arrow('ArrowRight', true);
  expect(selection().isCollapsed).toBe(true);
  for (let i = 0; i < 6; i++) arrow('ArrowRight', true);
  expect(selection().anchorNode).toBe(anchor);
  expect(selection().focusNode).toBe(text(2));
  expect(selection().focusOffset).toBe(2);
});

test('plain horizontal arrows collapse either end of a backward multi-block selection', () => {
  render(<BlockEditor defaultValue={'One\n\nTwo'} />);
  select(text(1), 2, text(0), 1);
  arrow('ArrowRight');
  expect(selection().isCollapsed).toBe(true);
  expect(selection().focusNode).toBe(text(1));
  expect(selection().focusOffset).toBe(2);
  select(text(1), 2, text(0), 1);
  arrow('ArrowLeft');
  expect(selection().focusNode).toBe(text(0));
  expect(selection().focusOffset).toBe(1);
});

test('Up/Down retain the preferred column through shorter blocks and Shift keeps the anchor', () => {
  render(<BlockEditor defaultValue={'abcdef\n\nx\n\nabcdef'} />);
  const anchor = text(0);
  select(anchor, 4);
  arrow('ArrowDown', true);
  expect(selection().focusNode).toBe(text(1));
  expect(selection().focusOffset).toBe(1);
  arrow('ArrowDown', true);
  expect(selection().focusNode).toBe(text(2));
  expect(selection().focusOffset).toBe(4);
  arrow('ArrowUp', true);
  arrow('ArrowUp', true);
  expect(selection().isCollapsed).toBe(true);
  expect(selection().anchorNode).toBe(anchor);
  expect(selection().anchorOffset).toBe(4);
});

test('vertical navigation stays on visual lines inside code before crossing to another block', () => {
  render(
    <BlockEditor
      defaultValue={'before\n\n```ts\nabcdef\nx\nabcdef\n```\n\nafter'}
    />
  );
  select(text(1), 4);
  arrow('ArrowDown');
  expect(selection().focusOffset).toBe(8);
  arrow('ArrowDown');
  expect(selection().focusOffset).toBe(13);
  arrow('ArrowDown', true);
  expect(selection().focusNode).toBe(text(2));
  expect(selection().focusOffset).toBe(4);
});

test('horizontal navigation moves by grapheme, including combining accents, flags and joined emoji', () => {
  render(<BlockEditor defaultValue={'e\u0301👍🏽❤️‍🔥🇫🇷'} />);
  select(text(0), 0);
  const ends = [2, 6, 11, 15];
  for (const end of ends) {
    arrow('ArrowRight', true);
    expect(selection().focusOffset).toBe(end);
  }
  for (const end of [11, 6, 2, 0]) {
    arrow('ArrowLeft', true);
    expect(selection().focusOffset).toBe(end);
  }
  expect(selection().isCollapsed).toBe(true);
});

test('formatting boundaries do not cost an extra arrow and list markers are skipped', () => {
  render(<BlockEditor defaultValue={'A **bold** tail\n\n- item\n- next'} />);
  select(text(0), 2);
  arrow('ArrowRight');
  expect(selection().focusNode).toBe(text(0, 1));
  expect(selection().focusOffset).toBe(1);
  arrow('ArrowLeft');
  arrow('ArrowLeft');
  expect(selection().focusNode).toBe(text(0));
  expect(selection().focusOffset).toBe(1);
  select(text(1), 4);
  arrow('ArrowRight', true);
  expect(selection().focusNode).toBe(text(1, 1));
  expect(selection().focusOffset).toBe(0);
});

test('selection crosses code and table cells; cut and undo restore its backward direction', () => {
  const source =
    'First\n\n```ts\ncode();\n```\n\n| A | B |\n| --- | --- |\n| C | D |\n\nLast';
  const change = vi.fn();
  render(<BlockEditor defaultValue={source} onChange={change} />);
  select(text(2), 1);
  for (let i = 0; i < 10; i++) arrow('ArrowLeft', true);
  expect(selection().focusNode).toBe(text(0));
  const before = selection().focusOffset;
  const clipboardData = { setData: vi.fn() };
  fireEvent.cut(document.activeElement!, { clipboardData });
  expect(change).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(document.activeElement!, { key: 'z', ctrlKey: true });
  expect(change).toHaveBeenLastCalledWith(source);
  expect(selection().anchorNode).toBe(text(2));
  expect(selection().focusNode).toBe(text(0));
  expect(selection().focusOffset).toBe(before);
});

test('selection from the document end never enters the next editor and external values reset it', () => {
  const { rerender } = render(
    <>
      <BlockEditor label="One" value="First" />
      <BlockEditor label="Two" defaultValue="Second" />
    </>
  );
  select(text(0), 5);
  arrow('ArrowRight', true);
  expect(selection().focusNode).toBe(text(0));
  arrow('ArrowLeft', true);
  rerender(
    <>
      <BlockEditor label="One" value="New" />
      <BlockEditor label="Two" defaultValue="Second" />
    </>
  );
  select(text(0), 3);
  arrow('ArrowLeft', true);
  expect(selection().anchorOffset).toBe(3);
  expect(selection().focusOffset).toBe(2);
  expect(fields()[1]).toHaveTextContent('Second');
});

test('source fields, modifier navigation and IME arrows retain native handling', () => {
  render(<BlockEditor defaultValue="First" />);
  select(text(0), 2);
  expect(
    fireEvent.keyDown(fields()[0], { key: 'ArrowLeft', altKey: true })
  ).toBe(true);
  expect(
    fireEvent.keyDown(fields()[0], { key: 'ArrowLeft', isComposing: true })
  ).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'Markdown source' }));
  expect(
    fireEvent.keyDown(fields()[0], { key: 'ArrowLeft', shiftKey: true })
  ).toBe(true);
});

test('hard breaks and newly typed line containers have a caret stop on the next line', () => {
  render(<BlockEditor defaultValue={'A<br>B'} />);
  select(text(0), 1);
  arrow('ArrowRight');
  arrow('ArrowRight');
  expect(selection().focusNode).toBe(text(0, 2));
  expect(selection().focusOffset).toBe(1);
  const field = fields()[0];
  field.innerHTML =
    '<p><span data-source-start="0" data-source-end="1">A</span></p><div><span data-source-start="3" data-source-end="4">B</span></div>';
  select(text(0), 1);
  arrow('ArrowRight');
  expect(selection().focusNode).toBe(text(0, 1));
  expect(selection().focusOffset).toBe(0);
});

test('an empty block remains navigable and arrows at document edges stay inside it', () => {
  render(<BlockEditor defaultValue="" />);
  const empty = fields()[0].querySelector('[data-source-start]')!;
  select(empty, 0);
  for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
    arrow(key, true);
    expect(selection().isCollapsed).toBe(true);
    expect(fields()[0].contains(selection().focusNode)).toBe(true);
  }
});

test('empty table cells have a caret position between neighboring cells', () => {
  render(<BlockEditor defaultValue={'| A |  | B |\n| --- | --- | --- |'} />);
  select(text(0), 1);
  arrow('ArrowRight');
  const empty = fields()[0].querySelectorAll('[data-source-start]')[1];
  expect(selection().focusNode).toBe(empty);
  expect(selection().focusOffset).toBe(0);
  arrow('ArrowRight');
  expect(selection().focusNode).toBe(text(0, 2));
  expect(selection().focusOffset).toBe(0);
});

test('wrapped visual lines are navigated before leaving a paragraph', () => {
  render(<BlockEditor defaultValue="abcdefghijklmnopqrstuvwxyz" />);
  vi.mocked(Range.prototype.getBoundingClientRect).mockImplementation(function (
    this: Range
  ) {
    const top = 100 + Math.floor(this.startOffset / 10) * 20;
    const left = (this.startOffset % 10) * 10;
    return {
      top,
      bottom: top + 20,
      left,
      right: left,
      width: 0,
      height: 20,
      x: left,
      y: top,
      toJSON: () => ({}),
    };
  });
  select(text(0), 4);
  for (const [key, offset] of [
    ['ArrowDown', 14],
    ['ArrowDown', 24],
    ['ArrowUp', 14],
    ['ArrowUp', 4],
  ] as const) {
    arrow(key, true);
    expect(selection().focusOffset).toBe(offset);
    expect(selection().anchorOffset).toBe(4);
  }
  expect(selection().isCollapsed).toBe(true);
});

test('an inactive editor with select-all does not display a second floating toolbar', () => {
  render(
    <>
      <BlockEditor label="One" defaultValue="First" />
      <BlockEditor label="Two" defaultValue={'```ts\nSecond\n```'} />
    </>
  );
  select(text(0), 0);
  fireEvent.keyDown(fields()[0], { key: 'a', ctrlKey: true });
  fireEvent(document, new Event('selectionchange'));
  select(text(1), 0, text(1), 3);
  expect(screen.getAllByRole('button', { name: /^Bold$/ })).toHaveLength(1);
});

test('engines without Segmenter keep native arrows without breaking the library', () => {
  render(<BlockEditor defaultValue="Text" />);
  select(text(0), 1);
  const original = Object.getOwnPropertyDescriptor(Intl, 'Segmenter')!;
  try {
    Object.defineProperty(Intl, 'Segmenter', { ...original, value: undefined });
    expect(arrow('ArrowRight', true)).toBe(true);
  } finally {
    Object.defineProperty(Intl, 'Segmenter', original);
  }
});

test('undoing a complete backward selection preserves its anchor for the next Shift+arrow', () => {
  render(<BlockEditor defaultValue={'One\n\nTwo'} />);
  select(text(1), 3, text(0), 0);
  fireEvent.cut(document.activeElement!, {
    clipboardData: { setData: vi.fn() },
  });
  fireEvent.keyDown(document.activeElement!, { key: 'z', ctrlKey: true });
  arrow('ArrowRight', true);
  expect(selection().anchorNode).toBe(text(1));
  expect(selection().anchorOffset).toBe(3);
  expect(selection().focusNode).toBe(text(0));
  expect(selection().focusOffset).toBe(1);
});
