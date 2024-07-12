export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Shape = 'default' | 'sharp' | 'rounded' | 'pillShaped';

export type Variant = 'outline' | 'default' | 'none';

export type SelectStyles = {
  text?: CSSProperties;
  icon?: CSSProperties;
  dropDown?: CSSProperties;
  selectBox?: CSSProperties;
  label?: CSSProperties;
  helperText?: CSSProperties;
  field?: CSSProperties;
};

// Defines the shape of an item within the ComboBox.
export interface Option {
  label: string;
  value: string;
}
