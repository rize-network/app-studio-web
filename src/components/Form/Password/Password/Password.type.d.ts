import { CSSProperties } from 'react';

export type Variant = 'outline' | 'default' | 'unStyled';

export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';

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

export type PasswordStyles = {
  box?: CSSProperties;
  Password?: CSSProperties;
  label?: CSSProperties;
  helperText?: CSSProperties;
};
