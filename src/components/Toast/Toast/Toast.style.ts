import { ViewProps } from 'app-studio';
import { ToastPosition, ThemesType } from './Toast.type';

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
