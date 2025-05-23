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
 */
export const ToastAnimations = {
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
