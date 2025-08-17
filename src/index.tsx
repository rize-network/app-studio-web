import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProvider from 'src/providers';
import { App } from './App';
import { initializeApiConfig } from './utils/apiConfig';

// Initialize API configuration before rendering the app
initializeApiConfig();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
