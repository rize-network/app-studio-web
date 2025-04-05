import { ViewProps } from 'app-studio';

export type Size =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export type CheckboxStyles = {
  checkbox?: ViewProps;
  label?: ViewProps;
  infoText?: ViewProps;
};

export type Variant = 'selected' | 'unselected' | 'indeterminate';
