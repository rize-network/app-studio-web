/**
 * Get theme-based styles for the CookieConsent component
 */
export const getThemes = (themeMode: 'light' | 'dark') => {
  const isDark = themeMode === 'dark';

  return {
    default: {
      container: {
        backgroundColor: isDark ? 'color-gray-800' : 'color-white',
        borderColor: isDark ? 'color-gray-700' : 'color-gray-200',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      content: {
        color: isDark ? 'color-gray-200' : 'color-gray-800',
      },
      acceptButton: {
        backgroundColor: 'color-blue-500',
        color: 'color-white',
        hoverBackgroundColor: 'color-blue-600',
      },
      customizeButton: {
        backgroundColor: 'transparent',
        color: isDark ? 'color-gray-200' : 'color-gray-600',
        borderColor: isDark ? 'color-gray-600' : 'color-gray-300',
        hoverBackgroundColor: isDark ? 'color-gray-700' : 'color-gray-100',
      },
    },
    info: {
      container: {
        backgroundColor: isDark ? 'color-blue-900' : 'color-blue-50',
        borderColor: isDark ? 'color-blue-800' : 'color-blue-200',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      content: {
        color: isDark ? 'color-blue-200' : 'color-blue-800',
      },
      acceptButton: {
        backgroundColor: 'color-blue-500',
        color: 'color-white',
        hoverBackgroundColor: 'color-blue-600',
      },
      customizeButton: {
        backgroundColor: 'transparent',
        color: isDark ? 'color-blue-200' : 'color-blue-800',
        borderColor: isDark ? 'color-blue-500' : 'color-blue-300',
        hoverBackgroundColor: isDark ? 'color-blue-800' : 'color-blue-100',
      },
    },
    primary: {
      container: {
        backgroundColor: isDark ? 'color-lightBlue-900' : 'color-lightBlue-50',
        borderColor: isDark ? 'color-lightBlue-700' : 'color-lightBlue-200',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      content: {
        color: isDark ? 'color-lightBlue-200' : 'color-lightBlue-700',
      },
      acceptButton: {
        backgroundColor: 'color-lightBlue-500',
        color: 'color-white',
        hoverBackgroundColor: 'color-lightBlue-600',
      },
      customizeButton: {
        backgroundColor: 'transparent',
        color: isDark ? 'color-lightBlue-200' : 'color-lightBlue-700',
        borderColor: isDark ? 'color-lightBlue-500' : 'color-lightBlue-300',
        hoverBackgroundColor: isDark ? 'color-lightBlue-700' : 'color-lightBlue-100',
      },
    },
  };
};
