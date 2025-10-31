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
  return {
    default: {
      backgroundColor: 'color.white',
      border: 'none',
      transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
    },
    outlined: {
      backgroundColor: 'color.white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'color.gray.200',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      _hover: {
        borderColor: 'color.gray.300',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.1)',
      },
    },
    elevated: {
      backgroundColor: 'color.white',
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.06)',
      border: 'none',
      transition: 'box-shadow 0.2s ease',
      _hover: {
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.06)',
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.08)',
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
  return {
    container: {
      backgroundColor: 'color.white',
      color: 'color.black',
      borderRadius: '8px', // Consistent with design system
      overflow: 'hidden',
      transition: 'all 0.2s ease',
    },
    header: {
      padding: '16px', // 4 × 4px grid
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'color.gray.200',
      color: 'color.black',
    },
    content: {
      padding: '16px', // 4 × 4px grid
      color: 'color.black',
    },
    footer: {
      padding: '16px', // 4 × 4px grid
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'color.gray.200',
    },
  };
};
