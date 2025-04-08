import { ViewProps } from 'app-studio';
import { Shape, Size, Variant } from './Slider.type';

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
  sharp: 0,
  rounded: 4,
  pillShaped: 24,
};

export const SliderVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color.blueGray.200',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'color.blueGray.300',
  },
};
