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
 * Card variants with consistent styling
 */
export const CardVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'white',
    border: 'none',
    transition: 'all 0.2s ease',
  },
  outlined: {
    backgroundColor: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    transition: 'all 0.2s ease',
    _hover: {
      borderColor: 'color.gray.300',
    },
  },
  elevated: {
    backgroundColor: 'white',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    border: 'none',
    transition: 'all 0.2s ease',
    _hover: {
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-2px)',
    },
  },
};

/**
 * Function to get default styles for Card components
 * @param theme - Theme object (not used directly but kept for compatibility)
 */
export const getDefaultCardStyles = (_theme: any): CardStyles => ({
  container: {
    backgroundColor: 'white',
    borderRadius: '8px', // Consistent with design system
    overflow: 'hidden',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    transition: 'all 0.2s ease',
    '@media (prefers-color-scheme: dark)': {
      backgroundColor: 'color.gray.800',
      color: 'color.gray.100',
    },
  },
  header: {
    padding: '16px', // 4 × 4px grid
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'color.gray.200',
    '@media (prefers-color-scheme: dark)': {
      borderBottomColor: 'color.gray.700',
    },
  },
  content: {
    padding: '16px', // 4 × 4px grid
    '@media (prefers-color-scheme: dark)': {
      color: 'color.gray.100',
    },
  },
  footer: {
    padding: '16px', // 4 × 4px grid
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'color.gray.200',
    '@media (prefers-color-scheme: dark)': {
      borderTopColor: 'color.gray.700',
    },
  },
});
