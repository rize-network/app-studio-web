/**
 * Checkbox Styles
 *
 * Defines the styles for the Checkbox component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Size, Variant } from './Checkbox.type';

/**
 * Size configurations for the Checkbox component
 * Following the 4px grid system
 */
export const Sizes: Record<Size, ViewProps> = {
  xs: { height: '12px', width: '12px' }, // 3 × 4px grid
  sm: { height: '16px', width: '16px' }, // 4 × 4px grid
  md: { height: '20px', width: '20px' }, // 5 × 4px grid
  lg: { height: '24px', width: '24px' }, // 6 × 4px grid
  xl: { height: '28px', width: '28px' }, // 7 × 4px grid
};

/**
 * Icon sizes for the Checkbox component
 * Proportional to the component size
 */
export const IconSizes: Record<Size, number> = {
  xs: 10, // 2.5 × 4px grid
  sm: 14, // 3.5 × 4px grid
  md: 16, // 4 × 4px grid
  lg: 20, // 5 × 4px grid
  xl: 24, // 6 × 4px grid
};

/**
 * Variant styles for the Checkbox component
 */
export const VariantStyles: Record<Variant, ViewProps> = {
  selected: {
    backgroundColor: 'theme-primary',
    borderColor: 'theme-primary',
    borderWidth: '2px',
    borderStyle: 'solid',
    color: 'color-white',
    transition:
      'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  },
  unselected: {
    backgroundColor: 'color-white',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'color-gray-300',
    color: 'color-black',
    transition:
      'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  },
  indeterminate: {
    backgroundColor: 'theme-primary',
    borderColor: 'theme-primary',
    borderWidth: '2px',
    borderStyle: 'solid',
    color: 'color-white',
    transition:
      'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  },
};

/**
 * State styles for the Checkbox component
 */
export const StateStyles = {
  hover: {
    selected: {
      opacity: 0.9,
    },
    unselected: {
      borderColor: 'color-gray-400',
      backgroundColor: 'color-gray-50',
    },
    indeterminate: {
      opacity: 0.9,
    },
  },
  focus: {
    selected: {
      outline: 'none',
      boxShadow:
        '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(66, 153, 225, 0.3)',
    },
    unselected: {
      outline: 'none',
      boxShadow:
        '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(66, 153, 225, 0.3)',
    },
    indeterminate: {
      outline: 'none',
      boxShadow:
        '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(66, 153, 225, 0.3)',
    },
  },
  disabled: {
    selected: {
      backgroundColor: 'color-gray-300',
      borderColor: 'color-gray-300',
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    unselected: {
      borderColor: 'color-gray-300',
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    indeterminate: {
      backgroundColor: 'color-gray-300',
      borderColor: 'color-gray-300',
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  error: {
    selected: {
      backgroundColor: 'color-red-500',
      borderColor: 'color-red-500',
    },
    unselected: {
      borderColor: 'color-red-500',
    },
    indeterminate: {
      backgroundColor: 'color-red-500',
      borderColor: 'color-red-500',
    },
  },
};
