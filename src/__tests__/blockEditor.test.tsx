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
import { useBlockEditorState } from '../components/BlockEditor/BlockEditor/BlockEditor.state';
import {
  formatRange,
  parseDocument,
  parseInline,
  replaceRange,
  safeEditorUrl,
  transformBlock,
} from '../components/BlockEditor/BlockEditor/BlockEditor.model';
import {
  readEditorSelection,
  serializeEditorDom,
} from '../components/BlockEditor/BlockEditor/BlockEditor.dom';

afterEach(() => {
  cleanup();
  document.getSelection()?.removeAllRanges();
});
beforeAll(() => {
  Range.prototype.getBoundingClientRect = () => ({
    top: 80,
    left: 20,
    width: 100,
    height: 20,
    bottom: 100,
    right: 120,
    x: 20,
    y: 80,
    toJSON: () => ({}),
  });
});

test('parses the visual subset without changing source or CRLF separators', () => {
  const source =
    '# A\r\n\r\nText **bold**\r\n\r\n- Parent\r\n  - Child\r\n\r\n```ts\r\nconst x = {html: "<script>"};\r\n```\r\n\r\n| A | B |\r\n| --- | --- |\r\n| 1 | 2 |';
  const doc = parseDocument(source);
  expect(doc.sourceMode).toBe(false);
  expect(doc.blocks.map((block) => block.kind)).toEqual([
    'h1',
    'paragraph',
    'bullet',
    'codeBlock',
    'table',
  ]);
  doc.blocks.forEach((block) =>
    expect(source.slice(block.start, block.end)).toBe(block.raw)
  );
  expect(doc.blocks[3].body).toBe('const x = {html: "<script>"};');
});

test.each([
  '<script>alert(1)</script>',
  '----',
  '- - -',
  '[Unsafe](javascript:alert)',
  '> > Nested quote',
  '- [x] Task list',
  '  ## Indented heading',
  '- Parent\n  ```ts\n  code\n  ```',
  '[Link](https://example.com "Title")',
  'Line with a hard break  \nNext line',
  '---\ntitle: example\n---',
  '![alt](https://example.com)',
  '[ref]: /url',
  '[^note]',
  '## Heading\n\n<Component a={1}/>',
  '```ts\nunclosed',
])('preserves unsupported content in source mode: %s', (source) => {
  expect(parseDocument(source).sourceMode).toBe(true);
});

test('formatting, unformatting and replacement preserve Unicode sequences', () => {
  const text = 'é ❤️‍🔥 done';
  const selection = { start: 2, end: 7 };
  const formatted = formatRange(text, selection, 'bold');
  expect(formatted.value).toBe('é **❤️‍🔥** done');
  expect(formatRange(formatted.value, formatted.selection, 'bold').value).toBe(
    text
  );
  expect(replaceRange(text, selection, '👍🏽')).toBe('é 👍🏽 done');
  expect(parseInline('**bold *italic***')[0].kind).toBe('bold');
});

test('code transformations choose fences that cannot truncate code', () => {
  const block = parseDocument('Here are ``` fences').blocks[0];
  const code = transformBlock(block, 'codeBlock');
  expect(code.startsWith('````\n')).toBe(true);
  expect(parseDocument(code).blocks[0].body).toBe(block.raw);
});

test.each([
  'javascript:alert(1)',
  'data:text/html,test',
  ' java\nscript:alert(1)',
  '\\evil.test',
])('rejects dangerous links: %s', (link) =>
  expect(safeEditorUrl(link)).toBe(false)
);
test.each([
  'https://example.com',
  'mailto:a@example.com',
  'tel:+1234',
  '/docs',
  '#section',
  './page',
])('accepts supported links: %s', (link) =>
  expect(safeEditorUrl(link)).toBe(true)
);

test('editing one block preserves nested lists, code, tables and original separators elsewhere', () => {
  const source =
    'One\r\n\r\n- Parent\r\n  1. Child\r\n\r\n```js\nx();\r\n```\r\n\r\n| A | B |\r\n| --- | --- |\r\n| 1 | 2 |';
  const onChange = vi.fn();
  const { result } = renderHook(() =>
    useBlockEditorState({ defaultValue: source, onChange })
  );
  act(() =>
    result.current.editBlock(result.current.document.blocks[0], 'Changed', {
      start: 7,
      end: 7,
    })
  );
  expect(result.current.value).toBe(source.replace('One', 'Changed'));
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('undo and redo restore content and cursor; controlled echo retains history', () => {
  const { result, rerender } = renderHook(
    ({ value }) => useBlockEditorState({ value }),
    { initialProps: { value: 'Hello' } }
  );
  act(() => result.current.capture({ start: 1, end: 4 }));
  act(() => result.current.replace('é'));
  expect(result.current.value).toBe('Héo');
  rerender({ value: 'Héo' });
  act(() => result.current.undo());
  expect(result.current.value).toBe('Hello');
  expect(result.current.selection).toEqual({ start: 1, end: 4 });
  act(() => result.current.undo(true));
  expect(result.current.value).toBe('Héo');
  rerender({ value: 'External' });
  expect(result.current.canUndo).toBe(false);
  expect(result.current.value).toBe('External');
});

test('block insertion, duplication, movement and deletion remain undoable', () => {
  const { result } = renderHook(() =>
    useBlockEditorState({ defaultValue: 'One\n\nTwo' })
  );
  const first = result.current.document.blocks[0].id;
  act(() => result.current.action(first, 'duplicate'));
  expect(result.current.document.blocks.map((b) => b.raw)).toEqual([
    'One',
    'One',
    'Two',
  ]);
  const second = result.current.document.blocks[1].id;
  act(() => result.current.move(second, 2));
  expect(result.current.document.blocks.map((b) => b.raw)).toEqual([
    'One',
    'Two',
    'One',
  ]);
  act(() => result.current.action(second, 'delete'));
  expect(result.current.value).toBe('One\n\nTwo');
  act(() => result.current.action(first, 'below'));
  expect(result.current.document.blocks.some((b) => !b.raw)).toBe(true);
  expect(result.current.commandId).not.toBeNull();
});

test('disabled movement cannot alter the model used after unlocking', () => {
  const { result, rerender } = renderHook(
    ({ isDisabled }) =>
      useBlockEditorState({ defaultValue: 'One\n\nTwo', isDisabled }),
    { initialProps: { isDisabled: true } }
  );
  const first = result.current.document.blocks[0].id;
  act(() => result.current.move(first, 1));
  rerender({ isDisabled: false });
  act(() => result.current.move(first, 1));
  expect(result.current.value).toBe('Two\n\nOne');
});

test('AI previews before applying, rejects stale proposals and leaves errors intact', async () => {
  const generate = vi.fn().mockResolvedValue('New text');
  const { result } = renderHook(() =>
    useBlockEditorState({ defaultValue: 'Old text', generate })
  );
  act(() => result.current.openAi('section'));
  act(() =>
    result.current.setAi(
      (previous) => previous && { ...previous, prompt: 'Rewrite' }
    )
  );
  await act(() => result.current.runAi());
  expect(generate).toHaveBeenCalledWith('Rewrite', 'Old text', 'section');
  expect(result.current.value).toBe('Old text');
  act(() => result.current.applyAi());
  expect(result.current.value).toBe('New text');
  act(() => result.current.openAi('section'));
  act(() =>
    result.current.setAi(
      (previous) => previous && { ...previous, prompt: 'Again' }
    )
  );
  await act(() => result.current.runAi());
  act(() => result.current.replace('Changed', { start: 0, end: 8 }));
  act(() => result.current.applyAi());
  expect(result.current.value).toBe('Changed');
  expect(result.current.stale).toBe(true);
  act(() => result.current.closeAi());
  generate.mockRejectedValueOnce(new Error('offline'));
  act(() => result.current.openAi('section'));
  act(() =>
    result.current.setAi(
      (previous) => previous && { ...previous, prompt: 'Retry' }
    )
  );
  await act(() => result.current.runAi());
  expect(result.current.ai?.state).toBe('error');
  expect(result.current.value).toBe('Changed');
});

test('cancelled or unmounted AI requests cannot reappear', async () => {
  let resolve!: (value: string) => void;
  const generate = () =>
    new Promise<string>((done) => {
      resolve = done;
    });
  const { result, unmount } = renderHook(() =>
    useBlockEditorState({ defaultValue: 'Original', generate })
  );
  act(() => result.current.openAi('section'));
  act(() =>
    result.current.setAi(
      (previous) => previous && { ...previous, prompt: 'Rewrite' }
    )
  );
  let pending!: Promise<void>;
  act(() => {
    pending = result.current.runAi();
  });
  act(() => result.current.closeAi());
  await act(async () => {
    resolve('Late');
    await pending;
  });
  expect(result.current.ai).toBeNull();
  expect(result.current.value).toBe('Original');
  unmount();
});

test('repeated generation clicks call the application only once while loading', async () => {
  let resolve!: (value: string) => void;
  const generate = vi.fn(
    () =>
      new Promise<string>((done) => {
        resolve = done;
      })
  );
  const { result } = renderHook(() =>
    useBlockEditorState({ defaultValue: 'Original', generate })
  );
  act(() => result.current.openAi('section'));
  act(() =>
    result.current.setAi(
      (previous) => previous && { ...previous, prompt: 'Rewrite' }
    )
  );
  let pending!: Promise<void>;
  act(() => {
    pending = result.current.runAi();
    void result.current.runAi();
  });
  expect(generate).toHaveBeenCalledOnce();
  await act(async () => {
    resolve('Proposal');
    await pending;
  });
  expect(result.current.ai?.state).toBe('proposal');
});

test.each([{ isDisabled: true }, { isReadOnly: true }])(
  'locked editors reject all mutation paths: %j',
  (lock) => {
    const onChange = vi.fn();
    const generate = vi.fn();
    const { result } = renderHook(() =>
      useBlockEditorState({
        defaultValue: 'Original',
        onChange,
        generate,
        ...lock,
      })
    );
    const id = result.current.document.blocks[0].id;
    act(() => {
      result.current.replace('x');
      result.current.action(id, 'delete');
      result.current.transform(id, 'h1');
      result.current.move(id, 1);
      result.current.format('bold');
      result.current.openAi('section');
      result.current.undo();
    });
    expect(result.current.value).toBe('Original');
    expect(onChange).not.toHaveBeenCalled();
    expect(generate).not.toHaveBeenCalled();
  }
);

test('DOM serialization retains nested list indentation and inline code characters', () => {
  const root = document.createElement('div');
  root.innerHTML =
    '<ul><li data-list-indent="" data-list-marker="- ">Parent</li><li data-list-indent="  " data-list-marker="1. ">Nested <code>a*b</code></li></ul>';
  expect(serializeEditorDom(root).text).toBe('- Parent\n  1. Nested `a*b`');
});

test('selection mapping stays correct after typing before a formatted span', () => {
  const root = document.createElement('div');
  root.dataset.blockStart = '4';
  root.innerHTML =
    '<p><span data-source-start="4" data-source-end="10">XHello </span><strong><span data-source-start="12" data-source-end="16">bold</span></strong></p>';
  document.body.appendChild(root);
  serializeEditorDom(root);
  const text = root.querySelector('strong span')!.firstChild!;
  const range = document.createRange();
  range.setStart(text, 0);
  range.setEnd(text, 4);
  const selection = document.getSelection()!;
  selection.removeAllRanges();
  selection.addRange(range);
  expect(readEditorSelection(root)).toEqual({ start: 13, end: 17 });
  root.dataset.blockStart = '10';
  expect(readEditorSelection(root)).toEqual({ start: 19, end: 23 });
  root.remove();
});

test('nested bold/italic and backticks retain their visible content', () => {
  const text = (nodes: ReturnType<typeof parseInline>): string =>
    nodes
      .map((node) => (node.children ? text(node.children) : node.text || ''))
      .join('');
  expect(text(parseInline('**bold *italic***'))).toBe('bold italic');
  expect(text(parseInline('*italic **bold***'))).toBe('italic bold');
  expect(text(parseInline('``a`b``'))).toBe('a`b');
  const root = document.createElement('div');
  root.innerHTML = '<p><code>a`b</code></p>';
  expect(serializeEditorDom(root).text).toBe('``a`b``');
});

test('web typing and IME composition update only their editor and are undoable', () => {
  const onChange = vi.fn();
  const other = vi.fn();
  render(
    <>
      <BlockEditor label="First" defaultValue="Hello" onChange={onChange} />
      <BlockEditor label="Second" defaultValue="Other" onChange={other} />
    </>
  );
  const input = screen.getByRole('textbox', { name: 'First' });
  fireEvent.compositionStart(input);
  input.textContent = 'é ❤️‍🔥';
  fireEvent.input(input);
  expect(onChange).not.toHaveBeenCalled();
  fireEvent.compositionEnd(input);
  expect(onChange).toHaveBeenLastCalledWith('é ❤️‍🔥');
  expect(other).not.toHaveBeenCalled();
  fireEvent.keyDown(input, { key: 'z', ctrlKey: true });
  expect(screen.getByRole('textbox', { name: 'First' })).toHaveTextContent(
    'Hello'
  );
});

test('block menu actions are keyboard buttons and close after a command', () => {
  const onChange = vi.fn();
  render(<BlockEditor defaultValue="Hello" onChange={onChange} />);
  fireEvent.click(screen.getByRole('button', { name: 'Drag block' }));
  const duplicate = screen.getByRole('button', { name: 'Duplicate' });
  expect(duplicate.tagName).toBe('BUTTON');
  fireEvent.click(duplicate);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole('button', { name: 'Duplicate' })).toBeNull();
  expect(screen.getAllByRole('textbox')).toHaveLength(2);
});

test('plain paste keeps other blocks intact and HTML is never imported', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Paste"
      defaultValue={'Hello\n\n# Keep'}
      onChange={onChange}
    />
  );
  const input = screen.getAllByRole('textbox', { name: 'Paste' })[0];
  const leaf = input.querySelector('[data-source-start]')!.firstChild!;
  const range = document.createRange();
  range.setStart(leaf, 5);
  range.collapse(true);
  document.getSelection()!.removeAllRanges();
  document.getSelection()!.addRange(range);
  fireEvent.paste(input, {
    clipboardData: {
      getData: (type: string) =>
        type === 'text/plain' ? ' é 👨‍👩‍👧‍👦' : '<script>bad()</script>',
    },
  });
  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith('Hello é 👨‍👩‍👧‍👦\n\n# Keep');
  expect(document.querySelector('script')).toBeNull();
});

test('input history events use editor history when beforeinput is unavailable', () => {
  render(<BlockEditor label="History" defaultValue="Original" />);
  const input = screen.getByRole('textbox', { name: 'History' });
  input.textContent = 'Edited';
  fireEvent.input(input, { inputType: 'insertText' });
  input.textContent = 'Browser undo result';
  fireEvent.input(input, { inputType: 'historyUndo' });
  expect(screen.getByRole('textbox', { name: 'History' })).toHaveTextContent(
    'Original'
  );
});

test('editing an aligned table retains its separator and renders alignment', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Table"
      defaultValue={'| Left | Right |\n| :----- | ----: |\n| A | B |'}
      onChange={onChange}
    />
  );
  const input = screen.getByRole('textbox', { name: 'Table' });
  const right = input.querySelectorAll('td')[1];
  expect(right).toHaveStyle({ textAlign: 'right' });
  right.textContent = 'Changed';
  fireEvent.input(input);
  expect(onChange).toHaveBeenCalledWith(
    '| Left | Right | \n| :----- | ----: |\n| A | Changed | '
  );
});

test('unsupported HTML stays inert and original source is available', () => {
  const source = '<img src=x onerror=alert(1)>\n\n<script>alert(1)</script>';
  const onChange = vi.fn();
  const { container } = render(
    <BlockEditor defaultValue={source} label="Unsafe" onChange={onChange} />
  );
  expect(screen.getByRole('textbox', { name: 'Unsafe' })).toHaveValue(source);
  expect(container.querySelector('script,img,iframe')).toBeNull();
  expect(onChange).not.toHaveBeenCalled();
});

const deferredMedia = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((done, fail) => {
    resolve = done;
    reject = fail;
  });
  return { promise, resolve, reject };
};

test('upload replaces captured selection once, escapes video syntax and preserves surrounding source/history', async () => {
  const initial =
    'Before REPLACE after\r\n\r\n```ts\r\nconst x = 1;\r\n```\r\n\r\n| A | B |\r\n| --- | --- |\r\n| 1 | 2 |';
  const pending = deferredMedia<{ url: string; type: 'video' }>();
  const uploadMedia = vi.fn().mockReturnValue(pending.promise);
  const onChange = vi.fn();
  const { result, rerender } = renderHook(
    ({ value }) => useBlockEditorState({ value, uploadMedia, onChange }),
    { initialProps: { value: initial } }
  );
  act(() => result.current.capture({ start: 7, end: 14 }));
  act(() => result.current.openMedia());
  act(() =>
    result.current.changeMedia({
      type: 'video',
      description: String.raw`A [label] \ é`,
    })
  );
  act(() => result.current.capture({ start: 0, end: 0 }));
  const file = new File(['video'], 'clip.mp4', { type: 'video/mp4' });
  let request!: Promise<void>;
  act(() => {
    request = result.current.uploadFile(file);
    void result.current.uploadFile(file);
  });
  expect(uploadMedia).toHaveBeenCalledTimes(1);
  expect(uploadMedia.mock.calls[0][0]).toBe(file);
  expect(uploadMedia.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  expect(onChange).not.toHaveBeenCalled();
  rerender({ value: initial });
  expect(uploadMedia.mock.calls[0][1].signal.aborted).toBe(false);
  await act(async () => {
    pending.resolve({ url: '/clip(1).mp4', type: 'video' });
    await request;
  });
  const value = result.current.value;
  expect(value.startsWith('Before \n\n')).toBe(true);
  expect(value.endsWith(initial.slice(14))).toBe(true);
  expect(value).toContain('/clip%281%29.mp4 "video")');
  const video = value.split('\n\n')[1];
  expect(
    parseInline(video, 0, 0, true)[0]
      .children?.map((part) => part.text)
      .join('')
  ).toBe(String.raw`A [label] \ é`);
  expect(result.current.source).toBe(true);
  expect(onChange).toHaveBeenCalledTimes(1);
  rerender({ value });
  act(() => result.current.undo());
  expect(result.current.value).toBe(initial);
  expect(result.current.selection).toMatchObject({ start: 0, end: 0 });
  act(() => result.current.undo(true));
  expect(result.current.value).toBe(value);
});

test.each([
  'close',
  'cancel',
  'external',
  'edit',
  'disabled',
  'readOnly',
  'unmount',
])('late upload cannot mutate after %s', async (interrupt) => {
  const pending = deferredMedia<{ url: string; type: 'image' }>();
  const uploadMedia = vi.fn().mockReturnValue(pending.promise);
  const onChange = vi.fn();
  const { result, rerender, unmount } = renderHook(
    ({ value, isDisabled, isReadOnly }) =>
      useBlockEditorState({
        value,
        isDisabled,
        isReadOnly,
        uploadMedia,
        onChange,
      }),
    {
      initialProps: { value: 'Original', isDisabled: false, isReadOnly: false },
    }
  );
  act(() => result.current.openMedia());
  let request!: Promise<void>;
  act(() => {
    request = result.current.uploadFile({
      uri: 'file:///picked.png',
      name: 'picked.png',
      type: 'image/png',
    });
  });
  const signal = uploadMedia.mock.calls[0][1].signal;
  if (interrupt === 'close') act(() => result.current.closeMedia());
  if (interrupt === 'cancel') act(() => result.current.cancelMediaUpload());
  if (interrupt === 'external')
    rerender({ value: 'External', isDisabled: false, isReadOnly: false });
  if (interrupt === 'edit')
    act(() => result.current.replace('Edit', { start: 0, end: 8 }));
  if (interrupt === 'disabled')
    rerender({ value: 'Original', isDisabled: true, isReadOnly: false });
  if (interrupt === 'readOnly')
    rerender({ value: 'Original', isDisabled: false, isReadOnly: true });
  if (interrupt === 'unmount') unmount();
  expect(signal.aborted).toBe(true);
  const value = result.current.value;
  const count = onChange.mock.calls.length;
  await act(async () => {
    pending.resolve({ url: '/picked.png', type: 'image' });
    await request;
  });
  expect(result.current.value).toBe(value);
  expect(onChange).toHaveBeenCalledTimes(count);
});

test('picker cancellation, upload error and retry use fresh attempts without prior mutation', async () => {
  const descriptor = {
    uri: 'file:///native.mp4',
    name: 'native.mp4',
    type: 'video/mp4',
  };
  const pickMedia = vi
    .fn()
    .mockResolvedValueOnce(null)
    .mockResolvedValue(descriptor);
  const uploadMedia = vi
    .fn()
    .mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValue({ url: '/native.mp4', type: 'video' });
  const onChange = vi.fn();
  const { result } = renderHook(() =>
    useBlockEditorState({
      defaultValue: 'Keep',
      pickMedia,
      uploadMedia,
      onChange,
    })
  );
  act(() => result.current.openMedia());
  await act(() => result.current.chooseMedia());
  expect(result.current.media?.phase).toBe('idle');
  expect(uploadMedia).not.toHaveBeenCalled();
  await act(() => result.current.chooseMedia());
  expect(uploadMedia.mock.calls[0][0]).toBe(descriptor);
  expect(result.current.media?.phase).toBe('error');
  expect(result.current.value).toBe('Keep');
  expect(onChange).not.toHaveBeenCalled();
  const firstSignal = uploadMedia.mock.calls[0][1].signal;
  await act(() => result.current.uploadFile(result.current.media!.file!));
  expect(uploadMedia.mock.calls[1][1].signal).not.toBe(firstSignal);
  expect(
    parseInline(result.current.value.split('\n\n')[0], 0, 0, true)[0]
      .children?.map((part) => part.text)
      .join('')
  ).toBe('native.mp4');
  expect(onChange).toHaveBeenCalledTimes(1);
});

test.each([
  null,
  { url: 'javascript:bad()', type: 'image' },
  { url: '/safe.png', type: 'video' },
  { url: 3, type: 'image' },
])(
  'invalid upload result is refused without document/history mutation: %j',
  async (response) => {
    const uploadMedia = vi.fn().mockResolvedValue(response);
    const change = vi.fn();
    const { result } = renderHook(() =>
      useBlockEditorState({
        defaultValue: 'Original',
        uploadMedia,
        onChange: change,
      })
    );
    act(() => result.current.openMedia());
    await act(() =>
      result.current.uploadFile(new File(['x'], 'x.png', { type: 'image/png' }))
    );
    expect(result.current.value).toBe('Original');
    expect(result.current.media?.phase).toBe('error');
    expect(result.current.canUndo).toBe(false);
    expect(change).not.toHaveBeenCalled();
  }
);

test('cancelled native picker and stale pending upload cannot target a reopened panel', async () => {
  const picker = deferredMedia<{ uri: string; name: string; type: string }>();
  const uploadMedia = vi
    .fn()
    .mockResolvedValue({ url: '/image.png', type: 'image' });
  const { result } = renderHook(() =>
    useBlockEditorState({
      defaultValue: 'Keep',
      pickMedia: () => picker.promise,
      uploadMedia,
    })
  );
  act(() => result.current.openMedia());
  let request!: Promise<void>;
  act(() => {
    request = result.current.chooseMedia();
  });
  act(() => {
    result.current.closeMedia();
    result.current.openMedia();
  });
  await act(async () => {
    picker.resolve({
      uri: 'file:///old.png',
      name: 'old.png',
      type: 'image/png',
    });
    await request;
  });
  expect(uploadMedia).not.toHaveBeenCalled();
  expect(result.current.value).toBe('Keep');
  expect(result.current.media?.phase).toBe('idle');
});

test('web file input passes the selected File once and undo restores the document', async () => {
  const uploadMedia = vi
    .fn()
    .mockResolvedValue({ url: '/uploaded.png', type: 'image' });
  const change = vi.fn();
  const { container } = render(
    <BlockEditor
      label="Upload editor"
      defaultValue="Keep"
      uploadMedia={uploadMedia}
      onChange={change}
    />
  );
  expect(
    screen.queryByRole('button', { name: 'Edit document with AI' })
  ).toBeNull();
  fireEvent.click(
    screen.getByRole('button', { name: 'Insert image or video' })
  );
  const input = container.ownerDocument.querySelector('input[type="file"]')!;
  expect(input).toHaveAttribute('accept', 'image/*,video/*');
  const file = new File(['pixels'], 'selected.png', { type: 'image/png' });
  await act(async () => {
    fireEvent.change(input, { target: { files: [file] } });
  });
  expect(uploadMedia).toHaveBeenCalledTimes(1);
  expect(uploadMedia.mock.calls[0][0]).toBe(file);
  expect(change).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('textbox', { name: 'Upload editor' })).toHaveValue(
    change.mock.calls[0][0]
  );
  fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
  expect(change).toHaveBeenLastCalledWith('Keep');
});
