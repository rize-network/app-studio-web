import React from 'react';

import { CookieConsentProps } from './CookieConsent/CookieConsent.props';
import { CookieConsentView } from './CookieConsent/CookieConsent.view';

/**
 * CookieConsent Component
 *
 * A component for displaying a cookie consent banner with customizable styling and content.
 *
 * Features:
 * - Customizable title and description
 * - Configurable button text
 * - Multiple visual variants
 * - Position control (top or bottom)
 * - Theme mode support (light or dark)
 * - Custom styling via views prop
 *
 * @example
 * // Basic usage
 * <CookieConsent />
 *
 * @example
 * // With custom text
 * <CookieConsent
 *   title="Avis de confidentialité"
 *   description="Nous utilisons des cookies pour améliorer votre expérience."
 *   acceptButtonText="J'accepte"
 * />
 *
 * @example
 * // With custom styling and callbacks
 * <CookieConsent
 *   variant="primary"
 *   position="top"
 *   onAccept={() => console.log('Cookies accepted')}
 *   onCustomize={() => openPreferencesModal()}
 *   views={{
 *     container: { backgroundColor: 'color.blue.50' },
 *     title: { color: 'color.blue.800' }
 *   }}
 * />
 */
const CookieConsentComponent: React.FC<CookieConsentProps> = (props) => {
  return <CookieConsentView {...props} />;
};

export const CookieConsent = CookieConsentComponent;
