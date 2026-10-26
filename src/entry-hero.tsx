import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import { text } from 'node:stream/consumers';
import { StyleRegistry, createStyleRegistry } from 'app-studio';
import AppProvider from 'src/providers';
import { App } from './App';
import { getPageMetadata, renderMetadata } from './seo';
import { prepareDocumentation } from './pages/docs/docs.page';
export { publicPaths, SITE_URL, getPageMetadata, markdownPath } from './seo';

/** Render public pages and collect their CSS before hydration. Documentation
 * content is prepared on both sides; interactive examples mount in the browser.
 */
export async function renderPage(location = '/') {
  if (
    location === '/docs' ||
    (location.startsWith('/docs/') && location !== '/docs/components')
  )
    await prepareDocumentation(location.split('/')[2]);
  const registry = createStyleRegistry();

  const tree = (
    <StyleRegistry registry={registry}>
      <AppProvider location={location}>
        <App />
      </AppProvider>
    </StyleRegistry>
  );
  // Pipe after all lazy icons resolve to produce complete HTML without streaming scripts.
  const output = new PassThrough();
  const html = await new Promise<string>((resolve, reject) => {
    text(output).then(resolve, reject);
    const { pipe } = renderToPipeableStream(tree, {
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
      onAllReady() {
        pipe(output);
      },
      onError: reject,
    });
  });

  const metadata = getPageMetadata(location);
  return {
    html,
    css: registry.getServerStyles(),
    head: renderMetadata(metadata),
  };
}
