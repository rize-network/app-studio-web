/**
 * Radio Styles
 *
 * Defines the styles for the Radio component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Size, Variant } from './Radio.type';

/**
 * Size configurations for the Radio component
 * Following the 4px grid system
 */
export const Sizes: Record<Size, ViewProps> = {
  xs: { height: '16px', width: '16px' }, // 4 × 4px grid
  sm: { height: '20px', width: '20px' }, // 5 × 4px grid
  md: { height: '24px', width: '24px' }, // 6 × 4px grid
  lg: { height: '28px', width: '28px' }, // 7 × 4px grid
  xl: { height: '32px', width: '32px' }, // 8 × 4px grids
};

/**
 * Dot sizes for the Radio component
 * Proportional to the component size
 */
export const DotSizes: Record<Size, ViewProps> = {
  xs: { height: '8px', width: '8px' }, // 2 × 4px grid
  sm: { height: '10px', width: '10px' }, // 2.5 × 4px grid
  md: { height: '12px', width: '12px' }, // 3 × 4px grid
  lg: { height: '14px', width: '14px' }, // 3.5 × 4px grid
  xl: { height: '16px', width: '16px' }, // 4 × 4px grid
};

/**
 * Variant styles for the Radio component
 */
export const VariantStyles: Record<Variant, ViewProps> = {
  selected: {
    borderColor: 'theme.primary',
    borderWidth: '2px',
    borderStyle: 'solid',
  },
  unselected: {
    backgroundColor: 'transparent',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'color.gray.300',
  },
};

/**
 * Dot styles for the Radio component
 */
export const DotStyles: Record<Variant, ViewProps> = {
  selected: {
    backgroundColor: 'theme.primary',
  },
  unselected: {
    backgroundColor: 'transparent',
  },
};

/**
 * State styles for the Radio component
 */
export const StateStyles = {
  hover: {
    selected: {
      borderColor: 'color.blue.600',
    },
    unselected: {
      borderColor: 'color.gray.400',
    },
  },
  disabled: {
    selected: {
      borderColor: 'color.gray.300',
      opacity: 0.6,
    },
    unselected: {
      borderColor: 'color.gray.300',
      opacity: 0.6,
    },
  },
  error: {
    selected: {
      borderColor: 'color.red.500',
    },
    unselected: {
      borderColor: 'color.red.500',
    },
  },
};

/**
 * Dot state styles for the Radio component
 */
export const DotStateStyles = {
  hover: {
    selected: {
      backgroundColor: 'color.blue.600',
    },
    unselected: {
      backgroundColor: 'transparent',
    },
  },
  disabled: {
    selected: {
      backgroundColor: 'color.gray.300',
      opacity: 0.6,
    },
    unselected: {
      backgroundColor: 'transparent',
      opacity: 0.6,
    },
  },
  error: {
    selected: {
      backgroundColor: 'color.red.500',
    },
    unselected: {
      backgroundColor: 'transparent',
    },
  },
};
