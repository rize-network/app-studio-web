import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProvider from 'src/providers';
import { App } from './App';
import { initializeApiConfig } from './utils/apiConfig';

// Initialize API configuration before rendering the app
initializeApiConfig();

const container = document.getElementById('root') as HTMLElement;

const tree = (
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

// Only the home page ("/") is server-prerendered into #root (see
// scripts/prerender.mjs), so hydrate there to reuse that DOM. On any other route
// #root still holds the prerendered home markup (the SPA fallback serves the same
// index.html), so render fresh instead of hydrating against a mismatched tree.
const isPrerenderedHome =
  window.location.pathname === '/' && container.hasChildNodes();
if (isPrerenderedHome) {
  ReactDOM.hydrateRoot(container, tree);
} else {
  // Discard the prerendered home markup before a fresh client render of the
  // actual route.
  container.innerHTML = '';
  ReactDOM.createRoot(container).render(tree);
}
