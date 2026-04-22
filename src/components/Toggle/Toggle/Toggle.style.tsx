import { ViewProps } from 'app-studio';
import { Shape, Variant } from './Toggle.type';

export const ToggleShapes: Record<Shape, number | string> = {
  square: 0,
  rounded: 8,
  pill: 999,
};

/**
 * Generate toggle variants with proper color combinations based on main color and contrast
 * Similar to Button's getButtonVariants function
 */
export const getToggleVariants = (
  color: string,
  isLight: boolean
): Record<Variant, ViewProps> => ({
  outline: {
    backgroundColor: isLight ? 'color-white' : 'rgba(15, 23, 42, 0.92)',
    color: color,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: isLight
      ? 'rgba(226, 232, 240, 0.95)'
      : 'rgba(71, 85, 105, 0.9)',
    _hover: {
      backgroundColor: isLight
        ? 'rgba(248, 250, 252, 0.96)'
        : 'rgba(30, 41, 59, 0.95)',
      borderColor: isLight ? '#CBD5E1' : '#64748B',
    },
    _active: {
      backgroundColor: isLight
        ? 'rgba(241, 245, 249, 1)'
        : 'rgba(30, 41, 59, 1)',
    },
    transition:
      'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: color,
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'transparent',
    _hover: {
      backgroundColor: isLight
        ? 'rgba(248, 250, 252, 0.96)'
        : 'rgba(30, 41, 59, 0.85)',
    },
    _active: {
      backgroundColor: isLight
        ? 'rgba(241, 245, 249, 1)'
        : 'rgba(30, 41, 59, 1)',
    },
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  link: {
    backgroundColor: 'transparent',
    color: color,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    textDecoration: 'underline',
    textUnderlineOffset: '1px',
    textDecorationThickness: '1px',
    _hover: {
      opacity: 0.8,
    },
    _active: {
      opacity: 0.9,
    },
    transition: 'opacity 0.2s ease',
  },
});
