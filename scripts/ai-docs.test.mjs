import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pageMarkdown } from './ai-docs.mjs';

test('exports actual prose, absolute source links, tables, and code available behind tabs', () => {
  const code =
    'const text = `a\n\n\n  b`;\nconst view = <Button>Save</Button>;';
  const html = `<nav>Ignore navigation</nav><main><article class="docs-prose">
    <h1>Button</h1><p>Use <code>onClick</code> with a <a href="/docs/installation">provider setup</a>.</p>
    <div class="docs-example-toolbar"><button>Copy code</button></div>
    <div class="docs-example-preview">Loading preview…</div>
    <pre hidden data-language="tsx"><code>${code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</code></pre>
    <table><caption>ButtonProps</caption><thead><tr><th>Prop</th><th>Type</th></tr></thead>
      <tbody><tr><th>size Required</th><td><code>'sm' | 'lg'</code></td></tr></tbody></table>
    <details><summary>Usage</summary><p>Keyboard supported.</p></details>
  </article><footer>Ignore footer</footer></main>`;
  const markdown = pageMarkdown(html, 'https://example.com/docs/Button');
  assert(markdown.includes('Source: https://example.com/docs/Button'));
  assert(markdown.includes('# Button'));
  assert(
    markdown.includes('[provider setup](https://example.com/docs/installation)')
  );
  assert(
    markdown.includes(`\n${code}\n`),
    'Preserve code whitespace and JSX exactly.'
  );
  assert(markdown.includes('```tsx'));
  assert(markdown.includes('| Prop | Type |\n| --- | --- |'));
  assert(markdown.includes("'sm' \\| 'lg'"));
  assert(markdown.includes('Keyboard supported.'));
  assert(!/Ignore|Copy code|Loading preview/.test(markdown));
});

test('removes decorative line numbers without changing example code', () => {
  const markdown = pageMarkdown(
    '<main><h1>Framework</h1><pre><code><span aria-hidden="true">1</span>const answer = 42;\n</code></pre><p><a href="javascript:alert(1)">Unsafe scheme</a></p></main>',
    'https://example.com/'
  );
  assert(markdown.includes('```\nconst answer = 42;\n```'));
  assert(!markdown.includes('javascript:'));
});

test('rejects incomplete pages instead of publishing empty AI documentation', () => {
  assert.throws(
    () => pageMarkdown('<main>Loading…</main>', 'https://example.com/docs'),
    /Expected one heading/
  );
});
