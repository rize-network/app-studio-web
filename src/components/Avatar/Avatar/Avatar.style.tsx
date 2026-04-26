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
  md: 44,
  lg: 56,
  xl: 72,
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
    borderColor: 'color-gray-200',
    backgroundColor: 'theme-primary',
    transition:
      'background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
  } as ViewProps,
  fallback: {
    fontWeight: '600',
    color: 'color-white',
    letterSpacing: '-0.02em',
  } as ViewProps,
  image: {
    objectFit: 'cover',
    transition: 'opacity 0.2s ease',
  } as ViewProps,
};
