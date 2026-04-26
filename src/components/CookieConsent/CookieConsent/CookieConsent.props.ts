import { ViewProps } from 'app-studio';
import {
  CookieConsentPosition,
  CookieConsentStyles,
  CookieConsentVariant,
} from './CookieConsent.type';
// Defines the properties interface for the CookieConsent component, extending common view properties while omitting the 'position' property to redefine it specifically for cookie consent.
export interface CookieConsentProps extends Omit<ViewProps, 'position'> {
  // Specifies the main title text displayed in the cookie consent banner.
  title?: string;
  // Provides the descriptive content or message shown within the cookie consent banner.
  description?: string | React.ReactNode;
  // Sets the text for the button that accepts all cookies.
  acceptButtonText?: string;
  // Sets the text for the button that allows users to customize cookie preferences.
  customizeButtonText?: string;
  // Determines the display position of the cookie consent banner on the screen.
  position?: CookieConsentPosition;
  // Defines the visual style or layout variant of the cookie consent banner.
  variant?: CookieConsentVariant;
  // Callback function executed when the user accepts all cookies.
  onAccept?: () => void;
  // Callback function executed when the user clicks the customize button.
  onCustomize?: () => void;
  // Allows overriding default styles for specific parts of the cookie consent component.
  views?: CookieConsentStyles;
  // A boolean flag to control the visibility of the customize cookies button.
  showCustomizeButton?: boolean;
  // Sets the duration in days for which the cookie consent decision will be stored.
  cookieExpiration?: number;
  // Specifies the theme mode ('light' or 'dark') to apply to the cookie consent component.
  themeMode?: 'light' | 'dark';
}
