import React, { ReactNode } from 'react';
import { ResponsiveProvider, ThemeProvider } from 'app-studio';
import { RouterProvider } from 'src/providers/Router';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ResponsiveProvider>
        <RouterProvider>{children}</RouterProvider>
      </ResponsiveProvider>
    </ThemeProvider>
  );
};

export default Wrapper;
