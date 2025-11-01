/**
 * Toast Styles
 *
 * Defines the styles for the Toast component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import { ToastPosition, ThemesType } from './Toast.type';

/**
 * Theme configurations for the Toast component
 * Following the design system color palette
 */
export const Themes: ThemesType = {
  info: {
    container: {
      backgroundColor: 'color.blue.50',
      border: 'color.blue.300',
    },
    content: {
      color: 'color.blue.700',
    },
    icon: {
      color: 'color.blue.500',
    },
  },
  success: {
    container: {
      backgroundColor: 'color.green.50',
      border: 'color.green.300',
    },
    content: {
      color: 'color.green.700',
    },
    icon: {
      color: 'color.green.500',
    },
  },
  warning: {
    container: {
      backgroundColor: 'color.orange.50',
      border: 'color.orange.300',
    },
    content: {
      color: 'color.orange.700',
    },
    icon: {
      color: 'color.orange.500',
    },
  },
  error: {
    container: {
      backgroundColor: 'color.red.50',
      border: 'color.red.300',
    },
    content: {
      color: 'color.red.700',
    },
    icon: {
      color: 'color.red.500',
    },
  },
};

/**
 * Animation configurations for the Toast component
 * Subtle and smooth, matching shadcn/ui patterns
 */
export const ToastAnimations = {
  enter: {
    opacity: [0, 1],
    transform: ['translateY(8px)', 'translateY(0)'],
    transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
  },
  exit: {
    opacity: [1, 0],
    transform: ['translateY(0)', 'translateY(8px)'],
    transition: 'opacity 0.15s ease-in, transform 0.15s ease-in',
  },
};

/**
 * Base container styles for the Toast component
 */
export const BaseContainerStyles: ViewProps = {
  borderRadius: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  padding: '12px 16px', // 3 × 4px and 4 × 4px grid
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.03)',
  transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
};

/**
 * Position configurations for the Toast component
 * Following the 4px grid system
 */
export const ToastPositions: Record<ToastPosition, ViewProps> = {
  top: {
    top: '16px', // 4 × 4px grid
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'top-right': {
    top: '16px', // 4 × 4px grid
    right: '16px', // 4 × 4px grid
  },
  'top-left': {
    top: '16px', // 4 × 4px grid
    left: '16px', // 4 × 4px grid
  },
  bottom: {
    bottom: '16px', // 4 × 4px grid
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'bottom-right': {
    bottom: '16px', // 4 × 4px grid
    right: '16px', // 4 × 4px grid
  },
  'bottom-left': {
    bottom: '16px', // 4 × 4px grid
    left: '16px', // 4 × 4px grid
  },
};
