import { useState, useEffect } from 'react';

/**
 * Custom hook to manage cookie consent state
 * @param cookieExpiration Number of days until the cookie expires
 * @returns State and functions for managing cookie consent
 */
export const useCookieConsentState = (cookieExpiration: number = 365) => {
  // State for hover effects
  const [isHovered, setIsHovered] = useState(false);

  // State for tracking if consent has been given
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  // Cookie name for storing consent
  const COOKIE_CONSENT_KEY = 'app-studio-cookie-consent';

  // Check for existing consent when component mounts
  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (storedConsent !== null) {
      setHasConsent(storedConsent === 'true');
    } else {
      setHasConsent(false);
    }
  }, []);

  /**
   * Save consent to localStorage with expiration
   */
  const saveConsent = (consent: boolean) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, String(consent));

    // Set expiration date
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + cookieExpiration);
    localStorage.setItem(
      `${COOKIE_CONSENT_KEY}-expires`,
      expirationDate.toISOString()
    );

    setHasConsent(consent);
  };

  /**
   * Accept cookies
   */
  const acceptCookies = () => {
    saveConsent(true);
  };

  /**
   * Reset cookie consent (for testing)
   */
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
