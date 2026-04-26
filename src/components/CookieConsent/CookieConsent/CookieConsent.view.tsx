import React from 'react';
import { View, Horizontal, Vertical, Text, useTheme } from 'app-studio';
import { Button } from '../../Button/Button';
import { CookieConsentProps } from './CookieConsent.props';
import { useCookieConsentState } from './CookieConsent.state';
import { getThemes } from './CookieConsent.style';
// Defines the main functional component for displaying the cookie consent banner, accepting various props to customize its appearance and behavior.
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
  // Extracts the current theme mode from the application's theme context using the `useTheme` hook.
  const { themeMode: contextThemeMode } = useTheme();
  // Determines the active theme mode, prioritizing a theme mode passed via props, then the context theme mode, and defaulting to 'light' if neither is provided.
  const themeMode = propThemeMode || contextThemeMode || 'light';
  // Initializes the cookie consent state using the `useCookieConsentState` hook, providing `hasConsent` to check current consent status and `acceptCookies` to set consent. The `cookieExpiration` prop determines the cookie's lifespan.
  const { hasConsent, acceptCookies } = useCookieConsentState(cookieExpiration);
  // Retrieves the appropriate theme styles based on the determined `themeMode` from the `getThemes` utility function.
  const themes = getThemes(themeMode);
  // Selects the specific style variations from the loaded themes based on the `variant` prop for the current component.
  const themeStyles = themes[variant];
  if (hasConsent) {
    return null;
  }
  // Defines the handler function executed when the 'Accept' button is clicked. It calls `acceptCookies` to record consent and then triggers the optional `onAccept` callback.
  const handleAccept = () => {
    acceptCookies();
    if (onAccept) {
      onAccept();
    }
  };
  // Defines the handler function executed when the 'Customize' button is clicked, triggering the `onCustomize` callback if it has been provided as a prop.
  const handleCustomize = () => {
    if (onCustomize) {
      onCustomize();
    }
  };
  return (
    <View
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        zIndex: 1000,
        ...(position === 'bottom' ? { bottom: 16 } : { top: 16 }),
      }}
      padding={16}
      borderWidth="1px"
      borderStyle="solid"
      borderRadius={8}
      maxWidth="800px"
      marginLeft="auto"
      marginRight="auto"
      transition="opacity 0.3s ease, transform 0.3s ease"
      {...themeStyles.container}
      {...views?.container}
      {...props}
    >
      <Vertical gap={12} maxWidth={1200} marginLeft="auto" marginRight="auto">
        {title && (
          <Text
            fontWeight="bold"
            fontSize={18}
            color="color-black"
            {...views?.title}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text fontSize={14} color="color-black" {...views?.description}>
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
