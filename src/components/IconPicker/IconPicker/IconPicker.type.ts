import { ViewProps } from 'app-studio';

export type Variant = 'outline' | 'default' | 'filled';

export type Shape = 'default' | 'square' | 'rounded' | 'pill';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconPickerStyles = {
  container?: ViewProps;
  trigger?: ViewProps;
  dropdown?: ViewProps;
  searchInput?: ViewProps;
  iconGrid?: ViewProps;
  iconItem?: ViewProps;
  label?: ViewProps;
  helperText?: ViewProps;
};
