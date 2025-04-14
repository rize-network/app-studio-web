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
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  h2: {
    fontSize: '30px', // 1.875rem
    lineHeight: '36px', // 2.25rem
    fontWeight: '700', // Bold
    letterSpacing: '-0.02em',
    marginBottom: '20px', // 5 × 4px grid
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  h3: {
    fontSize: '24px', // 1.5rem
    lineHeight: '32px', // 2rem
    fontWeight: '600', // Semi-bold
    letterSpacing: '-0.01em',
    marginBottom: '16px', // 4 × 4px grid
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  h4: {
    fontSize: '20px', // 1.25rem
    lineHeight: '28px', // 1.75rem
    fontWeight: '600', // Semi-bold
    letterSpacing: '-0.01em',
    marginBottom: '16px', // 4 × 4px grid
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  h5: {
    fontSize: '18px', // 1.125rem
    lineHeight: '24px', // 1.5rem
    fontWeight: '600', // Semi-bold
    letterSpacing: '-0.01em',
    marginBottom: '12px', // 3 × 4px grid
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  h6: {
    fontSize: '16px', // 1rem
    lineHeight: '24px', // 1.5rem
    fontWeight: '600', // Semi-bold
    letterSpacing: '-0.01em',
    marginBottom: '8px', // 2 × 4px grid
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
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
  '2xl': '24px', // 1.5rem
  '3xl': '30px', // 1.875rem
  '4xl': '36px', // 2.25rem
  '5xl': '48px', // 3rem
  '6xl': '60px', // 3.75rem
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
  '2xl': '32px', // 2rem
  '3xl': '36px', // 2.25rem
  '4xl': '40px', // 2.5rem
  '5xl': '60px', // 3.75rem
  '6xl': '72px', // 4.5rem
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
