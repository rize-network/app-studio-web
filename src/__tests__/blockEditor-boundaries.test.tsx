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
import { parseDocument } from '../components/BlockEditor/BlockEditor/BlockEditor.model';
import { readEditorSelection } from '../components/BlockEditor/BlockEditor/BlockEditor.dom';
import {
  splitEditorBlock,
  mergeEditorBlock,
} from '../components/BlockEditor/BlockEditor/BlockEditor.transactions';

const split = (value: string, at: number, end = at, soft = false) =>
  splitEditorBlock(
    value,
    parseDocument(value).blocks,
    { start: at, end },
    soft
  )!;
const merge = (value: string) => {
  const blocks = parseDocument(value).blocks;
  return mergeEditorBlock(value, blocks, blocks[1].id)!;
};
const fields = () => screen.getAllByRole('textbox', { name: 'Editor' });
const caret = (field: HTMLElement, offset: number, end = offset) => {
  const text = field.querySelector('[data-source-start]')!.firstChild!;
  act(() => {
    field.focus();
    document.getSelection()!.setBaseAndExtent(text, offset, text, end);
    fireEvent(document, new Event('selectionchange'));
  });
};
beforeAll(() => {
  Range.prototype.getBoundingClientRect = () => ({
    top: 200,
    bottom: 220,
    left: 100,
    right: 200,
    width: 100,
    height: 20,
    x: 100,
    y: 200,
    toJSON: () => ({}),
  });
});
afterEach(() => {
  cleanup();
  document.getSelection()?.removeAllRanges();
  vi.restoreAllMocks();
});

test.each([
  ['Hello world', 5, 'Hello\n\n world'],
  ['## Hello world', 8, '## Hello\n\n world'],
  ['# Hello', 7, '# Hello\n\n'],
  ['# Hello', 2, '\n\n# Hello'],
  ['Hello', 0, '\n\nHello'],
  ['', 0, '\n\n'],
  ['**Hello world**', 7, '**Hello**\n\n** world**'],
  [
    '[Hello world](https://example.com)',
    6,
    '[Hello](https://example.com)\n\n[ world](https://example.com)',
  ],
  ['**Hello**', 2, '\n\n**Hello**'],
  ['\u0065\u0301👍🏽 end', 6, '\u0065\u0301👍🏽\n\n end'],
  ['- Hello world\n- Keep', 7, '- Hello\n-  world\n- Keep'],
  ['1. Hello world\n2. Keep', 8, '1. Hello\n2.  world\n3. Keep'],
  ['- first\n  - nested', 15, '- first\n  - nes\n  - ted'],
  ['- Hello\n- ', 10, '- Hello\n\n'],
  ['- Hello\n  - ', 12, '- Hello\n- '],
  ['> Hello world', 7, '> Hello\n\n>  world'],
  ['One\r\n\r\nSecond', 10, 'One\r\n\r\nSec\r\n\r\nond'],
])(
  'Enter splits %j without changing the remaining text',
  (value, at, expected) => {
    const result = split(value, at);
    expect(result.value).toBe(expected);
    expect(parseDocument(result.value).sourceMode).toBe(false);
  }
);

test('splitting removes a selection while balancing nested formatting on both sides', () => {
  expect(split('**Hello _middle_ world**', 5, 18).value).toBe(
    '**Hel**\n\n**orld**'
  );
  expect(split('A **bold** Z', 4, 8).value).toBe('A \n\n Z');
});

test('soft breaks, code and tables keep their own structure', () => {
  expect(split('Hello world', 5, 5, true).value).toBe('Hello<br> world');
  expect(split('```ts\nhello();\n```', 11).value).toBe(
    '```ts\nhello\n();\n```'
  );
  const table = '| Hello | B |\n| --- | --- |';
  expect(split(table, 4).value).toBe('| He<br>llo | B |\n| --- | --- |');
  const blocks = parseDocument('One\n\n' + table).blocks;
  expect(mergeEditorBlock('One\n\n' + table, blocks, blocks[1].id)).toBeNull();
});

test.each([
  ['\n\n', [0, 2]],
  ['\n\nHello', [0, 2]],
  ['Hello\n\n', [0, 7]],
  ['Hello\n\n\n\n', [0, 7, 9]],
  ['\r\n\r\nHello', [0, 4]],
])('empty paragraphs retain their positions in %j', (value, starts) => {
  expect(parseDocument(value).blocks.map((block) => block.start)).toEqual(
    starts
  );
});

test.each([
  ['Hello\n\nworld', 'Helloworld', 5],
  ['Hello\n\n## world', 'Helloworld', 5],
  ['# Hello\n\nworld', '# Helloworld', 7],
  ['Hello\n\n> world', 'Helloworld', 5],
  ['Hello\n\n- One\n- Two', 'HelloOne<br>Two', 5],
  ['Hello\n\n', 'Hello', 5],
  ['\n\n# Hello', '# Hello', 2],
  ['Hello\n\n```ts\ncode();\n```', 'Hello`code();`', 5],
  ['```ts\ncode();\n```\n\n**Hello**', '```ts\ncode();Hello\n```', 13],
])(
  'Backspace joins %j at the correct caret position',
  (value, expected, caret) => {
    expect(merge(value)).toEqual({
      value: expected,
      selection: { start: caret, end: caret },
    });
    expect(parseDocument(expected).sourceMode).toBe(false);
  }
);

test('Enter and Backspace are single undoable transactions with cursor restoration', () => {
  const change = vi.fn();
  render(
    <BlockEditor label="Editor" defaultValue="Hello world" onChange={change} />
  );
  caret(fields()[0], 5);
  fireEvent.keyDown(fields()[0], { key: 'Enter' });
  expect(change).toHaveBeenCalledExactlyOnceWith('Hello\n\n world');
  expect(fields()).toHaveLength(2);
  expect(readEditorSelection(fields()[1])).toEqual({ start: 7, end: 7 });
  fireEvent.keyDown(document.activeElement!, { key: 'z', ctrlKey: true });
  expect(fields()).toHaveLength(1);
  expect(readEditorSelection(fields()[0])).toEqual({ start: 5, end: 5 });
  fireEvent.keyDown(fields()[0], { key: 'z', ctrlKey: true, shiftKey: true });
  fireEvent.keyDown(document.activeElement!, { key: 'Backspace' });
  expect(change).toHaveBeenLastCalledWith('Hello world');
  expect(change).toHaveBeenCalledTimes(4);
  expect(readEditorSelection(fields()[0])).toEqual({ start: 5, end: 5 });
});

test.each([true, false])(
  'beforeinput Enter cancellation=%s commits once and restores two blocks',
  (cancelable) => {
    const change = vi.fn();
    render(
      <BlockEditor
        label="Editor"
        defaultValue="Hello world"
        onChange={change}
      />
    );
    caret(fields()[0], 5);
    const input = fields()[0];
    fireEvent(
      input,
      new InputEvent('beforeinput', {
        inputType: 'insertParagraph',
        bubbles: true,
        cancelable,
      })
    );
    if (!cancelable) {
      input.querySelector('[data-source-start]')!.textContent =
        'browser mutation';
      fireEvent.input(input, { inputType: 'insertParagraph' });
    }
    expect(change).toHaveBeenCalledExactlyOnceWith('Hello\n\n world');
    expect(fields()).toHaveLength(2);
  }
);

test('input-only Enter works without beforeinput and IME Enter does not split', () => {
  const change = vi.fn();
  render(
    <BlockEditor label="Editor" defaultValue="Hello world" onChange={change} />
  );
  caret(fields()[0], 5);
  expect(
    fireEvent.keyDown(fields()[0], { key: 'Enter', isComposing: true })
  ).toBe(true);
  expect(change).not.toHaveBeenCalled();
  fireEvent.input(fields()[0], { inputType: 'insertParagraph' });
  expect(change).toHaveBeenCalledExactlyOnceWith('Hello\n\n world');
});

test('Shift+Enter leaves the cursor after the line break in the same block', () => {
  const change = vi.fn();
  render(
    <BlockEditor label="Editor" defaultValue="Hello world" onChange={change} />
  );
  caret(fields()[0], 5);
  fireEvent.keyDown(fields()[0], { key: 'Enter', shiftKey: true });
  expect(change).toHaveBeenCalledExactlyOnceWith('Hello<br> world');
  expect(fields()).toHaveLength(1);
  expect(readEditorSelection(fields()[0])).toEqual({ start: 9, end: 9 });
});

test('Backspace after splitting a list item merges its text and restores later numbering', () => {
  const change = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'1. Hello world\n2. Keep'}
      onChange={change}
    />
  );
  caret(fields()[0], 5);
  fireEvent.keyDown(fields()[0], { key: 'Enter' });
  expect(change).toHaveBeenLastCalledWith('1. Hello\n2.  world\n3. Keep');
  fireEvent.keyDown(document.activeElement!, { key: 'Backspace' });
  expect(change).toHaveBeenLastCalledWith('1. Hello world\n2. Keep');
  expect(change).toHaveBeenCalledTimes(2);
  expect(readEditorSelection(fields()[0])).toEqual({ start: 8, end: 8 });
});

test('Backspace at the document start preserves list markers without emitting a change', () => {
  const change = vi.fn();
  render(
    <BlockEditor label="Editor" defaultValue="- Item" onChange={change} />
  );
  caret(fields()[0], 0);
  expect(fireEvent.keyDown(fields()[0], { key: 'Backspace' })).toBe(false);
  expect(
    fields()[0].querySelector('[contenteditable="false"]')
  ).toHaveTextContent('•');
  expect(change).not.toHaveBeenCalled();
});

test('merging numbered items does not renumber numeric text inside the item body', () => {
  const source = '1. First\n2. 42. literal\n3. Last';
  const blocks = parseDocument(source).blocks;
  expect(
    mergeEditorBlock(source, blocks, blocks[0].id, source.indexOf('42.'))?.value
  ).toBe('1. First42. literal\n2. Last');
});

test('link editing stays in an anchored popover and applies only to the original selection once', () => {
  const change = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'Keep\n\nSelect me\n\nTail'}
      onChange={change}
    />
  );
  caret(fields()[1], 0, 6);
  fireEvent.click(screen.getByRole('button', { name: /^Link$/ }));
  const dialog = screen.getByRole('dialog', { name: 'Link' });
  expect(dialog.closest('[data-editor-block-list]')).toBeNull();
  expect(dialog).toHaveStyle({ position: 'fixed', left: '100px' });
  const address = screen.getByRole('textbox', { name: 'Link address' });
  expect(address).toHaveFocus();
  document.getSelection()!.removeAllRanges();
  fireEvent(document, new Event('selectionchange'));
  fireEvent.change(address, { target: { value: 'https://example.com' } });
  expect(dialog).toBeInTheDocument();
  fireEvent.submit(address.closest('form')!);
  expect(change).toHaveBeenCalledExactlyOnceWith(
    'Keep\n\n[Select](https://example.com) me\n\nTail'
  );
  expect(screen.queryByRole('dialog', { name: 'Link' })).toBeNull();
});

test('invalid URLs remain visible; Escape restores the selection without changing the document', () => {
  const change = vi.fn();
  render(
    <BlockEditor label="Editor" defaultValue="Select me" onChange={change} />
  );
  caret(fields()[0], 0, 6);
  fireEvent.keyDown(fields()[0], { key: 'k', ctrlKey: true });
  const address = screen.getByRole('textbox', { name: 'Link address' });
  fireEvent.change(address, { target: { value: 'javascript:alert(1)' } });
  fireEvent.submit(address.closest('form')!);
  expect(screen.getByRole('alert')).toHaveTextContent('Enter an http');
  fireEvent.keyDown(address, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(readEditorSelection(fields()[0])).toEqual({ start: 0, end: 6 });
  expect(change).not.toHaveBeenCalled();
});

test('outside click closes the link popover and an external value invalidates its target', () => {
  const change = vi.fn();
  const { rerender } = render(
    <>
      <BlockEditor label="Editor" value="Original" onChange={change} />
      <button>Outside</button>
    </>
  );
  caret(fields()[0], 0, 4);
  fireEvent.keyDown(fields()[0], { key: 'k', ctrlKey: true });
  fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
  expect(screen.queryByRole('dialog')).toBeNull();
  caret(fields()[0], 0, 4);
  fireEvent.keyDown(fields()[0], { key: 'k', ctrlKey: true });
  rerender(
    <>
      <BlockEditor label="Editor" value="Replacement" onChange={change} />
      <button>Outside</button>
    </>
  );
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(fields()[0]).toHaveTextContent('Replacement');
  expect(change).not.toHaveBeenCalled();
});

test.each(['isDisabled', 'isReadOnly'] as const)(
  '%s prevents split, merge and link commands',
  (flag) => {
    const change = vi.fn();
    render(
      <BlockEditor
        label="Editor"
        defaultValue={'First\n\nSecond'}
        onChange={change}
        {...{ [flag]: true }}
      />
    );
    caret(fields()[1], 0);
    fireEvent.keyDown(fields()[1], { key: 'Enter' });
    fireEvent.keyDown(fields()[1], { key: 'Backspace' });
    fireEvent.keyDown(fields()[1], { key: 'k', ctrlKey: true });
    expect(change).not.toHaveBeenCalled();
    expect(fields()).toHaveLength(2);
    expect(screen.queryByRole('dialog')).toBeNull();
  }
);

test('AI editing uses the same anchored opaque popover as link editing', () => {
  const change = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'Keep\n\nSelect me\n\nTail'}
      generate={async () => 'Proposal'}
      onChange={change}
    />
  );
  caret(fields()[1], 0, 6);
  fireEvent.click(
    screen.getByRole('button', { name: 'Edit document with AI' })
  );
  const instruction = screen.getByRole('textbox', {
    name: 'Describe the change',
  });
  expect(instruction).toBeInTheDocument();
  expect(change).not.toHaveBeenCalled();
  const popover = instruction.closest('[data-editor-selection-toolbar]');
  expect(popover).not.toBeNull();
  expect(popover).toHaveStyle({
    position: 'fixed',
    left: '100px',
    borderWidth: '1px',
  });
  // JSDOM does not resolve the design system's CSS-variable colors.
  expect(popover).toHaveClass('bcr-var--color-white');
  fireEvent.keyDown(instruction, { key: 'Escape' });
  expect(
    screen.queryByRole('textbox', { name: 'Describe the change' })
  ).toBeNull();
  expect(readEditorSelection(fields()[1])).toEqual({ start: 6, end: 12 });
  expect(change).not.toHaveBeenCalled();
});

test('media popover keeps its captured target while URL/description fields own focus', () => {
  const change = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'Keep\n\nSelect me\n\nTail'}
      onChange={change}
    />
  );
  caret(fields()[1], 0, 6);
  fireEvent.click(
    screen.getByRole('button', { name: 'Insert image or video' })
  );
  const dialog = screen.getByRole('dialog', { name: 'Insert image or video' });
  expect(dialog).toHaveStyle({ position: 'fixed', left: '100px' });
  const address = screen.getByRole('textbox', { name: 'Media address' });
  expect(address).toHaveFocus();
  expect(dialog).toHaveTextContent('switches this document to Markdown source');
  document.getSelection()!.removeAllRanges();
  fireEvent(document, new Event('selectionchange'));
  fireEvent.change(address, { target: { value: '/safe.png' } });
  fireEvent.change(
    screen.getByRole('textbox', { name: 'Description / alternative text' }),
    { target: { value: 'Caption' } }
  );
  fireEvent.submit(address.closest('form')!);
  expect(change).toHaveBeenCalledExactlyOnceWith(
    'Keep\n\n![Caption](/safe.png) me\n\nTail'
  );
  expect(screen.queryByRole('dialog')).toBeNull();
});

test('AI popover follows scroll/resize and reclamps after its proposal grows', () => {
  let anchor = { top: 200, bottom: 220, left: 100, height: 20 };
  let panel = { width: 240, height: 80 };
  let resized: ResizeObserverCallback | undefined;
  const disconnect = vi.fn();
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback: ResizeObserverCallback) {
        resized = callback;
      }
      observe() {}
      disconnect = disconnect;
    }
  );
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
  rect.mockImplementation(function () {
    return {
      x: 0,
      y: 0,
      top: 0,
      bottom: panel.height,
      left: 0,
      right: panel.width,
      ...panel,
      toJSON: () => ({}),
    } as DOMRect;
  });
  vi.spyOn(Range.prototype, 'getBoundingClientRect').mockImplementation(
    () =>
      ({
        ...anchor,
        x: anchor.left,
        y: anchor.top,
        width: 100,
        right: anchor.left + 100,
        toJSON: () => ({}),
      } as DOMRect)
  );
  try {
    const mounted = render(
      <BlockEditor
        label="Editor"
        defaultValue="Select me"
        generate={async () => 'Proposal'}
      />
    );
    caret(fields()[0], 0, 6);
    fireEvent.click(
      screen.getByRole('button', { name: 'Edit document with AI' })
    );
    const dialog = screen.getByRole('dialog', { name: 'AI proposal' });
    expect(dialog).toHaveStyle({
      top: '112px',
      left: '100px',
      maxHeight: 'calc(100vh - 16px)',
      overflow: 'auto',
    });
    anchor = { top: 10, bottom: 30, left: 100, height: 20 };
    fireEvent.scroll(window);
    expect(dialog).toHaveStyle({ top: '38px' });
    anchor = {
      top: 200,
      bottom: 220,
      left: window.innerWidth - 10,
      height: 20,
    };
    fireEvent.resize(window);
    expect(dialog).toHaveStyle({ left: `${window.innerWidth - 248}px` });
    panel = { width: 240, height: window.innerHeight + 100 };
    act(() => resized!([], {} as ResizeObserver));
    expect(dialog).toHaveStyle({ top: '8px' });
    mounted.unmount();
    expect(disconnect).toHaveBeenCalled();
  } finally {
    vi.unstubAllGlobals();
  }
});

test('AI prompt focus preserves the fragment; Discard restores it and outside dismissal preserves new focus', async () => {
  const generate = vi.fn(async () => 'Replacement');
  const change = vi.fn();
  render(
    <>
      <BlockEditor
        label="Editor"
        defaultValue={'Keep\n\nSelect me\n\nTail'}
        generate={generate}
        onChange={change}
      />
      <button>Outside</button>
    </>
  );
  caret(fields()[1], 0, 6);
  fireEvent.click(
    screen.getByRole('button', { name: 'Edit selection with AI' })
  );
  const prompt = screen.getByRole('textbox', { name: 'Describe the change' });
  expect(prompt).toHaveFocus();
  document.getSelection()!.removeAllRanges();
  fireEvent(document, new Event('selectionchange'));
  fireEvent.change(prompt, { target: { value: 'Improve' } });
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
  });
  expect(generate).toHaveBeenCalledExactlyOnceWith(
    'Improve',
    'Select',
    'selection'
  );
  expect(change).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Discard' }));
  expect(readEditorSelection(fields()[1])).toEqual({ start: 6, end: 12 });
  fireEvent.click(
    screen.getByRole('button', { name: 'Edit document with AI' })
  );
  const outside = screen.getByRole('button', { name: 'Outside' });
  fireEvent.pointerDown(outside);
  outside.focus();
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(outside).toHaveFocus();
  expect(change).not.toHaveBeenCalled();
});
