import { View } from 'app-studio';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { APP_FONT_FAMILY } from 'src/assets/fonts';

interface RouterProps {
  children: React.ReactNode;
}

// During the build-time prerender (no window) use a StaticRouter at "/", so the
// same tree the client hydrates can be rendered server-side. In the browser use
// BrowserRouter as before.
const isServer = typeof window === 'undefined';

export const RouterProvider: FC<RouterProps> = ({ children }) => {
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
    return <StaticRouter location="/">{inner}</StaticRouter>;
  }

  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      {inner}
    </BrowserRouter>
  );
};
