import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { load } from 'cheerio';

// Export the rendered documentation, so agents and people get the same APIs.
export function pageMarkdown(html, url) {
  const $ = load(html);
  const content = (
    $('main .docs-prose').length ? $('main .docs-prose') : $('main')
  ).first();
  assert.equal(content.find('h1').length, 1, `Expected one heading: ${url}`);
  content
    .find(
      'script, style, svg, nav, footer, button, input, select, textarea, [aria-hidden="true"], .m-copy, .m-code-bar, .docs-static-code > div, .docs-props-scroll-hint, .docs-example-toolbar, .docs-example-view-controls, .docs-example-picker, .docs-example-preview'
    )
    .remove();
  const codeBlocks = [];
  const inline = (node) => node.children?.map(convert).join('') || '';
  const text = (value) => value.replace(/\s+/g, ' ').trim();
  const fenced = (code) => {
    const runs = code.match(/`+/g) || [];
    return '`'.repeat(Math.max(3, ...runs.map((run) => run.length + 1)));
  };
  function convert(node) {
    if (node.type === 'text') return node.data.replace(/\s+/g, ' ');
    if (node.type !== 'tag') return '';
    const element = $(node);
    const children = () => inline(node);
    if (node.name === 'pre') {
      const code = element.text().replace(/\n$/, '');
      const fence = fenced(code);
      const language =
        element.attr('data-language') ||
        (element.attr('aria-label')?.includes('.tsx') ? 'tsx' : '');
      const token = `\u0000CODE${codeBlocks.length}\u0000`;
      codeBlocks.push(`${fence}${language}\n${code}\n${fence}`);
      return `\n\n${token}\n\n`;
    }
    if (node.name === 'code') {
      const code = element.text();
      const fence = '`'.repeat(
        Math.max(1, ...(code.match(/`+/g) || []).map((run) => run.length + 1))
      );
      const pad = /^`|`$/.test(code) ? ' ' : '';
      return `${fence}${pad}${code}${pad}${fence}`;
    }
    if (/^h[1-6]$/.test(node.name))
      return `\n\n${'#'.repeat(Number(node.name[1]))} ${text(children())}\n\n`;
    if (node.name === 'a') {
      const label = text(children()).replace(/([\[\]])/g, '\\$1');
      const href = element.attr('href');
      if (!label || !href) return label;
      const target = new URL(href, url);
      return /^https?:$/.test(target.protocol)
        ? `[${label}](${target.href
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')})`
        : label;
    }
    if (node.name === 'br') return '\n';
    if (node.name === 'strong' || node.name === 'b') return `**${children()}**`;
    if (node.name === 'em' || node.name === 'i') return `*${children()}*`;
    if (node.name === 'img') return element.attr('alt') || '';
    if (node.name === 'table') {
      const rows = element
        .find('tr')
        .toArray()
        .map((row) =>
          $(row)
            .children('th,td')
            .toArray()
            .map((cell) => text(convert(cell)).replace(/\|/g, '\\|'))
        );
      if (!rows.length) return '';
      const row = (cells) => `| ${cells.join(' | ')} |`;
      const caption = element.find('caption').text();
      return `\n\n${caption ? `**${caption}**\n\n` : ''}${[
        row(rows[0]),
        row(rows[0].map(() => '---')),
        ...rows.slice(1).map(row),
      ].join('\n')}\n\n`;
    }
    if (node.name === 'ul' || node.name === 'ol') {
      const items = element
        .children('li')
        .toArray()
        .map((item, index) => {
          const body = inline(item).trim().replace(/\n/g, '\n  ');
          return `${node.name === 'ol' ? `${index + 1}.` : '-'} ${body}`;
        });
      return `\n\n${items.join('\n')}\n\n`;
    }
    if (node.name === 'blockquote') return `\n\n> ${text(children())}\n\n`;
    if (
      [
        'div',
        'section',
        'article',
        'header',
        'p',
        'details',
        'summary',
      ].includes(node.name)
    )
      return `\n\n${children()}\n\n`;
    return children();
  }
  const markdown = inline(content[0])
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .replace(/\u0000CODE(\d+)\u0000/g, (_, index) => codeBlocks[Number(index)]);
  return `Source: ${url}\n\n${markdown}\n`;
}

export function writeAiDocuments({ pages, site, output, markdownPath }) {
  const link = (page) =>
    `- [${page.title.replace(
      / — App Studio(?: documentation)?$/,
      ''
    )}](${site}${markdownPath(page.path)}): ${page.description}`;
  const index = `# App Studio\n\n> App Studio is a TypeScript styling framework for React and React Native. The separate @app-studio/components package adds ready-made UI controls built on the framework.\n\nThe homepage presents app-studio; /components presents the component library. Install app-studio alone for custom components, or install both packages for ready-made controls. Import paths, required props, literal defaults, and working examples are documented in each reference. React Native support varies by component. Check the installation and native guides for peers and platform limitations.\n\nThese Markdown pages are generated from the same HTML as the public documentation. Each page identifies its canonical source URL. Fetch the relevant page rather than loading the entire export. The framework and component library have separate licenses; consult the LICENSE included with the version you adopt.\n\n`;
  const marketing = pages.filter((page) => !page.path.startsWith('/docs'));
  marketing.sort((a, b) => a.path.length - b.path.length);
  const references = pages.filter((page) => /^\/docs\/[A-Z]/.test(page.path));
  const guides = pages.filter(
    (page) => page.path.startsWith('/docs') && !references.includes(page)
  );
  const llms =
    index +
    `## Framework and component library\n\n${marketing
      .map(link)
      .join('\n')}\n\n## Guides and installation\n\n${guides
      .map(link)
      .join('\n')}\n\n## Component API references\n\n${references
      .map(link)
      .join(
        '\n'
      )}\n\n## Optional\n\n- [Complete documentation](${site}/llms-full.txt): All public pages in one larger Markdown file. Prefer individual pages for focused tasks.\n- [Framework source](https://github.com/rize-network/app-studio): Styling engine implementation and MIT license.\n- [Component source](https://github.com/rize-network/app-studio-components): Component implementation, examples, and package license.\n`;
  assert(
    Buffer.byteLength(llms) < 25000,
    'Keep llms.txt a concise index; split by topic if it grows.'
  );
  for (const page of pages) {
    assert(page.markdown.includes(`Source: ${site}${page.path}`));
    const destination = resolve(output, '.' + markdownPath(page.path));
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, page.markdown);
  }
  writeFileSync(resolve(output, 'llms.txt'), llms);
  writeFileSync(
    resolve(output, 'llms-full.txt'),
    `# App Studio complete documentation\n\nGenerated from the public pages. Start with ${site}/llms.txt for a smaller index.\n\n${pages
      .map((page) => page.markdown)
      .join('\n---\n\n')}`
  );
  console.log(
    `AI documentation: ${pages.length} Markdown pages, llms.txt, llms-full.txt`
  );
}
