import { ViewProps } from 'app-studio';

export type Shape = 'sharp' | 'rounded' | 'pillShaped';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'default' | 'outline';

export interface SliderStyles {
  container?: ViewProps;
  track?: ViewProps;
  progress?: ViewProps;
  thumb?: ViewProps;
  label?: ViewProps;
  valueLabel?: ViewProps;
}
