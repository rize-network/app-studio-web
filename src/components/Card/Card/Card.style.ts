/**
 * Card Styles
 *
 * Defines the styles for the Card component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { CardStyles, Shape, Size, Variant } from './Card.type';

/**
 * Card sizes following the 4px grid system
 */
export const CardSizes: Record<Size, ViewProps> = {
  sm: {
    padding: '12px', // 3 × 4px grid
  },
  md: {
    padding: '16px', // 4 × 4px grid
  },
  lg: {
    padding: '24px', // 6 × 4px grid
  },
};

/**
 * Card shapes with consistent border radius
 */
export const CardShapes: Record<Shape, number | string> = {
  sharp: 0,
  rounded: '8px', // Consistent with design system (rounded-md)
  pillShaped: '16px', // Larger radius for pill-shaped cards
};

/**
 * Get card variants with consistent styling based on theme mode
 */
export const getCardVariants = (
  themeMode: string
): Record<Variant, ViewProps> => {
  const isDarkMode = themeMode === 'dark';

  return {
    default: {
      backgroundColor: isDarkMode ? 'color.gray.800' : 'white',
      border: 'none',
      transition: 'all 0.2s ease',
    },
    outlined: {
      backgroundColor: isDarkMode ? 'color.gray.800' : 'white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: isDarkMode ? 'color.gray.700' : 'color.gray.200',
      transition: 'all 0.2s ease',
      _hover: {
        borderColor: isDarkMode ? 'color.gray.600' : 'color.gray.300',
      },
    },
    elevated: {
      backgroundColor: isDarkMode ? 'color.gray.800' : 'white',
      boxShadow: isDarkMode
        ? '0px 2px 8px rgba(0, 0, 0, 0.2)'
        : '0px 2px 8px rgba(0, 0, 0, 0.08)',
      border: 'none',
      transition: 'all 0.2s ease',
      _hover: {
        boxShadow: isDarkMode
          ? '0px 4px 12px rgba(0, 0, 0, 0.25)'
          : '0px 4px 12px rgba(0, 0, 0, 0.12)',
        transform: 'translateY(-2px)',
      },
    },
  };
};

/**
 * Default card variants (for backward compatibility)
 */
export const CardVariants = getCardVariants('light');

/**
 * Function to get default styles for Card components
 * @param theme - Theme object from useTheme hook
 */
export const getDefaultCardStyles = (theme: any): CardStyles => {
  const { themeMode } = theme;
  const isDarkMode = themeMode === 'dark';

  return {
    container: {
      backgroundColor: isDarkMode ? 'color.gray.800' : 'white',
      color: isDarkMode ? 'color.gray.100' : 'color.gray.900',
      borderRadius: '8px', // Consistent with design system
      overflow: 'hidden',
      transition: 'all 0.2s ease',
    },
    header: {
      padding: '16px', // 4 × 4px grid
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: isDarkMode ? 'color.gray.700' : 'color.gray.200',
    },
    content: {
      padding: '16px', // 4 × 4px grid
      color: isDarkMode ? 'color.gray.100' : 'color.gray.900',
    },
    footer: {
      padding: '16px', // 4 × 4px grid
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: isDarkMode ? 'color.gray.700' : 'color.gray.200',
    },
  };
};
