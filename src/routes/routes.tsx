import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from 'src/layouts/AppLayout';
import { componentList } from 'src/configs/componentList';

const DocsPage = lazy(() => import('src/pages/docs/docs.page'));
const HomePage = lazy(() => import('src/pages/home.page'));
const ThemeTestPage = lazy(() => import('src/pages/themeTest.page'));

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
