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
import { Markdown } from '../components/Markdown/Markdown';
import { BlockEditor } from '../components/BlockEditor/BlockEditor';
import { useMarkdownTyping } from '../components/Markdown/Markdown/useMarkdownTyping';
import { ControlledBlockEditor } from '../components/BlockEditor/examples';
import { MarkdownExamples } from '../components/Markdown/examples';
import { parseDocument } from '../components/BlockEditor/BlockEditor/BlockEditor.model';

afterEach(cleanup);

test('Markdown renders document semantics without editing controls', () => {
  const { container } = render(
    <Markdown
      label="Notes"
      value={
        '# Title\n\n## Section\n\n### Detail\n\n**bold** *italic* <u>underlined</u> ~~removed~~ `inline`\n\n- Parent\n  - Child\n\n1. First\n2. Second\n\n> Quoted'
      }
    />
  );
  expect(screen.getByRole('region', { name: 'Notes' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    'Section'
  );
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Detail');
  expect(container.querySelector('strong')).toHaveTextContent('bold');
  expect(container.querySelector('em')).toHaveTextContent('italic');
  expect(container.querySelector('u')).toHaveTextContent('underlined');
  expect(container.querySelector('s')).toHaveTextContent('removed');
  expect(container.querySelector('code')).toHaveTextContent('inline');
  expect(container.querySelectorAll('ul li')).toHaveLength(2);
  expect(container.querySelector('ul li:last-child')).toHaveStyle({
    marginLeft: '16px',
  });
  expect(container.querySelectorAll('ol li')).toHaveLength(2);
  expect(container.querySelector('blockquote')).toHaveTextContent('Quoted');
  expect(
    container.querySelector('[contenteditable="true"],textarea,button')
  ).toBeNull();
});

test('code is preformatted and inert; table cells keep alignment and escaped pipes', () => {
  const { container } = render(
    <Markdown
      value={
        '```html\n<script>throw Error("never")</script>\n  é 👨‍👩‍👧‍👦\n```\n\n| Left | Right |\n| :--- | ---: |\n| A\\|B | **C** |'
      }
    />
  );
  expect(container.querySelector('pre code')?.textContent).toBe(
    '<script>throw Error("never")</script>\n  é 👨‍👩‍👧‍👦'
  );
  expect(container.querySelector('script')).toBeNull();
  expect(screen.getByRole('cell', { name: 'A|B' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'C' })).toHaveStyle({
    textAlign: 'right',
  });
  expect(container.querySelector('table')?.parentElement).toHaveStyle({
    overflowX: 'auto',
  });
});

test('safe links navigate normally or call the application exactly once', () => {
  const onLinkPress = vi.fn();
  const { rerender } = render(
    <Markdown value="[Docs](/docs) [Mail](mailto:hello@example.com)" />
  );
  expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute(
    'href',
    '/docs'
  );
  expect(screen.getByRole('link', { name: 'Mail' })).toHaveAttribute(
    'href',
    'mailto:hello@example.com'
  );
  rerender(<Markdown value="[Docs](/docs)" onLinkPress={onLinkPress} />);
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });
  fireEvent(screen.getByRole('link', { name: 'Docs' }), click);
  expect(click.defaultPrevented).toBe(true);
  expect(onLinkPress).toHaveBeenCalledExactlyOnceWith('/docs');
});

test.each([
  '<img src=x onerror=alert(1)>\n<script>alert(1)</script>',
  'export const A = () => alert(1);\n\n<Custom value={42} />',
])('unsupported syntax is preserved as inert source: %s', (value) => {
  const onLinkPress = vi.fn();
  const { container } = render(
    <Markdown
      value={value}
      onLinkPress={onLinkPress}
      labels={{ sourceFallback: 'Source conservée' }}
    />
  );
  expect(screen.getByText('Source conservée')).toBeInTheDocument();
  expect(container.lastElementChild?.lastElementChild?.textContent).toBe(value);
  expect(
    container.querySelector(
      'script,img,iframe,a,textarea,[contenteditable="true"]'
    )
  ).toBeNull();
  expect(onLinkPress).not.toHaveBeenCalled();
});

test('prop updates and multiple viewers remain isolated from the editor', () => {
  const onChange = vi.fn();
  const { rerender } = render(
    <>
      <Markdown value="# First" />
      <Markdown value="# Other" />
      <BlockEditor label="Editor" defaultValue="Keep" onChange={onChange} />
    </>
  );
  rerender(
    <>
      <Markdown value="# Updated é ❤️‍🔥" />
      <Markdown value="# Other" />
      <BlockEditor label="Editor" defaultValue="Keep" onChange={onChange} />
    </>
  );
  expect(screen.queryByRole('heading', { name: 'First' })).toBeNull();
  expect(
    screen.getByRole('heading', { name: 'Updated é ❤️‍🔥' })
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Other' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Editor' })).toHaveTextContent(
    'Keep'
  );
  expect(onChange).not.toHaveBeenCalled();
});

test('an empty value has no artificial block or fallback notice', () => {
  const { container } = render(<Markdown value="" />);
  expect(container.textContent).toBe('');
  expect(container.querySelector('p,br')).toBeNull();
});

test('display formats render while the editor preserves their exact CRLF source', () => {
  const value =
    '#### Four\r\n\r\n##### Five\r\n\r\n###### Six\r\n\r\n---\r\n\r\n- [x] Done\r\n- [ ] Pending\r\n\r\nfirst  \r\nsecond\\\r\nthird\r\n\r\n![Diagram](/diagram.png "Architecture")';
  const onChange = vi.fn();
  const { container } = render(<Markdown value={value} />);
  for (const level of [4, 5, 6])
    expect(screen.getByRole('heading', { level })).toBeInTheDocument();
  expect(container.querySelectorAll('hr')).toHaveLength(1);
  expect(screen.getByRole('checkbox', { name: 'Done' })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: 'Pending' })).not.toBeChecked();
  expect(screen.getByRole('checkbox', { name: 'Done' })).toBeDisabled();
  expect(container.querySelectorAll('br')).toHaveLength(2);
  const image = screen.getByRole('img', { name: 'Diagram' });
  expect(image).toHaveAttribute('src', '/diagram.png');
  expect(image).toHaveAttribute('title', 'Architecture');
  expect(parseDocument(value).sourceMode).toBe(true);
  render(
    <BlockEditor label="Exact source" value={value} onChange={onChange} />
  );
  expect(screen.getByRole('textbox', { name: 'Exact source' })).toHaveValue(
    value.replace(/\r\n/g, '\n')
  );
  expect(onChange).not.toHaveBeenCalled();
});

test('balanced link destinations, titles and custom references share a safe boundary', () => {
  const renderLink = vi.fn((url: string, children: React.ReactNode) =>
    url.startsWith('document://') ? <button>{children}</button> : undefined
  );
  const { container } = render(
    <Markdown
      value={
        '[Docs](https://example.com/a_(b) "Title") [**Context**](document://item-1) [Bad](javascript:alert(1)) [Data](data:text/html,bad)'
      }
      renderLink={renderLink}
    />
  );
  const link = screen.getByRole('link', { name: 'Docs' });
  expect(link).toHaveAttribute('href', 'https://example.com/a_(b)');
  expect(link).toHaveAttribute('title', 'Title');
  expect(screen.getByRole('button', { name: 'Context' })).toBeInTheDocument();
  expect(renderLink.mock.calls.map(([url]) => url)).toEqual([
    'https://example.com/a_(b)',
    'document://item-1',
  ]);
  expect(container.querySelectorAll('a')).toHaveLength(1);
  expect(container.textContent).toContain('Bad');
  expect(container.textContent).toContain('Data');
});

test('image refusal and loading failure preserve alt text without network-capable elements', () => {
  const { container, rerender } = render(
    <Markdown
      value={'![Alt](/safe.png) ![Bad](javascript:alert(1))'}
      allowImages={false}
    />
  );
  expect(container.querySelector('img')).toBeNull();
  expect(container.textContent).toBe('Alt Bad');
  rerender(<Markdown value={'![Alt](/safe.png)'} />);
  fireEvent.error(screen.getByRole('img', { name: 'Alt' }));
  expect(container.querySelector('img')).toBeNull();
  expect(container.textContent).toBe('Alt');
});

test('an incomplete streaming fence keeps headings and code inert', () => {
  const { container } = render(
    <Markdown
      value={'# Answer\n\n```html\n<script>bad()</script>\npartial'}
      isStreaming
    />
  );
  expect(screen.getByRole('heading', { name: 'Answer' })).toBeInTheDocument();
  expect(container.querySelector('pre code')?.textContent).toBe(
    '<script>bad()</script>\npartial'
  );
  expect(container.querySelector('script')).toBeNull();
});

test('typing catches append after a pause, resets replacement and completes once', () => {
  vi.useFakeTimers();
  try {
    const done = vi.fn();
    const { result, rerender, unmount } = renderHook(
      ({ value, streaming }) =>
        useMarkdownTyping(value, {
          typing: { charsPerTick: 1, intervalMs: 10 },
          isStreaming: streaming,
          onTypingComplete: done,
        }),
      { initialProps: { value: 'AB', streaming: true } }
    );
    act(() => vi.advanceTimersByTime(30));
    expect(result.current.displayedText).toBe('A');
    expect(done).not.toHaveBeenCalled();
    rerender({ value: 'ABCD', streaming: true });
    for (let tick = 0; tick < 3; tick++) act(() => vi.advanceTimersByTime(10));
    expect(result.current.displayedText).toBe('ABC');
    rerender({ value: 'ABCD', streaming: false });
    act(() => vi.advanceTimersByTime(10));
    expect(result.current).toEqual({ displayedText: 'ABCD', isTyping: false });
    expect(done).toHaveBeenCalledTimes(1);
    rerender({ value: 'XY', streaming: false });
    expect(result.current.displayedText).toBe('');
    act(() => vi.advanceTimersByTime(10));
    expect(result.current.displayedText).toBe('X');
    act(() => vi.advanceTimersByTime(10));
    expect(done).toHaveBeenCalledTimes(2);
    rerender({ value: 'Long unfinished', streaming: true });
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  } finally {
    vi.useRealTimers();
  }
});

test('fast streaming chunks do not starve the reveal timer or split composed characters', () => {
  vi.useFakeTimers();
  try {
    const done = vi.fn();
    const { result, rerender } = renderHook(
      ({ value, streaming }) =>
        useMarkdownTyping(value, {
          typing: { charsPerTick: 1, intervalMs: 10 },
          isStreaming: streaming,
          onTypingComplete: done,
        }),
      { initialProps: { value: 'A', streaming: true } }
    );
    for (const value of ['AB', 'ABC', 'ABCD', 'ABCDE']) {
      rerender({ value, streaming: true });
      act(() => vi.advanceTimersByTime(5));
    }
    expect(result.current.displayedText.length).toBeGreaterThan(0);
    rerender({ value: 'e', streaming: true });
    act(() => vi.advanceTimersByTime(20));
    expect(result.current.displayedText).toBe('');
    rerender({ value: 'e\u0301', streaming: true });
    act(() => vi.advanceTimersByTime(20));
    expect(result.current.displayedText).toBe('');
    rerender({ value: 'e\u0301👨', streaming: true });
    act(() => vi.advanceTimersByTime(10));
    expect(result.current.displayedText).toBe('e\u0301');
    rerender({ value: 'e\u0301👨‍👩‍👧‍👦', streaming: true });
    act(() => vi.advanceTimersByTime(30));
    expect(result.current.displayedText).toBe('e\u0301');
    rerender({ value: 'e\u0301👨‍👩‍👧‍👦', streaming: false });
    act(() => vi.advanceTimersByTime(10));
    expect(result.current.displayedText).toBe('e\u0301👨‍👩‍👧‍👦');
    expect(done).toHaveBeenCalledTimes(1);
  } finally {
    vi.useRealTimers();
  }
});

test('reduced motion and disabled typing are immediate and viewer callbacks stay isolated', () => {
  const original = window.matchMedia;
  window.matchMedia = vi.fn().mockReturnValue({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  try {
    const one = vi.fn();
    const two = vi.fn();
    const { rerender } = render(
      <>
        <Markdown value="# First" typing onTypingComplete={one} />
        <Markdown value="# Second" typing onTypingComplete={two} />
      </>
    );
    expect(screen.getByRole('heading', { name: 'First' })).toBeInTheDocument();
    expect(one).toHaveBeenCalledTimes(1);
    expect(two).toHaveBeenCalledTimes(1);
    rerender(
      <>
        <Markdown value="# First" typing onTypingComplete={one} />
        <Markdown value="# Changed" typing={false} onTypingComplete={two} />
      </>
    );
    expect(
      screen.getByRole('heading', { name: 'Changed' })
    ).toBeInTheDocument();
    expect(one).toHaveBeenCalledTimes(1);
    expect(two).toHaveBeenCalledTimes(1);
  } finally {
    window.matchMedia = original;
  }
});

test('without Intl.Segmenter typing shows the complete document immediately', async () => {
  const original = Intl.Segmenter;
  try {
    Object.defineProperty(Intl, 'Segmenter', {
      value: undefined,
      configurable: true,
    });
    let withoutSegmenter!: typeof useMarkdownTyping;
    await act(async () => {
      vi.resetModules();
      ({ useMarkdownTyping: withoutSegmenter } = await import(
        '../components/Markdown/Markdown/useMarkdownTyping'
      ));
    });
    const done = vi.fn();
    const { result } = renderHook(() =>
      withoutSegmenter('é 👨‍👩‍👧‍👦', { typing: true, onTypingComplete: done })
    );
    expect(result.current).toEqual({ displayedText: 'é 👨‍👩‍👧‍👦', isTyping: false });
    expect(done).toHaveBeenCalledTimes(1);
  } finally {
    Object.defineProperty(Intl, 'Segmenter', {
      value: original,
      configurable: true,
    });
  }
});

test('standalone safe video has controls, no autoplay/preload, and falls back on error', () => {
  const { container, rerender } = render(
    <Markdown value={'[Movie](/clip.mp4 "video")'} />
  );
  const video = container.querySelector('video')!;
  expect(video).toHaveAttribute('src', '/clip.mp4');
  expect(video).toHaveAttribute('controls');
  expect(video).toHaveAttribute('preload', 'none');
  expect(video).not.toHaveAttribute('autoplay');
  expect(container.querySelector('iframe')).toBeNull();
  fireEvent.error(video);
  expect(container.querySelector('video,a')).toBeNull();
  expect(container.textContent).toBe('Movie');
  rerender(<Markdown value={'[Other](/other.mp4 "video")'} />);
  expect(container.querySelector('video')).toHaveAttribute('src', '/other.mp4');
});

test('video is not autoembedded inside prose, a list, or code', () => {
  const { container } = render(
    <Markdown
      value={
        'Before [inline](/clip.mp4 "video") after\n\n- [listed](/clip.mp4 "video")\n\n```md\n[code](/clip.mp4 "video")\n```'
      }
    />
  );
  expect(container.querySelector('video')).toBeNull();
  expect(screen.getByRole('link', { name: 'inline' })).toHaveAttribute(
    'href',
    '/clip.mp4'
  );
  expect(screen.getByRole('link', { name: 'listed' })).toBeInTheDocument();
  expect(container.querySelector('pre code')?.textContent).toBe(
    '[code](/clip.mp4 "video")'
  );
});

test.each([
  'javascript:alert(1)',
  'data:video/mp4,bad',
  'file:///secret',
  'blob:private',
  'mailto:a@example.com',
  'tel:123',
])('refuses unsafe video URL without invoking custom players: %s', (url) => {
  const player = vi.fn();
  const { container } = render(
    <Markdown value={`[Caption](${url} "video")`} renderVideo={player} />
  );
  expect(container.querySelector('video,source,a,iframe')).toBeNull();
  expect(container.textContent).toContain('Caption');
  expect(player).not.toHaveBeenCalled();
});

test('disabled videos are entirely inert and custom players get decoded captions only when allowed', () => {
  const player = vi.fn((url: string, caption: string) => (
    <button>{caption}</button>
  ));
  const { container, rerender } = render(
    <Markdown
      value={String.raw`[A \[label\]](/clip.mp4 "video")`}
      renderVideo={player}
      allowVideos={false}
    />
  );
  expect(container.querySelector('video,a,button,source')).toBeNull();
  expect(player).not.toHaveBeenCalled();
  expect(container.textContent).toBe('A [label]');
  rerender(
    <Markdown
      value={String.raw`[A \[label\]](/clip.mp4 "video")`}
      renderVideo={player}
    />
  );
  expect(player).toHaveBeenCalledWith('/clip.mp4', 'A [label]');
  expect(screen.getByRole('button', { name: 'A [label]' })).toBeInTheDocument();
});

test.each([ControlledBlockEditor, MarkdownExamples])(
  'primary catalog demo exposes document AI with explicit simulation',
  (Example) => {
    const { container } = render(<Example />);
    expect(
      screen.getByRole('button', { name: 'Edit document with AI' })
    ).toBeInTheDocument();
    expect(container.textContent).toMatch(/simul|Simulat/);
    fireEvent.click(
      screen.getByRole('button', { name: 'Edit document with AI' })
    );
    expect(
      screen.getByRole('textbox', { name: 'Describe the change' })
    ).toBeInTheDocument();
  }
);
