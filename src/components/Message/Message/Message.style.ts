import { ViewProps } from 'app-studio';
import { MessageType, Shape, Size } from './Message.type';

export const ContainerShapes: Record<Shape, ViewProps> = {
  square: { borderRadius: 0 },
  rounded: { borderRadius: 12 },
};

export const HeaderIconSizes: Record<Size, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

export const Themes: Record<MessageType, any> = {
  info: {
    container: {
      backgroundColor: 'color-white',
      border: 'rgba(191, 219, 254, 0.95)',
    },
    icon: {
      color: 'theme-primary',
      name: 'InformationIcon',
    },
    content: {
      color: 'color-gray-900',
    },
    close: {
      color: 'color-gray-500',
      name: 'CloseIcon',
    },
  },
  success: {
    container: {
      backgroundColor: '#F0FDF4',
      border: '#BBF7D0',
    },
    icon: {
      color: '#16A34A',
      name: 'SuccessIcon',
    },
    content: {
      color: '#14532D',
    },
    close: {
      color: '#15803D',
      name: 'CloseIcon',
    },
  },
  error: {
    container: {
      backgroundColor: '#FEF2F2',
      border: '#FECACA',
    },
    icon: {
      color: '#DC2626',
      name: 'ErrorIcon',
    },
    content: {
      color: '#7F1D1D',
    },
    close: {
      color: '#B91C1C',
      name: 'CloseIcon',
    },
  },
  warning: {
    container: {
      backgroundColor: '#FFF7ED',
      border: '#FED7AA',
    },
    icon: {
      color: '#EA580C',
      name: 'WarningIcon',
    },
    content: {
      color: '#9A3412',
    },
    close: {
      color: '#C2410C',
      name: 'CloseIcon',
    },
  },
};
