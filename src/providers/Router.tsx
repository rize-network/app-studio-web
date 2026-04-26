import { View } from 'app-studio';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { APP_FONT_FAMILY } from 'src/assets/fonts';

interface RouterProps {
  children: React.ReactNode;
}

export const RouterProvider: FC<RouterProps> = ({ children }) => (
  <BrowserRouter>
    <View
      backgroundColor="#FAFAFA"
      color="color-black"
      minHeight="100vh"
      fontFamily={APP_FONT_FAMILY}
      style={{
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      {children}
    </View>
  </BrowserRouter>
);
