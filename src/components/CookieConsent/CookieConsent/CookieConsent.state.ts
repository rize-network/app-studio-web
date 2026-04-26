import { useState, useEffect } from 'react';
// This file defines the `useCookieConsentState` custom React hook, which centralizes the logic and state management for cookie consent. It handles the persistence of consent status in local storage, manages UI hover states, and provides functions for accepting or resetting user consent.
export const useCookieConsentState = (cookieExpiration: number = 365) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const COOKIE_CONSENT_KEY = 'app-studio-cookie-consent';
  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (storedConsent !== null) {
      setHasConsent(storedConsent === 'true');
    } else {
      setHasConsent(false);
    }
  }, []);
  const saveConsent = (consent: boolean) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, String(consent));
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + cookieExpiration);
    localStorage.setItem(
      `${COOKIE_CONSENT_KEY}-expires`,
      expirationDate.toISOString()
    );
    setHasConsent(consent);
  };
  const acceptCookies = () => {
    saveConsent(true);
  };
  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(`${COOKIE_CONSENT_KEY}-expires`);
    setHasConsent(false);
  };
  return {
    isHovered,
    setIsHovered,
    hasConsent,
    acceptCookies,
    resetConsent,
  };
};
