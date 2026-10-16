import React from 'react';
import { CookieConsentProps } from './CookieConsent/CookieConsent.props';
import { CookieConsentView } from './CookieConsent/CookieConsent.view';
// This file exports the main `CookieConsent` component, which serves as a simple container that renders the `CookieConsentView` component, passing along all received properties to handle the UI and logic for cookie consent management.
const CookieConsentComponent: React.FC<CookieConsentProps> = (props) => {
  return <CookieConsentView {...props} />;
};
export const CookieConsent = CookieConsentComponent;
