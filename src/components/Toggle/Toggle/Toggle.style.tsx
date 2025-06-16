import { ViewProps } from 'app-studio';
import { Shape, Variant } from './Toggle.type';

export const ToggleShapes: Record<Shape, number | string> = {
  sharp: 0,
  rounded: 4,
  pillShaped: 24,
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
    backgroundColor: 'transparent',
    color: color,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color,
    _hover: {
      backgroundColor: color,
      color: isLight ? 'color.black' : 'color.white',
      transform: 'translateY(-1px)',
    },
    _active: {
      backgroundColor: color,
      color: isLight ? 'color.black' : 'color.white',
      transform: 'translateY(0)',
    },
    transition: 'all 0.2s ease',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: color,
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'transparent',
    _hover: {
      backgroundColor: color,
      color: isLight ? 'color.black' : 'color.white',
      transform: 'translateY(-1px)',
    },
    _active: {
      backgroundColor: color,
      color: isLight ? 'color.black' : 'color.white',
      transform: 'translateY(0)',
    },
    transition: 'all 0.2s ease',
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
      borderColor: color,
      textDecorationThickness: '2px',
      transform: 'translateY(-1px)',
    },
    _active: {
      borderColor: color,
      textDecorationThickness: '2px',
      transform: 'translateY(0)',
    },
    transition: 'all 0.2s ease',
  },
});
