import { ViewProps } from 'app-studio';
import {
  CookieConsentPosition,
  CookieConsentStyles,
  CookieConsentVariant,
} from './CookieConsent.type';

/**
 * Props for the CookieConsent component
 */
export interface CookieConsentProps extends Omit<ViewProps, 'position'> {
  /**
   * Title of the cookie consent banner
   */
  title?: string;

  /**
   * Description text explaining cookie usage
   */
  description?: string | React.ReactNode;

  /**
   * Text for the accept button
   */
  acceptButtonText?: string;

  /**
   * Text for the customize button
   */
  customizeButtonText?: string;

  /**
   * Position of the banner on the screen
   */
  position?: CookieConsentPosition;

  /**
   * Visual variant of the banner
   */
  variant?: CookieConsentVariant;

  /**
   * Function called when user accepts cookies
   */
  onAccept?: () => void;

  /**
   * Function called when user wants to customize cookie preferences
   */
  onCustomize?: () => void;

  /**
   * Custom styles for the component
   */
  views?: CookieConsentStyles;

  /**
   * Whether to show the customize button
   */
  showCustomizeButton?: boolean;

  /**
   * Cookie expiration in days
   */
  cookieExpiration?: number;

  /**
   * Optional theme mode override ('light' or 'dark')
   * If not provided, the component will use the theme mode from context
   */
  themeMode?: 'light' | 'dark';
}
