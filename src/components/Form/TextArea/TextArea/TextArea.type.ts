import { CSSProperties } from 'react';

export type Variant = 'outline' | 'default' | 'none';

export type Shape = 'default' | 'sharp' | 'rounded';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TextAreaStyles = {
  box?: CSSProperties;
  text?: CSSProperties;
  label?: CSSProperties;
  helperText?: CSSProperties;
  field?: CSSProperties;
};
