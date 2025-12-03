import React from 'react';
import { ComponentsPage } from 'src/pages/components.page';
import DocsPage from 'src/pages/docs/docs.page';
import { HomePage } from 'src/pages/home.page';
import { ThemeTestPage } from 'src/pages/themeTest.page';

export const ComponentRouter = [
  { name: 'home', path: '/', element: <ComponentsPage /> },
  { name: 'home', path: '/home', element: <HomePage /> },
  { name: 'doc', path: '/docs/:componentName?', element: <DocsPage /> },
  { name: 'theme-test', path: '/theme-test', element: <ThemeTestPage /> },
];
