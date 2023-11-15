import React, { ReactNode } from 'react';
import { ResponsiveProvider, ThemeProvider } from 'app-studio';
import { RouterProvider } from 'src/providers/Router';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';


interface WrapperProps {
  children: ReactNode;
}

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName:string, target:any) {
  if (typeof target === "string") {
      // For HTML elements, forward the prop if it is a valid HTML attribute
      return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <RouterProvider>
          <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <ThemeProvider>
        <ResponsiveProvider>{children}</ResponsiveProvider>
      </ThemeProvider>
      </StyleSheetManager>
    </RouterProvider>
  );
};

export default Wrapper;
