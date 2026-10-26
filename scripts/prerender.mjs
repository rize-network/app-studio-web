import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import assert from 'node:assert/strict';
import { pageMarkdown, writeAiDocuments } from './ai-docs.mjs';
import { load } from 'cheerio';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { renderPage, publicPaths, SITE_URL, getPageMetadata, markdownPath } =
  await import(pathToFileURL(resolve(root, 'build-ssr/entry-hero.js')).href);
const template = readFileSync(resolve(root, 'build/index.html'), 'utf8');
assert(
  template.includes('<div id="root"></div>'),
  'Run npm run build:web to generate a fresh HTML template.'
);

// Each public page serves its content and metadata before JavaScript loads.
const pages = [];
for (const route of publicPaths) {
  const { html: rawHtml, css, head } = await renderPage(route);
  assert(!/<!--\$[!?]-->/.test(rawHtml), `Incomplete server render: ${route}`);
  assert(rawHtml.includes('<h1'), `Missing page content: ${route}`);
  const { html, themeCss } = liftThemeVars(rawHtml, css);
  const output = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace(
      '</head>',
      `${head}<style id="app-studio-ssr">${css}</style><style id="app-studio-theme">${themeCss}</style></head>`
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-prerendered-path="${route}">${html}</div>`
    );
  const directory = resolve(root, 'build', route.slice(1));
  mkdirSync(directory, { recursive: true });
  writeFileSync(resolve(directory, 'index.html'), output);
  const description = load(html)('.docs-reference-heading p').first().text();
  pages.push({
    ...getPageMetadata(route),
    ...(description ? { description } : {}),
    markdown: pageMarkdown(html, SITE_URL + route),
  });
  console.log(`prerender: ${route} — ${html.length} bytes HTML`);
}
writeAiDocuments({
  pages,
  site: SITE_URL,
  output: resolve(root, 'build'),
  markdownPath,
});
writeFileSync(
  resolve(root, 'build/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths
    .map((path) => `<url><loc>${SITE_URL}${path}</loc></url>`)
    .join('')}</urlset>\n`
);

// ThemeProvider emits its palette in SSR. Move only referenced variables into head
// so hydration sees the same component tree without shipping the entire palette.
function liftThemeVars(htmlStr, utilityCss) {
  const styleRe = /<style>(:root\{[\s\S]*?)<\/style>/;
  const match = htmlStr.match(styleRe);
  if (!match) return { html: htmlStr, themeCss: '' };
  const html = htmlStr.replace(styleRe, '');
  const blocks = [...match[1].matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(
    (block) => ({
      selector: block[1],
      declarations: block[2]
        .split(';')
        .map((declaration) => declaration.trim())
        .filter(Boolean)
        .map((declaration) => {
          const separator = declaration.indexOf(':');
          return {
            name: declaration.slice(0, separator).trim(),
            value: declaration.slice(separator + 1).trim(),
          };
        }),
    })
  );
  const variables = (value) =>
    [...value.matchAll(/var\(\s*(--[\w-]+)\s*\)/g)].map((item) => item[1]);
  const used = new Set(variables(html + utilityCss));
  let changed = true;
  while (changed) {
    changed = false;
    for (const block of blocks) {
      for (const declaration of block.declarations) {
        if (!used.has(declaration.name)) continue;
        for (const reference of variables(declaration.value)) {
          if (!used.has(reference)) {
            used.add(reference);
            changed = true;
          }
        }
      }
    }
  }
  const themeCss = blocks
    .map((block) => {
      const kept = block.declarations.filter((declaration) =>
        used.has(declaration.name)
      );
      return kept.length
        ? `${block.selector}{${kept
            .map(({ name, value }) => `${name}:${value}`)
            .join(';')}}`
        : '';
    })
    .join('');
  return { html, themeCss };
}
