// Defines the possible display positions for the cookie consent banner.
export type CookieConsentPosition = 'bottom' | 'top';
// Defines the possible visual variants or themes for the cookie consent banner.
export type CookieConsentVariant = 'default' | 'info' | 'primary';
// Defines an interface for applying custom styles to various parts of the CookieConsent component.
export type CookieConsentStyles = {
  // Optional style for the main container of the cookie consent banner.
  container?: any;
  // Optional style for the title element within the banner.
  title?: any;
  // Optional style for the description text element within the banner.
  description?: any;
  // Optional style for the group containing the action buttons.
  buttonGroup?: any;
  // Optional style for the 'Accept' button.
  acceptButton?: any;
  // Optional style for the 'Customize' button.
  customizeButton?: any;
};
