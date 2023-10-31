import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

interface RouterProps {
  children: React.ReactNode;
}

export const RouterProvider: FC<RouterProps> = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
