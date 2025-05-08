import React from 'react';
import { Button } from '../../Button/Button';
import { Text, View } from 'app-studio';
import { CookieConsent } from '../CookieConsent';

/**
 * Custom styled CookieConsent example
 */
export const CustomCookieConsent = () => {
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
        Click the button to show a custom styled cookie consent banner
      </Text>
      
      <Button onClick={handleShowConsent}>
        Show Custom Cookie Consent
      </Button>
      
      {showConsent && (
        <CookieConsent
          title="Privacy Settings"
          description="We use cookies to provide you with the best possible experience. By continuing to use our site, you agree to our use of cookies."
          acceptButtonText="I Understand"
          customizeButtonText="Preferences"
          onAccept={() => setShowConsent(false)}
          onCustomize={() => alert('Customize preferences clicked')}
          views={{
            container: {
              backgroundColor: 'color.purple.50',
              borderColor: 'color.purple.200',
              borderRadius: '8px',
              margin: '16px',
              position: 'static', // Override fixed position for demo
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
            title: {
              color: 'color.purple.800',
              fontSize: 20,
            },
            description: {
              color: 'color.purple.700',
            },
            acceptButton: {
              backgroundColor: 'color.purple.600',
              _hover: {
                backgroundColor: 'color.purple.700',
              },
            },
            customizeButton: {
              borderColor: 'color.purple.300',
              color: 'color.purple.700',
            },
          }}
        />
      )}
    </View>
  );
};
