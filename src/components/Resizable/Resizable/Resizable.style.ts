import { ViewProps } from 'app-studio';
import { Orientation, Size, Variant } from './Resizable.type';

export const ResizableOrientations: Record<Orientation, ViewProps> = {
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
};

export const getHandleSizeStyles = (
  size: Size,
  orientation: Orientation
): ViewProps => {
  const sizes = {
    sm: {
      width: orientation === 'horizontal' ? '4px' : '100%',
      height: orientation === 'vertical' ? '4px' : '100%',
    },
    md: {
      width: orientation === 'horizontal' ? '6px' : '100%',
      height: orientation === 'vertical' ? '6px' : '100%',
    },
    lg: {
      width: orientation === 'horizontal' ? '8px' : '100%',
      height: orientation === 'vertical' ? '8px' : '100%',
    },
  };

  return sizes[size];
};

export const HandleVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'transparent',
    _hover: {
      backgroundColor: 'color.gray.200',
    },
    _active: {
      backgroundColor: 'color.gray.300',
    },
  },
  subtle: {
    backgroundColor: 'transparent',
    _hover: {
      backgroundColor: 'color.gray.100',
    },
    _active: {
      backgroundColor: 'color.gray.200',
    },
  },
  prominent: {
    backgroundColor: 'color.gray.100',
    _hover: {
      backgroundColor: 'color.gray.200',
    },
    _active: {
      backgroundColor: 'color.gray.300',
    },
  },
};

export const HandleIconStyles: Record<Orientation, ViewProps> = {
  horizontal: {
    width: '2px',
    height: '20px',
    backgroundColor: 'color.gray.400',
    margin: '0 1px',
  },
  vertical: {
    width: '20px',
    height: '2px',
    backgroundColor: 'color.gray.400',
    margin: '1px 0',
  },
};
