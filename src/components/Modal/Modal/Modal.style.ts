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
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  transition: 'background-color 0.2s ease',
};

/**
 * Container base styles for the Modal component
 */
export const ContainerBaseStyles: ViewProps = {
  backgroundColor: 'color.white',
  boxShadow:
    '0px 10px 25px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.08)',
  transition: 'box-shadow 0.2s ease',
  _focusVisible: {
    outline: 'none',
    boxShadow:
      '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.1), 0px 10px 25px rgba(0, 0, 0, 0.1)',
  },
};

/**
 * Typography configurations for the Modal component
 */
export const ModalTypography = {
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
