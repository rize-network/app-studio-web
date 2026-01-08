import { ViewProps } from 'app-studio';

export type Variant = 'default' | 'outlined' | 'elevated';
export type Size = 'sm' | 'md' | 'lg';
export type Shape = 'square' | 'rounded' | 'pill';

export interface CardStyles {
  container?: ViewProps;
  header?: ViewProps;
  content?: ViewProps;
  footer?: ViewProps;
}
