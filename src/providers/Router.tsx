import { View } from 'app-studio';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { APP_FONT_FAMILY } from 'src/assets/fonts';

interface RouterProps {
  children: React.ReactNode;
  location?: string;
}

// The static router receives the public route being prerendered at build time.
const isServer = typeof window === 'undefined';

export const RouterProvider: FC<RouterProps> = ({
  children,
  location = '/',
}) => {
  const inner = (
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
  );

  if (isServer) {
    return <StaticRouter location={location}>{inner}</StaticRouter>;
  }

  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      {inner}
    </BrowserRouter>
  );
};
