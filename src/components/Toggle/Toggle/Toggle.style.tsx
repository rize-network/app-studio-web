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
    backgroundColor: 'color-white',
    color: color,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    _hover: {
      backgroundColor: 'color-gray-50',
      borderColor: 'color-gray-300',
    },
    _active: {
      backgroundColor: 'color-gray-100',
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
      backgroundColor: 'color-gray-50',
    },
    _active: {
      backgroundColor: 'color-gray-100',
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
