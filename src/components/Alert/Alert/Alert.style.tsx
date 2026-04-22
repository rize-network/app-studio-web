/**
 * Alert Styles
 *
 * Defines the styles for the Alert component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Variant } from './Alert.type';

/**
 * Get theme styles for different alert variants based on theme mode
 */
export const getThemes = (
  themeMode: string
): Record<
  Variant,
  { container: ViewProps; content: ViewProps; icon: ViewProps }
> => {
  const isDark = themeMode === 'dark';

  return {
    default: {
      container: {
        backgroundColor: isDark ? 'color-gray-900' : 'color-gray-50',
        borderColor: isDark ? 'color-gray-700' : 'color-gray-200',
        boxShadow: isDark
          ? '0 1px 3px rgba(0, 0, 0, 0.3)'
          : '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      content: {
        color: isDark ? 'color-gray-200' : 'color-gray-700',
      },
      icon: {
        color: isDark ? 'color-gray-400' : 'color-gray-500',
      },
    },
    info: {
      container: {
        backgroundColor: isDark ? 'color-blue-950' : 'color-blue-50',
        borderColor: isDark ? 'color-blue-800' : 'color-blue-200',
        boxShadow: isDark
          ? '0 1px 3px rgba(29, 78, 216, 0.25)'
          : '0 1px 2px rgba(59, 130, 246, 0.05)',
      },
      content: {
        color: isDark ? 'color-blue-200' : 'color-blue-700',
      },
      icon: {
        color: isDark ? 'color-blue-300' : 'color-blue-500',
      },
    },
    success: {
      container: {
        backgroundColor: isDark ? 'color-green-950' : 'color-green-50',
        borderColor: isDark ? 'color-green-800' : 'color-green-200',
        boxShadow: isDark
          ? '0 1px 3px rgba(34, 197, 94, 0.2)'
          : '0 1px 2px rgba(34, 197, 94, 0.05)',
      },
      content: {
        color: isDark ? 'color-green-200' : 'color-green-700',
      },
      icon: {
        color: isDark ? 'color-green-300' : 'color-green-500',
      },
    },
    error: {
      container: {
        backgroundColor: isDark ? 'color-red-950' : 'color-red-50',
        borderColor: isDark ? 'color-red-800' : 'color-red-200',
        boxShadow: isDark
          ? '0 1px 3px rgba(239, 68, 68, 0.2)'
          : '0 1px 2px rgba(239, 68, 68, 0.05)',
      },
      content: {
        color: isDark ? 'color-red-200' : 'color-red-700',
      },
      icon: {
        color: isDark ? 'color-red-300' : 'color-red-500',
      },
    },
    warning: {
      container: {
        backgroundColor: isDark ? 'color-orange-950' : 'color-orange-50',
        borderColor: isDark ? 'color-orange-800' : 'color-orange-200',
        boxShadow: isDark
          ? '0 1px 3px rgba(249, 115, 22, 0.2)'
          : '0 1px 2px rgba(249, 115, 22, 0.05)',
      },
      content: {
        color: isDark ? 'color-orange-200' : 'color-orange-700',
      },
      icon: {
        color: isDark ? 'color-orange-300' : 'color-orange-500',
      },
    },
  };
};

/**
 * Default themes for backward compatibility
 */
export const Themes = getThemes('light');
