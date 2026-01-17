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
 * Following the 4px grid system - dimensions réduites
 */
export const KnobSizes: Record<Size, ViewProps> = {
  xs: { height: '8px', width: '8px' }, // 2 × 4px grid
  sm: { height: '12px', width: '12px' }, // 3 × 4px grid
  md: { height: '16px', width: '16px' }, // 4 × 4px grid
  lg: { height: '20px', width: '20px' }, // 5 × 4px grid
  xl: { height: '24px', width: '24px' }, // 6 × 4px grid
};

/**
 * Slider (track) sizes for the Switch component
 * Following the 4px grid system - dimensions réduites
 */
export const SliderSizes: Record<Size, ViewProps> = {
  xs: {
    height: '16px', // 4 × 4px grid
    width: '36px', // 9 × 4px grid - increased for content
  },
  sm: {
    height: '20px', // 5 × 4px grid
    width: '44px', // 11 × 4px grid - increased for content
  },
  md: {
    height: '24px', // 6 × 4px grid
    width: '52px', // 13 × 4px grid - increased for content
  },
  lg: {
    height: '28px', // 7 × 4px grid
    width: '60px', // 15 × 4px grid - increased for content
  },
  xl: {
    height: '32px', // 8 × 4px grid
    width: '68px', // 17 × 4px grid - increased for content
  },
};

/**
 * Padding for the Switch slider - ajusté pour les nouvelles dimensions
 * Following the 4px grid system
 */
export const SliderPadding: Record<Size, Record<string, number>> = {
  xs: { paddingVertical: 4, paddingHorizontal: 2 }, // 0.5 × 4px grid horizontalement
  sm: { paddingVertical: 4, paddingHorizontal: 2 }, // 0.5 × 4px grid horizontalement
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
    active: 'theme-primary',
    inactive: 'color-gray-300',
    knob: 'white',
    disabled: 'color-gray-200',
  },
  // State-specific colors
  states: {
    hover: {
      active: 'theme-primary',
      inactive: 'color-gray-400',
      activeOpacity: 0.9,
    },
    focus: {
      active: {
        outline: 'none',
        boxShadow:
          '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(66, 153, 225, 0.3)',
      },
      inactive: {
        outline: 'none',
        boxShadow:
          '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
};

/**
 * Transition styles for the Switch component
 */
export const TransitionStyles = {
  slider: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  knob: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
