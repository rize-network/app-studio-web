import { ViewProps } from 'app-studio';
import { Size } from './Link.type';

// Defines a mapping of various size names (from 'xs' to '6xl') to their respective numeric icon sizes, providing a scalable way to reference icon sizes throughout the component.
export const IconSizes: Record<Size, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

/**
 * Link base styles matching shadcn/ui patterns
 */
export const LinkBaseStyles: ViewProps = {
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
  textDecorationThickness: '1px',
  transition: 'all 0.15s ease-in-out',
  _hover: {
    opacity: 0.8,
  },
  _focus: {
    outline: 'none',
    opacity: 0.8,
  },
  _focusVisible: {
    boxShadow: '0 0 0 2px white, 0 0 0 4px theme-primary',
    borderRadius: 4, // radius-xs
  },
};
