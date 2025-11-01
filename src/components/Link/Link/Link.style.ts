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
  transition: 'color 0.15s ease, opacity 0.15s ease',
  _hover: {
    opacity: 0.8,
  },
  _focus: {
    outline: 'none',
    opacity: 0.8,
  },
  _focusVisible: {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
  },
};
