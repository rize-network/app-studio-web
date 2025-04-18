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
  const isDarkMode = themeMode === 'dark';

  return {
    default: {
      container: {
        backgroundColor: isDarkMode ? 'color.gray.800' : 'color.gray.50',
        borderColor: isDarkMode ? 'color.gray.700' : 'color.gray.200',
        boxShadow: isDarkMode
          ? '0 1px 2px rgba(0, 0, 0, 0.2)'
          : '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      content: {
        color: isDarkMode ? 'color.gray.300' : 'color.gray.700',
      },
      icon: {
        color: isDarkMode ? 'color.gray.400' : 'color.gray.500',
      },
    },
    info: {
      container: {
        backgroundColor: isDarkMode ? 'color.blue.900' : 'color.blue.50',
        borderColor: isDarkMode ? 'color.blue.800' : 'color.blue.200',
        boxShadow: isDarkMode
          ? '0 1px 2px rgba(59, 130, 246, 0.2)'
          : '0 1px 2px rgba(59, 130, 246, 0.05)',
      },
      content: {
        color: isDarkMode ? 'color.blue.300' : 'color.blue.700',
      },
      icon: {
        color: isDarkMode ? 'color.blue.400' : 'color.blue.500',
      },
    },
    success: {
      container: {
        backgroundColor: isDarkMode ? 'color.green.900' : 'color.green.50',
        borderColor: isDarkMode ? 'color.green.800' : 'color.green.200',
        boxShadow: isDarkMode
          ? '0 1px 2px rgba(34, 197, 94, 0.2)'
          : '0 1px 2px rgba(34, 197, 94, 0.05)',
      },
      content: {
        color: isDarkMode ? 'color.green.300' : 'color.green.700',
      },
      icon: {
        color: isDarkMode ? 'color.green.400' : 'color.green.500',
      },
    },
    error: {
      container: {
        backgroundColor: isDarkMode ? 'color.red.900' : 'color.red.50',
        borderColor: isDarkMode ? 'color.red.800' : 'color.red.200',
        boxShadow: isDarkMode
          ? '0 1px 2px rgba(239, 68, 68, 0.2)'
          : '0 1px 2px rgba(239, 68, 68, 0.05)',
      },
      content: {
        color: isDarkMode ? 'color.red.300' : 'color.red.700',
      },
      icon: {
        color: isDarkMode ? 'color.red.400' : 'color.red.500',
      },
    },
    warning: {
      container: {
        backgroundColor: isDarkMode ? 'color.orange.900' : 'color.orange.50',
        borderColor: isDarkMode ? 'color.orange.800' : 'color.orange.200',
        boxShadow: isDarkMode
          ? '0 1px 2px rgba(249, 115, 22, 0.2)'
          : '0 1px 2px rgba(249, 115, 22, 0.05)',
      },
      content: {
        color: isDarkMode ? 'color.orange.300' : 'color.orange.700',
      },
      icon: {
        color: isDarkMode ? 'color.orange.400' : 'color.orange.500',
      },
    },
  };
};

/**
 * Default themes for backward compatibility
 */
export const Themes = getThemes('light');
