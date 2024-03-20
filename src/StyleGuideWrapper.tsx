import React from 'react';
import { ThemeProvider } from 'app-studio';

import { RouterProvider } from './providers/Router';
import GlobalStyle from './GlobalStyle';

interface Props {
  children?: React.ReactNode;
}

const StyleGuideWrapper = function ({ children }: Props) {
  return (
    <RouterProvider>
      <ThemeProvider>
        <>
          <GlobalStyle />
          {children}
        </>
      </ThemeProvider>
    </RouterProvider>
  );
};

export default StyleGuideWrapper;
