import { ViewProps } from 'app-studio';

export type Orientation = 'horizontal' | 'vertical';
export type Variant = 'solid' | 'dashed' | 'dotted';
export type Thickness = 'thin' | 'medium' | 'thick';

export interface SeparatorStyles {
  container?: ViewProps;
  label?: ViewProps;
}
