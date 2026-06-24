import React from 'react';
import { HomeHero } from './HomeHero';
import { CookieConsent } from 'src/components/CookieConsent/CookieConsent';

export const HomePage = () => {
  return (
    <>
      <HomeHero />

      {/* Cookie Consent Banner. A concise description keeps it from becoming the
          page's largest text node (and thus the LCP element) — the hero title
          stays the LCP. */}
      <CookieConsent
        variant="info"
        position="bottom"
        description="Nous utilisons des cookies pour améliorer votre expérience."
        onCustomize={() => alert('Préférences de personnalisation cliquées')}
      />
    </>
  );
};

export default HomePage;
