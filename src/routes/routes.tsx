import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from 'src/layouts/AppLayout';
import { componentList } from 'src/configs/componentList';

// Both landing pages are eager for server prerendering and hydration.
import HomePage from 'src/pages/home.page';
import AppStudioPage from 'src/pages/appStudio.page';

// Lazy-load heavy page components to reduce initial bundle size
const DocsPage = lazy(() => import('src/pages/docs/docs.page'));
const ComponentCatalog = lazy(() => import('src/pages/docs/ComponentCatalog'));
const GalleryComparePage = lazy(() => import('src/pages/galleryCompare.page'));
const GalleryLivePage = lazy(() => import('src/pages/galleryLive.page'));
const ThemeTestPage = lazy(() => import('src/pages/themeTest.page'));
const DesignSystemPage = lazy(() => import('src/pages/designSystem.page'));

export const ComponentRouter = [
  // Marketing pages have their own layout, outside the documentation shell.
  { path: '/', element: <AppStudioPage /> },
  { path: '/components', element: <HomePage /> },
  { path: '/app-studio', element: <Navigate to="/" replace /> },
  { path: '/home', element: <Navigate to="/" replace /> },
  {
    path: '/gallery-live',
    element: <GalleryLivePage />,
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/gallery-compare', element: <GalleryComparePage /> },
      { path: '/design-system', element: <DesignSystemPage /> },
      { path: '/docs/components', element: <ComponentCatalog /> },
      { path: '/docs/:componentName?', element: <DocsPage /> },
      { path: '/docs', element: <DocsPage /> },
      { path: '/theme-test', element: <ThemeTestPage /> },
      ...componentList.filter((item) => item.name !== 'Home'), // Home is handled separately
    ],
  },
];
