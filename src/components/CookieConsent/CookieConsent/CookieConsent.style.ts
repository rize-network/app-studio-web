// Defines a utility function `getThemes` that provides a collection of theme-specific styles for the Cookie Consent component, adapting colors based on the `themeMode` parameter.
export const getThemes = (themeMode: 'light' | 'dark') => {
  // Determines if the current theme mode is 'dark', used to conditionally apply appropriate dark mode styles throughout the theme objects.
  const isDark = themeMode === 'dark';
  // Returns an object containing comprehensive style configurations for different theme types (e.g., default, info, primary), with styles for various component parts.
  return {
    // Defines the set of styles for the default theme of the Cookie Consent component.
    default: {
      // Specifies the structural styles for the main container of the default Cookie Consent banner, including background, border, and shadow.
      container: {
        backgroundColor: isDark ? 'color-gray-800' : 'color-white',
        borderColor: isDark ? 'color-gray-700' : 'color-gray-200',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      // Defines the text styling for the content area within the default Cookie Consent banner.
      content: {
        color: isDark ? 'color-gray-200' : 'color-gray-800',
      },
      // Configures the visual styles for the 'Accept' button in the default theme, including its background, text color, and hover state.
      acceptButton: {
        backgroundColor: 'color-blue-500',
        color: 'color-white',
        hoverBackgroundColor: 'color-blue-600',
      },
      // Sets the visual styles for the 'Customize' button in the default theme, encompassing background, text color, border, and hover effects.
      customizeButton: {
        backgroundColor: 'transparent',
        color: isDark ? 'color-gray-200' : 'color-gray-600',
        borderColor: isDark ? 'color-gray-600' : 'color-gray-300',
        hoverBackgroundColor: isDark ? 'color-gray-700' : 'color-gray-100',
      },
    },
    // Defines the set of styles for the 'info' theme of the Cookie Consent component, typically characterized by a blue color scheme.
    info: {
      // Specifies the structural styles for the main container of the 'info' Cookie Consent banner, including background, border, and shadow.
      container: {
        backgroundColor: isDark ? 'color-blue-900' : 'color-blue-50',
        borderColor: isDark ? 'color-blue-800' : 'color-blue-200',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      // Defines the text styling for the content area within the 'info' Cookie Consent banner.
      content: {
        color: isDark ? 'color-blue-200' : 'color-blue-800',
      },
      // Configures the visual styles for the 'Accept' button in the 'info' theme, including its background, text color, and hover state.
      acceptButton: {
        backgroundColor: 'color-blue-500',
        color: 'color-white',
        hoverBackgroundColor: 'color-blue-600',
      },
      // Sets the visual styles for the 'Customize' button in the 'info' theme, encompassing background, text color, border, and hover effects.
      customizeButton: {
        backgroundColor: 'transparent',
        color: isDark ? 'color-blue-200' : 'color-blue-800',
        borderColor: isDark ? 'color-blue-500' : 'color-blue-300',
        hoverBackgroundColor: isDark ? 'color-blue-800' : 'color-blue-100',
      },
    },
    // Defines the set of styles for the 'primary' theme of the Cookie Consent component, typically used for prominent actions with a light blue scheme.
    primary: {
      // Specifies the structural styles for the main container of the 'primary' Cookie Consent banner, including background, border, and shadow.
      container: {
        backgroundColor: isDark ? 'color-lightBlue-900' : 'color-lightBlue-50',
        borderColor: isDark ? 'color-lightBlue-700' : 'color-lightBlue-200',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      // Defines the text styling for the content area within the 'primary' Cookie Consent banner.
      content: {
        color: isDark ? 'color-lightBlue-200' : 'color-lightBlue-700',
      },
      // Configures the visual styles for the 'Accept' button in the 'primary' theme, including its background, text color, and hover state.
      acceptButton: {
        backgroundColor: 'color-lightBlue-500',
        color: 'color-white',
        hoverBackgroundColor: 'color-lightBlue-600',
      },
      // Sets the visual styles for the 'Customize' button in the 'primary' theme, encompassing background, text color, border, and hover effects.
      customizeButton: {
        backgroundColor: 'transparent',
        color: isDark ? 'color-lightBlue-200' : 'color-lightBlue-700',
        borderColor: isDark ? 'color-lightBlue-500' : 'color-lightBlue-300',
        hoverBackgroundColor: isDark
          ? 'color-lightBlue-700'
          : 'color-lightBlue-100',
      },
    },
  };
};
