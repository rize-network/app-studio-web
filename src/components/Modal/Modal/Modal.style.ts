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
  square: { borderRadius: 0 },
  rounded: { borderRadius: 8 }, // radius-md
};
/**
 * Overlay alignment configurations for the Modal component
 */
export const OverlayAlignments: Record<string, ViewProps> = {
  center: { justifyContent: 'center', alignItems: 'center' },
  top: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  }, // 16 × 4px grid
  right: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  }, // 8 × 4px grid
  bottom: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  }, // 16 × 4px grid
  left: {
    justifyContent: 'flex-start',
    alignItems: 'center',
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
 * Subtle and smooth, matching shadcn/ui patterns
 */
export const ModalAnimations = {
  enter: {
    opacity: [0, 1],
    transform: ['scale(0.95)', 'scale(1)'],
    transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
  },
  exit: {
    opacity: [1, 0],
    transform: ['scale(1)', 'scale(0.95)'],
    transition: 'opacity 0.15s ease-in, transform 0.15s ease-in',
  },
};

/**
 * Overlay styles for the Modal component
 */
export const OverlayStyles: ViewProps = {
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  transition: 'background-color 0.2s ease',
};

/**
 * Container base styles for the Modal component
 */
export const ContainerBaseStyles: ViewProps = {
  backgroundColor: 'color-white',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
  transition: 'box-shadow 0.2s ease',
  _focusVisible: {
    outline: 'none',
    boxShadow: '0 0 0 2px white, 0 0 0 4px theme-primary',
  },
};

/**
 * Typography configurations for the Modal component
 */
export const ModalTypography = {
  title: {
    fontSize: '20px', // xl
    fontWeight: '600',
    lineHeight: '28px',
    color: 'color-gray-900',
  },
  body: {
    fontSize: '16px', // lg
    fontWeight: '400',
    lineHeight: '24px',
    color: 'color-gray-700',
  },
};
