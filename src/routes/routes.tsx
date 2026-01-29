import React from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from 'src/layouts/AppLayout';
import DocsPage from 'src/pages/docs/docs.page';
import { HomePage } from 'src/pages/home.page';
import { ThemeTestPage } from 'src/pages/themeTest.page';
import { componentList } from 'src/configs/componentList';

export const ComponentRouter = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/home', element: <Navigate to="/" replace /> },
      { path: '/components', element: <Navigate to="/accordion" replace /> },
      { path: '/docs/:componentName?', element: <DocsPage /> },
      { path: '/docs', element: <DocsPage /> },
      { path: '/theme-test', element: <ThemeTestPage /> },
      ...componentList.filter((item) => item.name !== 'Home'), // Home is handled separately
    ],
  },
];
