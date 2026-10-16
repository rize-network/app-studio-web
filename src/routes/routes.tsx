import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from 'src/layouts/AppLayout';
import { componentList } from 'src/configs/componentList';

// HomePage is eager (not lazy) so it can be server-prerendered and hydrated for
// a fast first paint; the other heavy pages stay lazy.
import HomePage from 'src/pages/home.page';

// Lazy-load heavy page components to reduce initial bundle size
const DocsPage = lazy(() => import('src/pages/docs/docs.page'));
const GalleryComparePage = lazy(() => import('src/pages/galleryCompare.page'));
const GalleryLivePage = lazy(() => import('src/pages/galleryLive.page'));
const ThemeTestPage = lazy(() => import('src/pages/themeTest.page'));
const DesignSystemPage = lazy(() => import('src/pages/designSystem.page'));

export const ComponentRouter = [
  // The landing page is a standalone top-level route (NOT wrapped in AppLayout):
  // it has its own full-bleed layout and doesn't need the gallery sidebar, and
  // keeping it out of AppLayout removes that wrapper DOM + the componentList
  // sidebar computation from the prerendered/hydrated home page's critical path.
  { path: '/', element: <HomePage /> },
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
      { path: '/docs/:componentName?', element: <DocsPage /> },
      { path: '/docs', element: <DocsPage /> },
      { path: '/theme-test', element: <ThemeTestPage /> },
      ...componentList.filter((item) => item.name !== 'Home'), // Home is handled separately
    ],
  },
];
