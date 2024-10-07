import React from 'react';
import { ComponentsPage } from 'src/pages/components.page';
import { HomePage } from 'src/pages/home.page';

export const ComponentRouter = [
  { name: 'home', path: '/', element: <ComponentsPage /> },
  { name: 'home', path: '/home', element: <HomePage /> },
];
