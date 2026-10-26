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

// Hydrate only when the static document belongs to the current route. Other
// routes may receive the home document through the host's SPA fallback.
const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
const isPrerendered =
  container.dataset.prerenderedPath === currentPath &&
  container.hasChildNodes();
async function mount() {
  if (
    isPrerendered &&
    currentPath.startsWith('/docs') &&
    currentPath !== '/docs/components'
  ) {
    const { prepareDocumentation } = await import('./pages/docs/docs.page');
    await prepareDocumentation(currentPath.split('/')[2]);
  }
  if (isPrerendered) {
    ReactDOM.hydrateRoot(container, tree);
  } else {
    // Discard the prerendered home markup before a fresh client render of the
    // actual route.
    container.innerHTML = '';
    ReactDOM.createRoot(container).render(tree);
  }
}
void mount();
