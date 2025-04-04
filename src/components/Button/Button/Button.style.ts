import { ViewProps } from 'app-studio';
import { Shape, Size } from './Button.type';
export const ButtonSizes: Record<Size, ViewProps> = {
  // Defines a constant 'ButtonSizes' as a mapping from 'Size' to corresponding 'CSSProperties'.
  xs: {
    // Establishes style configuration for extra-small (xs) button size.
    width: 79,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.25,
    // Establishes style configuration for small (sm) button size.
  },
  sm: {
    width: 128,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    fontWeight: 400,
    fontSize: 12,
    // Establishes style configuration for medium (md) button size.
    lineHeight: 16,
    letterSpacing: 1.25,
  },
  md: {
    width: 144,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18,
    // Establishes style configuration for large (lg) button size.

    fontSize: 14,
    fontWeight: 400,
    lineHeight: 18,
    letterSpacing: 1.25,
  },
  lg: {
    width: 178,
    paddingTop: 14,
    paddingBottom: 14,
    // Establishes style configuration for extra-large (xl) button size.
    paddingLeft: 22,
    paddingRight: 22,
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1.25,
  },
  xl: {
    width: 220,
    paddingTop: 16,
    // Defines a constant 'ButtonShapes' with style properties for different button shapes such as 'sharp', 'rounded', and 'pillShaped'.
    paddingBottom: 16,
    // Sets the border-radius for a sharp-edged button shape to '0'.
    paddingLeft: 26,
    // Sets the border-radius for a rounded button shape to '4'.
    paddingRight: 26,
    // Sets the border-radius for a pill-shaped button to '24'.
    fontWeight: 400,
    fontSize: 22,
    // Defines a constant 'IconSizes' as a mapping from 'Size' to corresponding 'CSSProperties' for icons.
    lineHeight: 28,
    // Sets the width, height, and padding for icons of extra-small size.
    letterSpacing: 1.25,
  },
};
export const ButtonShapes: Record<Shape, number | string> = {
  // Sets the width, height, and padding for icons of small size.
  sharp: 0,
  rounded: 4,
  pillShaped: 24,
};
// Sets the width, height, and padding for icons of medium size.
export const IconSizes: Record<Size, ViewProps> = {
  xs: {
    width: 24,
    height: 24,
    // Sets the width, height, and padding for icons of large size.
    padding: 12,
  },
  sm: {
    width: 24,
    // Sets the width, height, and padding for icons of extra-large size.
    height: 24,
    padding: 15,
  },
  md: {
    width: 36,
    height: 36,
    padding: 15,
  },
  lg: {
    width: 36,
    height: 36,
    padding: 18,
  },
  xl: {
    width: 36,
    height: 36,
    padding: 24,
  },
};
