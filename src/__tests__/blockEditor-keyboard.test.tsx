import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import { vi } from 'vitest';
import { BlockEditor } from '../components/BlockEditor/BlockEditor';
import { BlockEditorView } from '../components/BlockEditor/BlockEditor/BlockEditor.view';
import { useBlockEditorState } from '../components/BlockEditor/BlockEditor/BlockEditor.state';
import { readEditorSelection } from '../components/BlockEditor/BlockEditor/BlockEditor.dom';
import {
  formatBlocks,
  parseDocument,
} from '../components/BlockEditor/BlockEditor/BlockEditor.model';

beforeAll(() => {
  Range.prototype.getBoundingClientRect = () => ({
    top: 90,
    bottom: 110,
    left: 20,
    right: 120,
    width: 100,
    height: 20,
    x: 20,
    y: 90,
    toJSON: () => ({}),
  });
});
afterEach(() => {
  cleanup();
  document.getSelection()?.removeAllRanges();
});
const field = (index = 0) =>
  screen.getAllByRole('textbox', { name: 'Editor' })[index];
const selectAll = (input = field(), modifier = 'ctrlKey') =>
  fireEvent.keyDown(input, { key: 'a', [modifier]: true });
const clipboard = () => ({
  setData: vi.fn(),
  getData: vi.fn(() => 'pasted é ❤️‍🔥'),
  types: ['text/plain'],
});

test.each(['ctrlKey', 'metaKey'])(
  '%s+A selects/copies the whole Markdown document, including code, without another editor',
  (modifier) => {
    const source = '# First\n\n**Second**\n\n```ts\ncode();\n```';
    render(
      <>
        <BlockEditor label="Editor" defaultValue={source} />
        <BlockEditor label="Other" defaultValue="Other text" />
      </>
    );
    const data = clipboard();
    selectAll(field(), modifier);
    fireEvent.copy(field(), { clipboardData: data });
    expect(data.setData).toHaveBeenCalledExactlyOnceWith('text/plain', source);
    expect(screen.getByRole('textbox', { name: 'Other' })).toHaveTextContent(
      'Other text'
    );
  }
);

test('whole-document cut, undo and redo are one transaction and restore the original Markdown', () => {
  const source = '# Heading\n\nSecond paragraph';
  const onChange = vi.fn();
  render(
    <BlockEditor label="Editor" defaultValue={source} onChange={onChange} />
  );
  const data = clipboard();
  selectAll();
  fireEvent.cut(field(), { clipboardData: data });
  expect(data.setData).toHaveBeenCalledWith('text/plain', source);
  expect(onChange).toHaveBeenCalledExactlyOnceWith('');
  fireEvent.keyDown(field(), { key: 'z', ctrlKey: true });
  expect(onChange).toHaveBeenLastCalledWith(source);
  const restoredCopy = clipboard();
  fireEvent.copy(field(), { clipboardData: restoredCopy });
  expect(restoredCopy.setData).toHaveBeenCalledExactlyOnceWith(
    'text/plain',
    source
  );
  fireEvent.keyDown(field(), { key: 'z', metaKey: true, shiftKey: true });
  expect(onChange).toHaveBeenLastCalledWith('');
  expect(onChange).toHaveBeenCalledTimes(3);
});

test('paste over a whole-document selection replaces all blocks once, without importing HTML', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'One\n\nTwo\n\nThree'}
      onChange={onChange}
    />
  );
  selectAll();
  fireEvent.paste(field(), { clipboardData: clipboard() });
  expect(onChange).toHaveBeenCalledExactlyOnceWith('pasted é ❤️‍🔥');
  expect(screen.getAllByRole('textbox', { name: 'Editor' })).toHaveLength(1);
  fireEvent.keyDown(field(), { key: 'z', ctrlKey: true });
  expect(onChange).toHaveBeenLastCalledWith('One\n\nTwo\n\nThree');
});

test.each([
  ['Backspace', ''],
  ['Delete', ''],
  ['x', 'x'],
])('typing %s over selected blocks replaces the selection', (key, expected) => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'One\n\nTwo'}
      onChange={onChange}
    />
  );
  selectAll();
  fireEvent.keyDown(field(), { key });
  expect(onChange).toHaveBeenCalledExactlyOnceWith(expected);
});

test('IME replacement of several blocks commits only at composition end and remains undoable', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'One\n\nTwo'}
      onChange={onChange}
    />
  );
  selectAll();
  const input = field();
  fireEvent.compositionStart(input);
  input.textContent = 'é';
  fireEvent.input(input, { data: 'é', isComposing: true });
  expect(onChange).not.toHaveBeenCalled();
  fireEvent.compositionEnd(input, { data: 'é 👨‍👩‍👧‍👦' });
  expect(onChange).toHaveBeenCalledExactlyOnceWith('é 👨‍👩‍👧‍👦');
  fireEvent.keyDown(field(), { key: 'z', ctrlKey: true });
  expect(onChange).toHaveBeenLastCalledWith('One\n\nTwo');
});

test('a cancelled composition restores the DOM without changing the document', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'One\n\nTwo'}
      onChange={onChange}
    />
  );
  selectAll();
  const input = field();
  fireEvent.compositionStart(input);
  input.textContent = 'temporary';
  fireEvent.compositionEnd(input, { data: '' });
  expect(onChange).not.toHaveBeenCalled();
  expect(field()).toHaveTextContent('One');
  expect(field(1)).toHaveTextContent('Two');
});

test.each([true, false])(
  'beforeinput cancellation=%s supports non-keyboard replacements without double callbacks',
  (cancelable) => {
    const onChange = vi.fn();
    render(
      <BlockEditor
        label="Editor"
        defaultValue={'One\n\nTwo'}
        onChange={onChange}
      />
    );
    selectAll();
    const input = field();
    const before = new InputEvent('beforeinput', {
      bubbles: true,
      cancelable,
      inputType: 'insertReplacementText',
      data: 'dictation é',
    });
    fireEvent(input, before);
    if (!cancelable) {
      input.textContent = 'dictation é';
      fireEvent.input(input, { inputType: 'insertReplacementText' });
    }
    expect(onChange).toHaveBeenCalledExactlyOnceWith('dictation é');
  }
);

test('selection across part of two blocks cuts only the intended range', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'First\n\nSecond\n\nKeep'}
      onChange={onChange}
    />
  );
  const range = document.createRange();
  range.setStart(field().querySelector('span')!.firstChild!, 2);
  range.setEnd(field(1).querySelector('span')!.firstChild!, 3);
  document.getSelection()!.addRange(range);
  const data = clipboard();
  fireEvent.cut(field(), { clipboardData: data });
  expect(data.setData).toHaveBeenCalledWith('text/plain', 'rst\n\nSec');
  expect(onChange).toHaveBeenCalledExactlyOnceWith('Fiond\n\nKeep');
});

test('Ctrl+Z in code and source inputs uses the editor history once', () => {
  const source = '```ts\noriginal\n```';
  const onChange = vi.fn();
  render(
    <BlockEditor label="Editor" defaultValue={source} onChange={onChange} />
  );
  fireEvent.change(screen.getByRole('textbox', { name: 'Code block' }), {
    target: { value: 'edited', selectionStart: 6, selectionEnd: 6 },
  });
  fireEvent.keyDown(screen.getByRole('textbox', { name: 'Code block' }), {
    key: 'z',
    ctrlKey: true,
  });
  expect(onChange).toHaveBeenLastCalledWith(source);
  expect(onChange).toHaveBeenCalledTimes(2);
  fireEvent.click(screen.getByRole('button', { name: 'Markdown source' }));
  fireEvent.change(field(), { target: { value: 'source edit' } });
  fireEvent.keyDown(field(), { key: 'z', metaKey: true });
  expect(field()).toHaveValue(source);
  expect(onChange).toHaveBeenCalledTimes(4);
});

test('link and AI prompt inputs retain their own copy/paste, selection and undo shortcuts', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue="Document"
      onChange={onChange}
      generate={async () => 'proposal'}
    />
  );
  fireEvent.keyDown(field(), { key: 'k', ctrlKey: true });
  const link = screen.getByRole('textbox', { name: 'Link address' });
  fireEvent.change(link, { target: { value: 'https://example.com' } });
  for (const key of ['a', 'z', 'b', 'v']) {
    const event = new KeyboardEvent('keydown', {
      key,
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(link, event);
    expect(event.defaultPrevented).toBe(false);
  }
  const data = clipboard();
  fireEvent.copy(link, { clipboardData: data });
  expect(data.setData).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  fireEvent.click(
    screen.getByRole('button', { name: 'Edit document with AI' })
  );
  const prompt = screen.getByRole('textbox', { name: 'Describe the change' });
  const undo = new KeyboardEvent('keydown', {
    key: 'z',
    metaKey: true,
    bubbles: true,
    cancelable: true,
  });
  fireEvent(prompt, undo);
  expect(undo.defaultPrevented).toBe(false);
  expect(onChange).not.toHaveBeenCalled();
});

test('keyboard C/X/V are delegated to real clipboard events', () => {
  render(<BlockEditor label="Editor" defaultValue="Document" />);
  for (const key of ['c', 'x', 'v']) {
    const event = new KeyboardEvent('keydown', {
      key,
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(field(), event);
    expect(event.defaultPrevented).toBe(false);
  }
});

test('copying a whole document after formatting still includes block and inline markers', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'# Title\n\nSecond'}
      onChange={onChange}
    />
  );
  selectAll();
  fireEvent.keyDown(field(), { key: 'b', ctrlKey: true });
  const data = clipboard();
  fireEvent.copy(field(), { clipboardData: data });
  expect(data.setData).toHaveBeenCalledExactlyOnceWith(
    'text/plain',
    '# **Title**\n\n**Second**'
  );
});

test('input alone replaces a document selection when beforeinput is absent', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'One\n\nTwo'}
      onChange={onChange}
    />
  );
  selectAll();
  const input = field();
  input.textContent = 'replacement';
  fireEvent.input(input, { inputType: 'insertText', data: 'replacement' });
  expect(onChange).toHaveBeenCalledExactlyOnceWith('replacement');
});

test('navigating after select-all clears whole-document replacement, including modified arrows', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'One\n\nTwo'}
      onChange={onChange}
    />
  );
  selectAll();
  fireEvent.keyDown(field(), { key: 'ArrowLeft', metaKey: true });
  fireEvent.paste(field(), { clipboardData: clipboard() });
  expect(onChange).toHaveBeenCalledExactlyOnceWith('pasted é ❤️‍🔥One\n\nTwo');
});

test('HTML-only clipboard content cannot erase the selection or execute HTML', () => {
  const onChange = vi.fn();
  const { container } = render(
    <BlockEditor label="Editor" defaultValue="Keep" onChange={onChange} />
  );
  selectAll();
  fireEvent.paste(field(), {
    clipboardData: { getData: () => '', types: ['text/html'] },
  });
  expect(onChange).not.toHaveBeenCalled();
  expect(container.querySelector('script,img')).toBeNull();
  expect(field()).toHaveTextContent('Keep');
});

test('formatting several blocks preserves their structure, table separators and code', () => {
  const value =
    '# Title\n\n- One\n- Two\n\n> Quote\n\n```ts\nkeep();\n```\n\n| Left | Right |\n| :--- | ---: |\n| A | B |';
  const formatted = formatBlocks(
    value,
    parseDocument(value).blocks,
    { start: 0, end: value.length },
    'bold'
  );
  expect(formatted.value).toBe(
    '# **Title**\n\n- **One**\n- **Two**\n\n> **Quote**\n\n```ts\nkeep();\n```\n\n| **Left** | **Right** |\n| :--- | ---: |\n| **A** | **B** |'
  );
  expect(parseDocument(formatted.value).sourceMode).toBe(false);
  expect(
    formatBlocks(
      formatted.value,
      parseDocument(formatted.value).blocks,
      formatted.selection,
      'bold'
    ).value
  ).toBe(value);
});

test('formatting mixed text keeps existing bold while applying bold to other blocks', () => {
  const value = '**Already bold**\n\nPlain';
  const formatted = formatBlocks(
    value,
    parseDocument(value).blocks,
    { start: 0, end: value.length },
    'bold'
  );
  expect(formatted.value).toBe('**Already bold**\n\n**Plain**');
});

test('bold across text containing bold and italic spans does not nest identical markers', () => {
  const value = '# Title\n\nPremier **gras** et *italique*';
  const formatted = formatBlocks(
    value,
    parseDocument(value).blocks,
    { start: 0, end: value.length },
    'bold'
  );
  expect(formatted.value).toBe('# **Title**\n\n**Premier gras et *italique***');
});

test.each(['cut', 'Backspace'])(
  'deleting the entire text of an inline span with %s removes empty markers',
  (command) => {
    const onChange = vi.fn();
    render(
      <BlockEditor
        label="Editor"
        defaultValue="First **bold** tail"
        onChange={onChange}
      />
    );
    const range = document.createRange();
    const text = field().querySelector('strong span')!.firstChild!;
    range.setStart(text, 0);
    range.setEnd(text, 4);
    document.getSelection()!.addRange(range);
    if (command === 'cut')
      fireEvent.cut(field(), { clipboardData: clipboard() });
    else fireEvent.keyDown(field(), { key: command });
    expect(onChange).toHaveBeenCalledExactlyOnceWith('First  tail');
    fireEvent.keyDown(field(), { key: 'z', ctrlKey: true });
    expect(field().querySelector('strong')).toHaveTextContent('bold');
  }
);

test('selection has a single visible formatting toolbar and mouse actions keep the range', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor label="Editor" defaultValue="Text" onChange={onChange} />
  );
  const range = document.createRange();
  const text = field().querySelector('span')!.firstChild!;
  range.setStart(text, 0);
  range.setEnd(text, 4);
  document.getSelection()!.addRange(range);
  fireEvent(document, new Event('selectionchange'));
  const bold = screen.getByRole('button', { name: 'Bold' });
  fireEvent.mouseDown(bold);
  fireEvent.click(bold);
  expect(onChange).toHaveBeenCalledExactlyOnceWith('**Text**');
});

test('the floating emoji picker preserves a text selection while searching and inserts once', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Editor"
      defaultValue={'First\n\nSecond'}
      onChange={onChange}
    />
  );
  const range = document.createRange();
  const text = field().querySelector('span')!.firstChild!;
  range.setStart(text, 0);
  range.setEnd(text, 5);
  document.getSelection()!.addRange(range);
  fireEvent(document, new Event('selectionchange'));
  const toolbar = document.querySelector('[data-editor-selection-toolbar]')!;
  const emoji = toolbar.querySelector('button[aria-label="Insert emoji"]')!;
  fireEvent.mouseDown(emoji);
  fireEvent.click(emoji);
  const search = screen.getByRole('textbox', { name: 'Search emojis…' });
  fireEvent.focus(search);
  document.getSelection()!.removeAllRanges();
  fireEvent(document, new Event('selectionchange'));
  expect(toolbar).toBeInTheDocument();
  fireEvent.change(search, { target: { value: 'robot' } });
  fireEvent.click(screen.getByRole('button', { name: 'robot face' }));
  expect(onChange).toHaveBeenCalledExactlyOnceWith('🤖\n\nSecond');
  expect(screen.queryByRole('dialog')).toBeNull();
  fireEvent.keyDown(field(), { key: 'z', ctrlKey: true });
  expect(onChange).toHaveBeenLastCalledWith('First\n\nSecond');
});

test('moving the cursor to another block breaks a typing undo group', () => {
  const { result } = renderHook(() =>
    useBlockEditorState({ defaultValue: 'One\n\nTwo' })
  );
  act(() =>
    result.current.editBlock(result.current.document.blocks[0], 'One!', {
      start: 4,
      end: 4,
    })
  );
  act(() => result.current.capture({ start: 9, end: 9 }));
  act(() =>
    result.current.editBlock(result.current.document.blocks[1], 'Two!', {
      start: 4,
      end: 4,
    })
  );
  act(() => result.current.undo());
  expect(result.current.value).toBe('One!\n\nTwo');
  act(() => result.current.undo());
  expect(result.current.value).toBe('One\n\nTwo');
});

test('selecting code in another editor cannot change this editor selection', () => {
  function ObservedEditor() {
    const state = useBlockEditorState({ defaultValue: 'One' });
    return (
      <>
        <BlockEditorView label="Editor" state={state} />
        <output data-testid="selection">
          {state.selection.start}:{state.selection.end}
        </output>
      </>
    );
  }
  render(
    <>
      <ObservedEditor />
      <BlockEditor label="Other" defaultValue={'```ts\nCode\n```'} />
    </>
  );
  const range = document.createRange();
  const text = field().querySelector('span')!.firstChild!;
  range.setStart(text, 1);
  range.setEnd(text, 2);
  document.getSelection()!.addRange(range);
  fireEvent(document, new Event('selectionchange'));
  expect(screen.getByTestId('selection')).toHaveTextContent('1:2');
  const code = screen.getByRole('textbox', {
    name: 'Code block',
  }) as HTMLTextAreaElement;
  act(() => code.focus());
  code.setSelectionRange(0, 4);
  fireEvent.select(code);
  fireEvent(document, new Event('selectionchange'));
  expect(screen.getByTestId('selection')).toHaveTextContent('1:2');
});

test('element selection boundaries map to adjacent formatted spans rather than the whole block', () => {
  render(<BlockEditor label="Editor" defaultValue="A **bold** tail" />);
  const paragraph = field().querySelector('p')!;
  const range = document.createRange();
  range.setStart(paragraph, 1);
  range.setEnd(paragraph, 2);
  document.getSelection()!.addRange(range);
  expect(readEditorSelection(field())).toEqual({ start: 4, end: 10 });
});
