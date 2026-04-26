import { ViewProps } from 'app-studio';
import { Orientation, Size, Variant } from './Resizable.type';
// Defines the CSS flex direction for the resizable container based on the specified orientation.
export const ResizableOrientations: Record<Orientation, ViewProps> = {
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
};
// Calculates and returns the appropriate width and height styles for the resizable handle based on the provided size and orientation.
export const getHandleSizeStyles = (
  // Parameter: Specifies the desired size (e.g., 'sm', 'md', 'lg') for the handle.
  size: Size,
  // Parameter: Determines if the component is arranged 'horizontal' or 'vertical', affecting handle dimensions.
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
// Parameter: The current theme mode (e.g., 'light', 'dark') which might influence the returned styles.
export const getHandle = (themeMode: string): Record<Variant, ViewProps> => {
  return {
    default: {
      backgroundColor: 'transparent',
      _hover: {
        backgroundColor: 'color-gray-200',
      },
      _active: {
        backgroundColor: 'color-gray-300',
      },
    },
    subtle: {
      backgroundColor: 'transparent',
      _hover: {
        backgroundColor: 'color-gray-100',
      },
      _active: {
        backgroundColor: 'color-gray-200',
      },
    },
    prominent: {
      backgroundColor: 'color-gray-100',
      _hover: {
        backgroundColor: 'color-gray-200',
      },
      _active: {
        backgroundColor: 'color-gray-300',
      },
    },
  };
};
// Initializes `HandleVariants` by calling `getHandle` with 'light' theme mode, providing a set of default handle styles.
export const HandleVariants = getHandle('light');
// Defines the static styles for the icon element within the resizable handle, varying based on the component's orientation.
export const HandleIconStyles: Record<Orientation, ViewProps> = {
  horizontal: {
    width: '2px',
    height: '20px',
    backgroundColor: 'color-gray-400',
    margin: '0 1px',
  },
  vertical: {
    width: '20px',
    height: '2px',
    backgroundColor: 'color-gray-400',
    margin: '1px 0',
  },
};
