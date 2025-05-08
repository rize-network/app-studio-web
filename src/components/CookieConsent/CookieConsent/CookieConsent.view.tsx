import React from 'react';
import { View, Horizontal, Vertical, Text, useTheme } from 'app-studio';
import { Button } from '../../Button/Button';
import { CookieConsentProps } from './CookieConsent.props';
import { useCookieConsentState } from './CookieConsent.state';
import { getThemes } from './CookieConsent.style';

/**
 * CookieConsent View Component
 *
 * Renders a cookie consent banner with customizable styling, position, and content.
 */
export const CookieConsentView: React.FC<CookieConsentProps> = ({
  title = 'Nous utilisons des cookies',
  description = 'Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer sur ce site, vous acceptez notre utilisation des cookies conformément à notre politique de confidentialité.',
  acceptButtonText = 'Accepter',
  customizeButtonText = 'Personnaliser',
  position = 'bottom',
  variant = 'default',
  onAccept,
  onCustomize,
  views,
  showCustomizeButton = true,
  cookieExpiration = 365,
  themeMode: propThemeMode,
  ...props
}) => {
  // Get theme context
  const { themeMode: contextThemeMode } = useTheme();

  // Use provided theme mode or fall back to context
  const themeMode = propThemeMode || contextThemeMode || 'light';

  // Get state and functions from custom hook
  const { hasConsent, acceptCookies } = useCookieConsentState(cookieExpiration);

  // Get theme-based styles
  const themes = getThemes(themeMode);
  const themeStyles = themes[variant];

  // If user has already given consent, don't show the banner
  if (hasConsent) {
    return null;
  }

  // Handle accept button click
  const handleAccept = () => {
    acceptCookies();
    if (onAccept) {
      onAccept();
    }
  };

  // Handle customize button click
  const handleCustomize = () => {
    if (onCustomize) {
      onCustomize();
    }
  };

  return (
    <View
      position="fixed"
      left={16}
      right={16}
      zIndex={1000}
      padding={16}
      borderWidth="1px"
      borderStyle="solid"
      borderRadius={8}
      maxWidth="800px"
      marginX="auto"
      // boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      {...(position === 'bottom' ? { bottom: 16 } : { top: 16 })}
      {...themeStyles.container}
      {...views?.container}
      {...props}
    >
      <Vertical gap={12} maxWidth={1200} marginX="auto">
        {title && (
          <Text
            fontWeight="bold"
            fontSize={18}
            color="color.black"
            {...views?.title}
          >
            {title}
          </Text>
        )}

        {description && (
          <Text fontSize={14} color="color.black" {...views?.description}>
            {typeof description === 'string' ? description : description}
          </Text>
        )}

        <Horizontal
          gap={12}
          justifyContent="flex-end"
          marginTop={8}
          {...views?.buttonGroup}
        >
          {showCustomizeButton && (
            <Button
              variant="outline"
              onClick={handleCustomize}
              size="sm"
              {...views?.customizeButton}
            >
              {customizeButtonText}
            </Button>
          )}

          <Button
            variant="primary"
            onClick={handleAccept}
            size="sm"
            {...views?.acceptButton}
          >
            {acceptButtonText}
          </Button>
        </Horizontal>
      </Vertical>
    </View>
  );
};
