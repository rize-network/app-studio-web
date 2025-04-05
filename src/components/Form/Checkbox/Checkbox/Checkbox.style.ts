import { ViewProps } from 'app-studio';
import { Size } from './Checkbox.type';

export const Sizes: Record<Size, ViewProps> = {
  xs: { height: 8, width: 8 },
  sm: { height: 12, width: 12 },
  md: { height: 18, width: 18 },
  lg: { height: 24, width: 24 },
  xl: { height: 30, width: 30 },
  '2xl': { height: 36, width: 36 },
  '3xl': { height: 42, width: 42 },
  '4xl': { height: 48, width: 48 },
  '5xl': { height: 54, width: 54 },
  '6xl': { height: 60, width: 60 },
};

export const IconSizes: Record<Size, number> = {
  xs: 6,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  '2xl': 36,
  '3xl': 42,
  '4xl': 48,
  '5xl': 54,
  '6xl': 60,
};
