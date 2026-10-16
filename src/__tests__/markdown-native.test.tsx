import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { vi } from 'vitest';
import { Linking } from 'react-native';
import { MarkdownView } from '../components/Markdown/Markdown/Markdown.view.native';

// This host tests the native render/link contract, not a device's layout or gestures.
vi.mock('react-native', () => ({
  Platform: { OS: 'ios' },
  Linking: { openURL: vi.fn().mockResolvedValue(undefined) },
}));
vi.mock('app-studio', () => {
  const View = ({ children, accessibilityLabel }: any) => (
    <div aria-label={accessibilityLabel}>{children}</div>
  );
  return {
    View,
    Vertical: View,
    Text: ({ children, onPress, accessibilityRole, fontFamily }: any) => (
      <span role={accessibilityRole} onClick={onPress} style={{ fontFamily }}>
        {children}
      </span>
    ),
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test('native inline links open through Linking without inserting a view inside text', () => {
  render(
    <MarkdownView value="Before [Docs](https://example.com) after é ❤️‍🔥" />
  );
  const link = screen.getByRole('link', { name: 'Docs' });
  expect(link.tagName).toBe('SPAN');
  expect(link.parentElement?.tagName).toBe('SPAN');
  fireEvent.click(link);
  expect(Linking.openURL).toHaveBeenCalledExactlyOnceWith(
    'https://example.com'
  );
});

test('the application handles native routes once and a rejected platform link is contained', async () => {
  const onLinkPress = vi.fn();
  const { rerender } = render(
    <MarkdownView value="[Docs](/docs)" onLinkPress={onLinkPress} />
  );
  fireEvent.click(screen.getByRole('link'));
  expect(onLinkPress).toHaveBeenCalledExactlyOnceWith('/docs');
  expect(Linking.openURL).not.toHaveBeenCalled();
  vi.mocked(Linking.openURL).mockRejectedValueOnce(new Error('unavailable'));
  rerender(<MarkdownView value="[Docs](https://example.com)" />);
  fireEvent.click(screen.getByRole('link'));
  await waitFor(() => expect(Linking.openURL).toHaveBeenCalledOnce());
  expect(screen.getByRole('link')).toHaveTextContent('Docs');
});

test('native code uses the platform monospace font and unsafe source has no links', () => {
  const { rerender, container } = render(
    <MarkdownView label="Code" value={'```ts\nconst é = "❤️‍🔥";\n```'} />
  );
  expect(screen.getByText('const é = "❤️‍🔥";')).toHaveStyle({
    fontFamily: 'Menlo',
  });
  rerender(
    <MarkdownView
      value={'<script>alert(1)</script>\r\n[Bad](javascript:bad)'}
    />
  );
  expect(container.lastElementChild?.lastElementChild?.textContent).toBe(
    '<script>alert(1)</script>\r\n[Bad](javascript:bad)'
  );
  expect(screen.queryByRole('link')).toBeNull();
  expect(container.querySelector('script,input,textarea')).toBeNull();
});

test('native standalone video uses safe navigation or an app renderer, and refusal is inert', () => {
  const player = vi.fn((_url: string, caption: string) => (
    <span>Player: {caption}</span>
  ));
  const { container, rerender } = render(
    <MarkdownView value={'[Clip](/clip.mp4 "video")'} />
  );
  fireEvent.click(screen.getByRole('link', { name: 'Clip' }));
  expect(Linking.openURL).toHaveBeenCalledExactlyOnceWith('/clip.mp4');
  rerender(
    <MarkdownView value={'[Clip](/clip.mp4 "video")'} renderVideo={player} />
  );
  expect(player).toHaveBeenCalledWith('/clip.mp4', 'Clip');
  expect(screen.getByText('Player: Clip')).toBeInTheDocument();
  player.mockClear();
  rerender(
    <MarkdownView
      value={'[Clip](/clip.mp4 "video")'}
      allowVideos={false}
      renderVideo={player}
    />
  );
  expect(screen.queryByRole('link')).toBeNull();
  expect(player).not.toHaveBeenCalled();
  expect(container.textContent).toBe('Clip');
  rerender(
    <MarkdownView
      value={'[Bad](javascript:bad() "video")'}
      renderVideo={player}
    />
  );
  expect(screen.queryByRole('link')).toBeNull();
  expect(player).not.toHaveBeenCalled();
});
