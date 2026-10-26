import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, expect, test, vi } from 'vitest';
import { HighlightedCode } from 'src/pages/code/HighlightedCode';
import { CodeWindow } from 'src/pages/marketing/MarketingLayout';
import { pageMarkdown } from '../../scripts/ai-docs.mjs';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const sample = `<Vertical
  padding={24}
  backgroundColor="color-white"
>
  {/* A multiline JSX example */}
  <Text>Make it yours.</Text>
</Vertical>`;

test('colors multiline JSX tags, props, strings, numbers, and comments while preserving the source', () => {
  const { container, rerender } = render(<HighlightedCode code={sample} />);
  expect(container.querySelector('code')?.textContent).toBe(sample);
  expect(container.querySelector('.token.tag')).toHaveTextContent('Vertical');
  expect(container.querySelectorAll('.token.attr-name')[1]).toHaveTextContent(
    'backgroundColor'
  );
  expect(container.querySelector('.token.attr-value')).toHaveTextContent(
    'color-white'
  );
  expect(container.querySelector('.token.number')).toHaveTextContent('24');
  expect(container.querySelector('.token.comment')).toHaveTextContent(
    'A multiline JSX example'
  );
  const changed = sample.replace('padding={24}', 'padding={12}');
  rerender(<HighlightedCode code={changed} />);
  expect(container.querySelector('code')?.textContent).toBe(changed);
  expect(container.querySelector('.token.number')).toHaveTextContent('12');
});

test.each([
  ['typescript', 'const size: number = 24;'],
  ['javascript', 'export const ready = true;'],
  ['json', '{ "ready": true, "count": 2 }'],
  ['css', 'button { color: navy; }'],
  ['bash', 'npm install app-studio'],
  ['html', '<button disabled>Save</button>'],
])('highlights %s without changing its text', (language, code) => {
  const { container } = render(
    <HighlightedCode code={code} language={language} />
  );
  expect(container.querySelector('code')?.textContent).toBe(code);
  expect(container.querySelector('.token')).not.toBeNull();
});

test('unknown languages remain literal text and never create executable HTML', () => {
  const code = '<script>alert("test")</script><img src=x onerror=alert(1)>';
  const { container } = render(
    <HighlightedCode code={code} language="unknown" />
  );
  expect(container.querySelector('code')?.textContent).toBe(code);
  expect(container.querySelector('script, img')).toBeNull();
});

test('SSR and Markdown keep complete source without gutter numbers or token markup', () => {
  const html = renderToString(<CodeWindow code={sample} />);
  expect(html).toContain('class="token');
  const markdown = pageMarkdown(
    `<main><h1>Example</h1>${html}</main>`,
    'https://example.com/'
  );
  expect(markdown).toContain(`\n${sample}\n`);
  expect(markdown).not.toContain('class="token');
});

test('the highlighted code window copies the exact source', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
  render(<CodeWindow code={sample} />);
  fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent('Copied')
  );
  expect(writeText).toHaveBeenCalledWith(sample);
});
