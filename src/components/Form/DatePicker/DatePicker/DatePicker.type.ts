import { ViewProps } from 'app-studio';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type DatePickerStyles = {
  container?: ViewProps;
  text?: ViewProps;
  label?: ViewProps;
  helperText?: ViewProps;
  field?: ViewProps;
};

export type Position = 'top' | 'left' | 'right' | 'bottom';

export type Shape = 'default' | 'square' | 'rounded' | 'pill';

export type Variant = 'default' | 'outline' | 'none';
