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
  square: 0,
  rounded: '8px', // Consistent with design system (rounded-md)
  pill: '24px', // Larger radius for pill-shaped cards
};

/**
 * Get card variants with consistent styling based on theme mode
 */
export const getCardVariants = (
  themeMode: string
): Record<Variant, ViewProps> => {
  const isDark = themeMode === 'dark';

  return {
    default: {
      backgroundColor: isDark ? 'color.gray.900' : 'color.white',
      border: 'none',
      transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
    },
    outlined: {
      backgroundColor: isDark ? 'color.gray.900' : 'color.white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: isDark ? 'color.gray.700' : 'color.gray.200',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      _hover: {
        borderColor: isDark ? 'color.gray.600' : 'color.gray.300',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
      },
    },
    elevated: {
      backgroundColor: isDark ? 'color.gray.900' : 'color.white',
      boxShadow: isDark
        ? '0px 4px 12px rgba(0, 0, 0, 0.3)'
        : '0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.06)',
      border: 'none',
      transition: 'box-shadow 0.2s ease',
      _hover: {
        boxShadow: isDark
          ? '0px 8px 16px rgba(0, 0, 0, 0.4)'
          : '0px 4px 6px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.06)',
      },
    },
  };
};

/**
 * Function to get default styles for Card components
 * @param theme - Theme object from useTheme hook
 */
export const getDefaultCardStyles = (theme: any): CardStyles => {
  const isDark = theme.themeMode === 'dark';

  return {
    container: {
      backgroundColor: isDark ? 'color.gray.900' : 'color.white',
      color: isDark ? 'color.white' : 'color.black',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
    },
    header: {
      padding: '16px',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: isDark ? 'color.gray.800' : 'color.gray.100',
      color: 'theme.primary',
    },
    content: {
      padding: '16px',
      color: isDark ? 'color.gray.300' : 'color.gray.600',
    },
    footer: {
      padding: '16px',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: isDark ? 'color.gray.800' : 'color.gray.100',
    },
  };
};
