import { CSSProperties } from 'react';

export type Variant = 'outline' | 'default' | 'unStyled';

export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TextFieldStyles = {
  box?: CSSProperties;
  text?: CSSProperties;
  label?: CSSProperties;
  helperText?: CSSProperties;
  field?: CSSProperties;
};
