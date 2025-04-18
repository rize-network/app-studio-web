/**
 * Text Styles
 *
 * Defines the styles for the Text component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 */

import { Headings, Size, TextWeights } from './Text.type';
import { ViewProps } from 'app-studio';

/**
 * Heading sizes following typography guidelines
 */
export const HeadingSizes: Record<Headings, ViewProps> = {
  h1: {
    fontSize: '36px', // 2.25rem
    lineHeight: '40px', // 2.5rem
    fontWeight: '700', // Bold
    letterSpacing: '-0.02em',
    marginBottom: '24px', // 6 × 4px grid
  },
  h2: {
    fontSize: '30px', // 1.875rem
    lineHeight: '36px', // 2.25rem
    fontWeight: '700', // Bold
    letterSpacing: '-0.02em',
    marginBottom: '20px', // 5 × 4px grid
  },
  h3: {
    fontSize: '24px', // 1.5rem
    lineHeight: '32px', // 2rem
    fontWeight: '600', // Semi-bold
    letterSpacing: '-0.01em',
    marginBottom: '16px', // 4 × 4px grid
  },
  h4: {
    fontSize: '20px', // 1.25rem
    lineHeight: '28px', // 1.75rem
    fontWeight: '600', // Semi-bold
    letterSpacing: '-0.01em',
    marginBottom: '16px', // 4 × 4px grid
  },
  h5: {
    fontSize: '18px', // 1.125rem
    lineHeight: '24px', // 1.5rem
    fontWeight: '600', // Semi-bold
    letterSpacing: '-0.01em',
    marginBottom: '12px', // 3 × 4px grid
  },
  h6: {
    fontSize: '16px', // 1rem
    lineHeight: '24px', // 1.5rem
    fontWeight: '600', // Semi-bold
    letterSpacing: '-0.01em',
    marginBottom: '8px', // 2 × 4px grid
  },
};

/**
 * Font sizes following typography guidelines
 */
export const FontSizes: Record<Size, string> = {
  xs: '12px', // 0.75rem
  sm: '14px', // 0.875rem
  md: '16px', // 1rem (base)
  lg: '18px', // 1.125rem
  xl: '20px', // 1.25rem
};

/**
 * Line heights following typography guidelines
 */
export const LineHeights: Record<Size, string> = {
  xs: '16px', // 1rem
  sm: '20px', // 1.25rem
  md: '24px', // 1.5rem
  lg: '28px', // 1.75rem
  xl: '28px', // 1.75rem
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
