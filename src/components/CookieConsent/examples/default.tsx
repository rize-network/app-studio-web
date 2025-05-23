import React from 'react';
import { Button } from '../../Button/Button';
import { Text, View } from 'app-studio';
import { CookieConsent } from '../CookieConsent';

/**
 * Default CookieConsent example
 */
export const DefaultCookieConsent = () => {
  // State to control visibility for demo purposes
  const [showConsent, setShowConsent] = React.useState(false);

  // Reset cookie consent to show the banner
  const handleShowConsent = () => {
    // Clear localStorage to simulate a new visit
    localStorage.removeItem('app-studio-cookie-consent');
    localStorage.removeItem('app-studio-cookie-consent-expires');
    setShowConsent(true);
  };

  return (
    <View width="100%" maxWidth={600}>
      <Text marginBottom={16}>
        Cliquez sur le bouton ci-dessous pour afficher la bannière de
        consentement des cookies
      </Text>

      <Button onClick={handleShowConsent}>
        Afficher le consentement des cookies
      </Button>

      {showConsent && (
        <CookieConsent
          onAccept={() => setShowConsent(false)}
          onCustomize={() => alert('Préférences de personnalisation cliquées')}
        />
      )}
    </View>
  );
};
