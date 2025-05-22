import React from 'react';
import { ComponentsPage } from 'src/pages/components.page';
import DocsPage from 'src/pages/docs/docs.page';
import { HomePage } from 'src/pages/home.page';
import ChatInputDemo from 'src/pages/chat.page';

export const ComponentRouter = [
  { name: 'home', path: '/', element: <ComponentsPage /> },
  { name: 'home', path: '/home', element: <HomePage /> },
  { name: 'doc', path: '/docs/:componentName?', element: <DocsPage /> },
  {
    name: 'chat-input-demo',
    path: '/chat-input-demo',
    element: <ChatInputDemo />,
  },
];
