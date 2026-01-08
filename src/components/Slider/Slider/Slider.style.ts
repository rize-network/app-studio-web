import { ViewProps } from 'app-studio';
import { Orientation, Shape, Size, Variant } from './Slider.type';

export const SliderSizes: Record<Size, ViewProps> = {
  xs: {
    height: 4,
    width: '100%',
  },
  sm: {
    height: 6,
    width: '100%',
  },
  md: {
    height: 8,
    width: '100%',
  },
  lg: {
    height: 10,
    width: '100%',
  },
  xl: {
    height: 12,
    width: '100%',
  },
};

export const ThumbSizes: Record<Size, ViewProps> = {
  xs: {
    width: 12,
    height: 12,
  },
  sm: {
    width: 16,
    height: 16,
  },
  md: {
    width: 20,
    height: 20,
  },
  lg: {
    width: 24,
    height: 24,
  },
  xl: {
    width: 28,
    height: 28,
  },
};

export const SliderShapes: Record<Shape, number | string> = {
  square: 0,
  rounded: 4,
  pill: 24,
};

export const getSlider = (themeMode: string): Record<Variant, ViewProps> => {
  return {
    default: {
      backgroundColor: 'color.gray.200',
      transition: 'background-color 0.15s ease',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'color.gray.300',
      transition: 'border-color 0.15s ease',
    },
  };
  // Add dark mode conditional styling here
};

// For backward compatibility
export const SliderVariants = getSlider('light');

/**
 * Thumb styles matching shadcn/ui patterns
 */
export const ThumbStyles: ViewProps = {
  backgroundColor: 'color.white',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'theme.primary',
  borderRadius: '50%',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
  transition: 'box-shadow 0.15s ease, transform 0.15s ease',
  _hover: {
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.08)',
  },
  _focus: {
    outline: 'none',
    boxShadow:
      '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(66, 153, 225, 0.3)',
  },
  _active: {
    transform: 'scale(1.1)',
  },
};

/**
 * Track styles matching shadcn/ui patterns
 */
export const TrackStyles: ViewProps = {
  backgroundColor: 'color.gray.200',
  overflow: 'hidden',
  transition: 'background-color 0.15s ease',
};

/**
 * Range (filled portion) styles
 */
export const RangeStyles: ViewProps = {
  backgroundColor: 'theme.primary',
  transition: 'width 0.15s ease, height 0.15s ease',
};

// Maps Size enum to track height/width and thumb size for the new implementation
export const EnhancedSliderSizes: Record<
  Size,
  { trackCrossAxisSize: number; thumbSize: number }
> = {
  xs: { trackCrossAxisSize: 4, thumbSize: 12 },
  sm: { trackCrossAxisSize: 6, thumbSize: 16 },
  md: { trackCrossAxisSize: 8, thumbSize: 20 },
  lg: { trackCrossAxisSize: 10, thumbSize: 24 },
  xl: { trackCrossAxisSize: 12, thumbSize: 28 },
};

// Basic styles for horizontal and vertical orientation
export const OrientationStyles: Record<Orientation, ViewProps> = {
  horizontal: {
    width: '100%',
    minWidth: '120px', // Ensure a minimum clickable area
    height: 'auto', // Height determined by track/thumb size + padding
    flexDirection: 'row',
    paddingVertical: 8, // Add padding for easier thumb interaction
  },
  vertical: {
    height: '100%',
    minHeight: '120px', // Ensure a minimum clickable area
    width: 'auto', // Width determined by track/thumb size + padding
    flexDirection: 'column-reverse', // Place track visually bottom-to-top
    paddingHorizontal: 8, // Add padding for easier thumb interaction
  },
};
