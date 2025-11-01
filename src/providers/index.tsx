import React, { ReactNode } from 'react';
import { ResponsiveProvider, ThemeProvider } from 'app-studio';
import { RouterProvider } from 'src/providers/Router';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <ThemeProvider mode="light">
      <ResponsiveProvider
        breakpoints={{
          xs: 0,
          sm: 340,
          md: 560,
          lg: 1080,
          xl: 1300,
        }}
        devices={{
          mobile: ['xs', 'sm'],
          tablet: ['md', 'lg'],
          desktop: ['lg', 'xl'],
        }}
      >
        <RouterProvider>{children}</RouterProvider>
      </ResponsiveProvider>
    </ThemeProvider>
  );
};

export default Wrapper;
