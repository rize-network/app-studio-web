import React, { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_FONT_FAMILY } from 'src/assets/fonts';

interface GoogleFontProviderProps {
  children: ReactNode;
  fonts?: string[];
}

/**
 * Applies the app font family. The Mulish font itself is now self-hosted and
 * declared via @font-face in index.html (same-origin, preloaded) rather than
 * fetched from Google Fonts at runtime — this removes the external DNS/TCP/TLS
 * round-trips that were delaying the hero text on throttled mobile.
 */
export const GoogleFontProvider: FC<GoogleFontProviderProps> = ({
  children,
}) => (
  <>
    <Helmet>
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
