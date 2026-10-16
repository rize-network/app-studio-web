/**
 * Typography Utility
 *
 * This utility provides consistent typography settings across the application.
 * It defines font sizes, line heights, and font weights according to the design guidelines.
 */

import { TextWeights } from '../components/Form/Label/Label/Label.type';
import { Size } from '../components/Input/Input.type';

/**
 * Font sizes following the harmonized typography guidelines
 */
export const FontSizes: Record<Size, string | number> = {
  xs: 10, // Harmonized font size
  sm: 12, // Harmonized font size
  md: 14, // Harmonized font size
  lg: 16, // Harmonized font size
  xl: 20, // Harmonized font size
};

/**
 * Line heights following the harmonized typography guidelines
 */
export const LineHeights: Record<Size, string | number> = {
  xs: '100%', // Adjusted for 10px font
  sm: '100%', // Adjusted for 12px font
  md: '110%', // Adjusted for 14px font
  lg: '120%', // Adjusted for 16px font
  xl: '120%', // Adjusted for 20px font
};

/**
 * Font weights following typography guidelines
 */
export const FontWeights: Record<TextWeights, string> = {
  hairline: '100',
  thin: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

/**
 * Typography utility object that can be used across components
 */
export const Typography = {
  fontSizes: FontSizes,
  lineHeights: LineHeights,
  fontWeights: FontWeights,
};

export default Typography;
