import React, { ReactNode } from 'react';
import { ResponsiveProvider, ThemeProvider } from 'app-studio';
import { RouterProvider } from 'src/providers/Router';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <RouterProvider>
      <ThemeProvider>
        <ResponsiveProvider>{children}</ResponsiveProvider>
      </ThemeProvider>
    </RouterProvider>
  );
};

export default Wrapper;
