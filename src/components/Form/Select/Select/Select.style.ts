/**
 * Select Styles
 *
 * Defines the styles for the Select component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Size } from './Select.type';

/**
 * Size configurations for the Select component
 * Following the 4px grid system
 */
export const Sizes: Record<Size, ViewProps> = {
  xs: { height: '24px', width: '24px' }, // 6 × 4px grid
  sm: { height: '32px', width: '32px' }, // 8 × 4px grid
  md: { height: '40px', width: '40px' }, // 10 × 4px grid
  lg: { height: '48px', width: '48px' }, // 12 × 4px grid
  xl: { height: '56px', width: '56px' }, // 14 × 4px grid
};

/**
 * Icon sizes for the Select component
 * Proportional to the component size
 */
export const IconSizes: Record<Size, number> = {
  xs: 12, // 3 × 4px grid
  sm: 16, // 4 × 4px grid
  md: 20, // 5 × 4px grid
  lg: 24, // 6 × 4px grid
  xl: 28, // 7 × 4px grid
};

/**
 * Dropdown styles for the Select component
 */
export const dropdownStyles: ViewProps = {
  // Layout properties
  width: '100%',
  maxHeight: '240px', // 60 × 4px grid
  overflowY: 'auto',
  zIndex: 1000,

  // Visual properties
  backgroundColor: 'white',
  borderRadius: '8px', // Consistent with design system (rounded-md)
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'color.gray.200',

  // Shadow
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

  // Animation
  transition: 'all 0.2s ease',

  // Dark mode support
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: 'color.gray.800',
    borderColor: 'color.gray.700',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
  },
};
