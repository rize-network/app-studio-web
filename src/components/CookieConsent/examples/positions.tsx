import React from 'react';
import { Button } from '../../Button/Button';
import { Text, View, Vertical } from 'app-studio';
import { CookieConsent } from '../CookieConsent';

/**
 * CookieConsent positions example
 */
export const CookieConsentPositions = () => {
  // State to control which position to show
  const [activePosition, setActivePosition] = React.useState<string | null>(
    null
  );

  // Reset cookie consent to show the banner
  const handleShowPosition = (position: string) => {
    // Clear localStorage to simulate a new visit
    localStorage.removeItem('app-studio-cookie-consent');
    localStorage.removeItem('app-studio-cookie-consent-expires');
    setActivePosition(position);
  };

  return (
    <View width="100%" maxWidth={600}>
      <Text marginBottom={16}>
        Click a button to show cookie consent in different positions
      </Text>

      <Vertical gap={8} marginBottom={16}>
        <Button onClick={() => handleShowPosition('bottom')}>
          Bottom Position (Default)
        </Button>

        <Button onClick={() => handleShowPosition('top')}>Top Position</Button>
      </Vertical>

      {activePosition === 'bottom' && (
        <CookieConsent
          position="bottom"
          onAccept={() => setActivePosition(null)}
          onCustomize={() => alert('Customize preferences clicked')}
        />
      )}

      {activePosition === 'top' && (
        <CookieConsent
          position="top"
          onAccept={() => setActivePosition(null)}
          onCustomize={() => alert('Customize preferences clicked')}
        />
      )}
    </View>
  );
};
