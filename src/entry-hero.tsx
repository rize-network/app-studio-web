import React from 'react';
import { renderToString } from 'react-dom/server';
import { StyleRegistry, createStyleRegistry } from 'app-studio';
import AppProvider from 'src/providers';
import { App } from './App';

/**
 * Build-time server render of the whole app at "/". The output is the EXACT
 * tree the browser hydrates (AppProvider → App → route "/"), so React reuses the
 * prerendered DOM via hydrateRoot instead of repainting it — which keeps the
 * hero (the Largest Contentful Paint) from being re-rendered at mount time.
 *
 * `RouterProvider` switches to a StaticRouter when there is no window, and
 * `HomePage` is eager (not lazy) so the hero renders to HTML here rather than a
 * Suspense fallback. The StyleRegistry captures app-studio's utility CSS; class
 * names are deterministic, so they match the client's global manager.
 */
export function renderHero(): { html: string; css: string } {
  const registry = createStyleRegistry();

  const html = renderToString(
    <StyleRegistry registry={registry}>
      <AppProvider>
        <App />
      </AppProvider>
    </StyleRegistry>
  );

  return { html, css: registry.getServerStyles() };
}
