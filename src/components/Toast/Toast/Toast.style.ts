import { ViewProps } from 'app-studio';
import { ToastPosition, ThemesType } from './Toast.type';
// Defines the various visual themes (e.g., info, success, warning, error) for the Toast component, including specific background, border, content, and icon colors for each theme.
export const Themes: ThemesType = {
  info: {
    container: {
      backgroundColor: 'color-blue-50',
      border: 'color-blue-300',
    },
    content: {
      color: 'color-blue-700',
    },
    icon: {
      color: 'color-blue-500',
    },
  },
  success: {
    container: {
      backgroundColor: 'color-green-50',
      border: 'color-green-300',
    },
    content: {
      color: 'color-green-700',
    },
    icon: {
      color: 'color-green-500',
    },
  },
  warning: {
    container: {
      backgroundColor: 'color-orange-50',
      border: 'color-orange-300',
    },
    content: {
      color: 'color-orange-700',
    },
    icon: {
      color: 'color-orange-500',
    },
  },
  error: {
    container: {
      backgroundColor: 'color-red-50',
      border: 'color-red-300',
    },
    content: {
      color: 'color-red-700',
    },
    icon: {
      color: 'color-red-500',
    },
  },
};
// Specifies the entry and exit animations for the Toast component, controlling how it appears and disappears from the screen with properties like opacity and transform.
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
// Establishes the foundational styling properties for the Toast container, such as border-radius, border, padding, and box-shadow, applied universally to all toasts.
export const BaseContainerStyles: ViewProps = {
  borderRadius: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  padding: '12px 16px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.03)',
  transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
};
// Maps predefined positions (e.g., top, bottom-right) to specific CSS-in-JS styling rules, determining where the Toast component will render on the screen.
export const ToastPositions: Record<ToastPosition, ViewProps> = {
  top: {
    top: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'top-right': {
    top: '16px',
    right: '16px',
  },
  'top-left': {
    top: '16px',
    left: '16px',
  },
  bottom: {
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'bottom-right': {
    bottom: '16px',
    right: '16px',
  },
  'bottom-left': {
    bottom: '16px',
    left: '16px',
  },
};
