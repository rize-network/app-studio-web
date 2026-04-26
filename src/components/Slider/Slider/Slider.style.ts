import { ViewProps } from 'app-studio';
import { Orientation, Shape, Size, Variant } from './Slider.type';
// Defines the specific dimensions (height and width) for the slider track across various predefined sizes (xs, sm, md, lg, xl).
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
// Specifies the dimensions (width and height) for the slider's interactive thumb component across different predefined sizes.
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
// Maps named shapes (square, rounded, pill) to corresponding border-radius values, determining the visual curvature of the slider elements.
export const SliderShapes: Record<Shape, number | string> = {
  square: 0,
  rounded: 4,
  pill: 24,
};
// A factory function that returns a set of slider styles based on the provided theme mode and variant, supporting 'default' and 'outline' appearances.
export const getSlider = (themeMode: string): Record<Variant, ViewProps> => {
  return {
    default: {
      backgroundColor: 'color-gray-200',
      transition: 'background-color 0.15s ease',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'color-gray-300',
      transition: 'border-color 0.15s ease',
    },
  };
};
// Applies the default slider styles by invoking the 'getSlider' function with the 'light' theme mode.
export const SliderVariants = getSlider('light');
// Defines the comprehensive styling for the slider's thumb, including its appearance, borders, shadow, and interactive states like hover, focus, and active.
export const ThumbStyles: ViewProps = {
  backgroundColor: 'color-white',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'theme-primary',
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
// Specifies the default visual styles for the slider's track, which is the inactive background path for the thumb.
export const TrackStyles: ViewProps = {
  backgroundColor: 'color-gray-200',
  overflow: 'hidden',
  transition: 'background-color 0.15s ease',
};
// Defines the styles for the active range of the slider, representing the filled portion of the track that indicates the current value.
export const RangeStyles: ViewProps = {
  backgroundColor: 'theme-primary',
  transition: 'width 0.15s ease, height 0.15s ease',
};
// Provides a comprehensive mapping of slider sizes to their corresponding track cross-axis dimensions and thumb sizes, useful for responsive styling.
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
// Contains the base styling properties that configure the slider's layout and appearance depending on its orientation (horizontal or vertical).
export const OrientationStyles: Record<Orientation, ViewProps> = {
  horizontal: {
    width: '100%',
    minWidth: '120px',
    height: 'auto',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  vertical: {
    height: '100%',
    minHeight: '120px',
    width: 'auto',
    flexDirection: 'column-reverse',
    paddingHorizontal: 8,
  },
};
