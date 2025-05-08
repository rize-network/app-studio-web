
/**
 * Get theme-based styles for the CookieConsent component
 */
export const getThemes = (themeMode: 'light' | 'dark') => {
  const isDark = themeMode === 'dark';

  return {
    default: {
      container: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      content: {
        color: isDark ? '#e5e7eb' : '#1f2937',
      },
      acceptButton: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        hoverBackgroundColor: '#2563eb',
      },
      customizeButton: {
        backgroundColor: 'transparent',
        color: isDark ? '#e5e7eb' : '#4b5563',
        borderColor: isDark ? '#4b5563' : '#d1d5db',
        hoverBackgroundColor: isDark ? '#374151' : '#f3f4f6',
      },
    },
    info: {
      container: {
        backgroundColor: isDark ? '#1e3a8a' : '#eff6ff',
        borderColor: isDark ? '#1e40af' : '#bfdbfe',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      content: {
        color: isDark ? '#bfdbfe' : '#1e40af',
      },
      acceptButton: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        hoverBackgroundColor: '#2563eb',
      },
      customizeButton: {
        backgroundColor: 'transparent',
        color: isDark ? '#bfdbfe' : '#1e40af',
        borderColor: isDark ? '#3b82f6' : '#93c5fd',
        hoverBackgroundColor: isDark ? '#1e40af' : '#dbeafe',
      },
    },
    primary: {
      container: {
        backgroundColor: isDark ? '#0c4a6e' : '#f0f9ff',
        borderColor: isDark ? '#0369a1' : '#bae6fd',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      content: {
        color: isDark ? '#bae6fd' : '#0369a1',
      },
      acceptButton: {
        backgroundColor: '#0ea5e9',
        color: '#ffffff',
        hoverBackgroundColor: '#0284c7',
      },
      customizeButton: {
        backgroundColor: 'transparent',
        color: isDark ? '#bae6fd' : '#0369a1',
        borderColor: isDark ? '#0ea5e9' : '#7dd3fc',
        hoverBackgroundColor: isDark ? '#0369a1' : '#e0f2fe',
      },
    },
  };
};
