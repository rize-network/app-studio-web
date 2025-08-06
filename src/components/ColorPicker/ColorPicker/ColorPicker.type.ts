import { ViewProps } from 'app-studio';

export type Variant = 'outline' | 'default' | 'filled';

export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ColorPickerStyles = {
  container?: ViewProps;
  trigger?: ViewProps;
  dropdown?: ViewProps;
  colorGrid?: ViewProps;
  colorSwatch?: ViewProps;
  customInput?: ViewProps;
  recentColors?: ViewProps;
  label?: ViewProps;
  helperText?: ViewProps;
};

export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export type ColorValue = {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
};

export type PredefinedColor = {
  name: string;
  value: string;
  category?: string;
};
