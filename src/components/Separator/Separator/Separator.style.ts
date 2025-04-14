/**
 * Separator Styles
 *
 * Defines the styles for the Separator component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Orientation, Variant, Thickness } from './Separator.type';

/**
 * Orientation configurations for the Separator component
 */
export const SeparatorOrientations: Record<Orientation, ViewProps> = {
  horizontal: {
    width: '100%',
    height: 'auto',
  },
  vertical: {
    width: 'auto',
    height: '100%',
  },
};

/**
 * Variant configurations for the Separator component
 */
export const SeparatorVariants: Record<Variant, string> = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
};

/**
 * Thickness configurations for the Separator component
 * Following the 4px grid system
 */
export const SeparatorThicknesses: Record<Thickness, string> = {
  thin: '1px',
  medium: '2px', // 0.5 × 4px grid
  thick: '4px', // 1 × 4px grid
};

/**
 * Default styles for the Separator component
 */
export const DefaultSeparatorStyles = {
  container: {
    transition: 'all 0.2s ease',
  },
  label: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '14px',
    color: 'color.gray.500',
    paddingHorizontal: '8px', // 2 × 4px grid
    transition: 'all 0.2s ease',
  },
};
