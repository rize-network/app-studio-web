/**
 * Avatar Styles
 *
 * Defines the styles for the Avatar component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Size } from './Avatar.type';

/**
 * Avatar sizes following the 4px grid system
 */
export const AvatarSizeMap: Record<Size, number> = {
  xs: 24, // 6 × 4px grid
  sm: 32, // 8 × 4px grid
  md: 48, // 12 × 4px grid
  lg: 64, // 16 × 4px grid
  xl: 80, // 20 × 4px grid
};

/**
 * Default styles for the Avatar component
 */
export const DefaultAvatarStyles = {
  container: {
    borderRadius: '50%',
    overflow: 'hidden',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    backgroundColor: 'color.gray.100',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    '@media (prefers-color-scheme: dark)': {
      backgroundColor: 'color.gray.700',
    },
  } as ViewProps,
  fallback: {
    fontWeight: '500', // Medium weight for better readability
    color: 'color.gray.600',
    '@media (prefers-color-scheme: dark)': {
      color: 'color.gray.300',
    },
  } as ViewProps,
  image: {
    objectFit: 'cover',
    transition: 'all 0.2s ease',
  } as ViewProps,
};
