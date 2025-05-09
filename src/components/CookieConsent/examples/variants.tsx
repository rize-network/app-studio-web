import React from 'react';
import { Button } from '../../Button/Button';
import { Text, View, Vertical } from 'app-studio';
import { CookieConsent } from '../CookieConsent';

/**
 * CookieConsent variants example
 */
export const CookieConsentVariants = () => {
  // State to control which variant to show
  const [activeVariant, setActiveVariant] = React.useState<string | null>(null);

  // Reset cookie consent to show the banner
  const handleShowVariant = (variant: string) => {
    // Clear localStorage to simulate a new visit
    localStorage.removeItem('app-studio-cookie-consent');
    localStorage.removeItem('app-studio-cookie-consent-expires');
    setActiveVariant(variant);
  };

  return (
    <View width="100%" maxWidth={600}>
      <Text marginBottom={16}>
        Click a button to show different cookie consent variants
      </Text>

      <Vertical gap={8} marginBottom={16}>
        <Button onClick={() => handleShowVariant('default')}>
          Default Variant
        </Button>

        <Button onClick={() => handleShowVariant('info')}>Info Variant</Button>

        <Button onClick={() => handleShowVariant('primary')}>
          Primary Variant
        </Button>
      </Vertical>

      {activeVariant === 'default' && (
        <CookieConsent
          variant="default"
          onAccept={() => setActiveVariant(null)}
          onCustomize={() => alert('Customize preferences clicked')}
        />
      )}

      {activeVariant === 'info' && (
        <CookieConsent
          variant="info"
          onAccept={() => setActiveVariant(null)}
          onCustomize={() => alert('Customize preferences clicked')}
        />
      )}

      {activeVariant === 'primary' && (
        <CookieConsent
          variant="primary"
          onAccept={() => setActiveVariant(null)}
          onCustomize={() => alert('Customize preferences clicked')}
        />
      )}
    </View>
  );
};
