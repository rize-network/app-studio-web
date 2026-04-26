import React, { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import {
  APP_FONT_FAMILY,
  getGoogleFontHref,
  GoogleFonts,
} from 'src/assets/fonts';

interface GoogleFontProviderProps {
  children: ReactNode;
  fonts?: string[];
}

export const GoogleFontProvider: FC<GoogleFontProviderProps> = ({
  children,
  fonts = GoogleFonts,
}) => (
  <>
    <Helmet>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {fonts.map((font) => (
        <link key={font} rel="stylesheet" href={getGoogleFontHref(font)} />
      ))}
      <style>{`
        html,
        body,
        #root {
          font-family: ${APP_FONT_FAMILY};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        input,
        button,
        textarea,
        select {
          font: inherit;
          -webkit-font-smoothing: inherit;
        }
      `}</style>
    </Helmet>
    {children}
  </>
);
