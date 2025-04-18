/**
 * Switch Styles
 *
 * Defines the styles for the Switch component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Size } from './Switch.type';

/**
 * Knob (circle) sizes for the Switch component
 * Following the 4px grid system
 */
export const KnobSizes: Record<Size, ViewProps> = {
  xs: { height: '12px', width: '12px' }, // 3 × 4px grid
  sm: { height: '16px', width: '16px' }, // 4 × 4px grid
  md: { height: '20px', width: '20px' }, // 5 × 4px grid
  lg: { height: '24px', width: '24px' }, // 6 × 4px grid
  xl: { height: '28px', width: '28px' }, // 7 × 4px grid
};

/**
 * Slider (track) sizes for the Switch component
 * Following the 4px grid system
 */
export const SliderSizes: Record<Size, ViewProps> = {
  xs: {
    height: '24px', // 6 × 4px grid
    width: '40px', // 10 × 4px grid
  },
  sm: {
    height: '28px', // 7 × 4px grid
    width: '48px', // 12 × 4px grid
  },
  md: {
    height: '32px', // 8 × 4px grid
    width: '56px', // 14 × 4px grid
  },
  lg: {
    height: '36px', // 9 × 4px grid
    width: '64px', // 16 × 4px grid
  },
  xl: {
    height: '40px', // 10 × 4px grid
    width: '72px', // 18 × 4px grid
  },
};

/**
 * Padding for the Switch slider
 * Following the 4px grid system
 */
export const SliderPadding: Record<Size, Record<string, number>> = {
  xs: { paddingVertical: 4, paddingHorizontal: 4 }, // 1 × 4px grid
  sm: { paddingVertical: 4, paddingHorizontal: 4 }, // 1 × 4px grid
  md: { paddingVertical: 4, paddingHorizontal: 4 }, // 1 × 4px grid
  lg: { paddingVertical: 4, paddingHorizontal: 4 }, // 1 × 4px grid
  xl: { paddingVertical: 4, paddingHorizontal: 4 }, // 1 × 4px grid
};

/**
 * Color schemes for the Switch component
 */
export const ColorSchemes = {
  // Default colors
  default: {
    active: 'theme.primary',
    inactive: 'color.gray.300',
    knob: 'white',
    disabled: 'color.gray.200',
  },
  // State-specific colors
  states: {
    hover: {
      active: 'color.blue.600',
      inactive: 'color.gray.400',
    },
    focus: {
      active: 'color.blue.600',
      inactive: 'color.gray.400',
      outline: 'rgba(66, 153, 225, 0.6)',
    },
  },
};
