import React, { lazy } from 'react';
import { ComponentsPage } from 'src/pages/components.page';
import DocsPage from 'src/pages/docs/docs.page';
import { HomePage } from 'src/pages/home.page';

// Lazy load ADK pages
const ADKComponentsPage = lazy(
  () => import('src/pages/adk/adkComponents.page')
);
const AgentChatPage = lazy(() => import('src/pages/adk/agentChat.page'));
const AdkIntegrationPage = lazy(
  () => import('src/pages/adk/adkIntegration.page')
);

export const ComponentRouter = [
  { name: 'home', path: '/', element: <ComponentsPage /> },
  { name: 'home', path: '/home', element: <HomePage /> },
  { name: 'doc', path: '/docs/:componentName?', element: <DocsPage /> },
  // ADK Routes
  {
    name: 'adk-components',
    path: '/adk-components',
    element: <ADKComponentsPage />,
  },
  { name: 'agent-chat', path: '/agent-chat', element: <AgentChatPage /> },
  {
    name: 'adk-integration',
    path: '/adk-integration',
    element: <AdkIntegrationPage />,
  },
  // Legacy ADK paths for compatibility
  { name: 'adk', path: '/adk', element: <ADKComponentsPage /> },
  {
    name: 'adk-components-alt',
    path: '/adk/components',
    element: <ADKComponentsPage />,
  },
];
