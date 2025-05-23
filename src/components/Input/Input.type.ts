import { ViewProps } from 'app-studio';

export type Variant = 'outline' | 'default' | 'none';

export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TextFieldStyles = {
  text?: ViewProps;
  label?: ViewProps;
  error?: ViewProps;
  helperText?: ViewProps;
  container?: ViewProps;
};

export type Wrap = 'wrap' | 'nowrap' | 'wrap-reverse';

export type Justify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
