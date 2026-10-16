import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Markdown } from '../components/Markdown/Markdown';
import { BlockEditor } from '../components/BlockEditor/BlockEditor';

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
  '[Unsafe](javascript:alert%281%29)',
  '[Unsafe](data:text/html,bad)',
  '![Image](https://example.com/image.png)',
  '- [x] Task\n\n#### Heading 4',
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
