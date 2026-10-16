import { ViewProps } from 'app-studio';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type CheckboxStyles = {
  checkbox?: ViewProps;
  label?: ViewProps;
  infoText?: ViewProps;
};

export type Variant = 'selected' | 'unselected' | 'indeterminate';
