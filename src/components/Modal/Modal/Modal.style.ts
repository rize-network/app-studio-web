/**
 * Modal Styles
 *
 * Defines the styles for the Modal component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { Shape, Size } from './Modal.type';

/**
 * Container shape configurations for the Modal component
 * Following the 4px grid system
 */
export const ContainerShapes: Record<Shape, ViewProps> = {
  sharp: { borderRadius: 0 },
  rounded: { borderRadius: '8px' }, // 2 × 4px grid
};
/**
 * Overlay alignment configurations for the Modal component
 */
export const OverlayAlignments: Record<string, ViewProps> = {
  center: { justifyContent: 'center', alignItems: 'center' },
  top: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '64px',
  }, // 16 × 4px grid
  right: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '32px',
  }, // 8 × 4px grid
  bottom: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: '64px',
  }, // 16 × 4px grid
  left: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '32px',
  }, // 8 × 4px grid
};

/**
 * Header icon size configurations for the Modal component
 * Following the 4px grid system
 */
export const HeaderIconSizes: Record<Size, number> = {
  xs: 12, // 3 × 4px grid
  sm: 16, // 4 × 4px grid
  md: 20, // 5 × 4px grid
  lg: 24, // 6 × 4px grid
  xl: 28, // 7 × 4px grid
};

/**
 * Animation configurations for the Modal component
 */
export const ModalAnimations = {
  enter: {
    opacity: [0, 1],
    transform: ['scale(0.95)', 'scale(1)'],
    transition: 'all 0.3s ease-out',
  },
  exit: {
    opacity: [1, 0],
    transform: ['scale(1)', 'scale(0.95)'],
    transition: 'all 0.2s ease-in',
  },
};

/**
 * Typography configurations for the Modal component
 */
export const ModalTypography = {
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  title: {
    fontSize: '18px', // 4.5 × 4px grid
    fontWeight: '600', // Semi-bold
    lineHeight: '24px', // 6 × 4px grid
    color: 'color.gray.900',
  },
  body: {
    fontSize: '16px', // 4 × 4px grid
    fontWeight: '400', // Regular
    lineHeight: '24px', // 6 × 4px grid
    color: 'color.gray.700',
  },
};
