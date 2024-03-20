import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProvider from 'src/providers';
import { App } from './App';
import { ComboBoxProvider } from './components/Form/ComboBox/ComboBox/ComboBox.provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <ComboBoxProvider>
        <App />
      </ComboBoxProvider>
    </AppProvider>
  </React.StrictMode>
);
