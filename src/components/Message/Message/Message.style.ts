import { CSSProperties } from 'react';

import { Message, Shape, Size } from './Message.type';

export const ContainerShapes: Record<Shape, CSSProperties> = {
  sharp: { borderRadius: 0 },
  rounded: { borderRadius: 4 },
};

export const HeaderIconSizes: Record<Size, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

export const Themes: Record<Message, any> = {
  info: {
    container: {
      backgroundColor: 'color.blue.200',
      border: 'color.blue.400',
    },
    icon: {
      color: 'color.blue.500',
      name: 'InformationSvg',
    },
    content: {
      color: 'color.blue.500',
    },
    close: {
      color: 'color.blue.500',
      name: 'CloseSvg',
    },
  },
  success: {
    container: {
      backgroundColor: 'color.green.200',
      border: 'color.green.400',
    },
    icon: {
      color: 'color.green.500',
      name: 'CheckCircleSvg',
    },
    content: {
      color: 'color.green.500',
    },
    close: {
      color: 'color.green.500',
      name: 'CloseSvg',
    },
  },
  error: {
    container: {
      backgroundColor: 'color.red.200',
      border: 'color.red.400',
    },
    icon: {
      color: 'color.red.500',
      name: 'ErrrorSvg',
    },
    content: {
      color: 'color.red.500',
    },
    close: {
      color: 'color.red.500',
      name: 'CloseSvg',
    },
  },
  warning: {
    container: {
      backgroundColor: 'color.orange.200',
      border: 'color.orange.400',
    },
    icon: {
      color: 'color.orange.500',
      name: 'ErrrorSvg',
    },
    content: {
      color: 'color.orange.500',
    },
    close: {
      color: 'color.orange.500',
      name: 'CloseSvg',
    },
  },
};
