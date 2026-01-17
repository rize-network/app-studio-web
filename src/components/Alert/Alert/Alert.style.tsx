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
  return {
    default: {
      container: {
        backgroundColor: 'color-gray-50',
        borderColor: 'color-gray-200',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      content: {
        color: 'color-gray-700',
      },
      icon: {
        color: 'color-gray-500',
      },
    },
    info: {
      container: {
        backgroundColor: 'color-blue-50',
        borderColor: 'color-blue-200',
        boxShadow: '0 1px 2px rgba(59, 130, 246, 0.05)',
      },
      content: {
        color: 'color-blue-700',
      },
      icon: {
        color: 'color-blue-500',
      },
    },
    success: {
      container: {
        backgroundColor: 'color-green-50',
        borderColor: 'color-green-200',
        boxShadow: '0 1px 2px rgba(34, 197, 94, 0.05)',
      },
      content: {
        color: 'color-green-700',
      },
      icon: {
        color: 'color-green-500',
      },
    },
    error: {
      container: {
        backgroundColor: 'color-red-50',
        borderColor: 'color-red-200',
        boxShadow: '0 1px 2px rgba(239, 68, 68, 0.05)',
      },
      content: {
        color: 'color-red-700',
      },
      icon: {
        color: 'color-red-500',
      },
    },
    warning: {
      container: {
        backgroundColor: 'color-orange-50',
        borderColor: 'color-orange-200',
        boxShadow: '0 1px 2px rgba(249, 115, 22, 0.05)',
      },
      content: {
        color: 'color-orange-700',
      },
      icon: {
        color: 'color-orange-500',
      },
    },
  };
};

/**
 * Default themes for backward compatibility
 */
export const Themes = getThemes('light');
