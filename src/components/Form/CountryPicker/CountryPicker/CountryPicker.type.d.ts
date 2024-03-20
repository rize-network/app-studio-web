export type CountryPickerStyles = {
  text?: CSSProperties;
  icon?: CSSProperties;
  dropDown?: CSSProperties;
  box?: CSSProperties;
  label?: CSSProperties;
  helperText?: CSSProperties;
  field?: CSSProperties;
};

export type Country = {
  name: string;
  dial_code: string;
  emoji: string;
  code: string;
};

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';

export type Variant = 'default' | 'outline' | 'none';
