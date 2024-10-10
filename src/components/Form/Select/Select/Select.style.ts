import { CSSProperties } from 'react';
import { Size } from './Select.type';
// Defines a mapping of 'Size' types to their corresponding CSSProperties. This allows different size configurations to be provided for the Select component.
export const Sizes: Record<Size, CSSProperties> = {
  xs: { height: 6, width: 6 },
  sm: { height: 12, width: 12 },
  md: { height: 18, width: 18 },
  lg: { height: 24, width: 24 },
  xl: { height: 30, width: 30 },
};
// Specifies the pixel sizes of icons associated with the Select component based on the predefined 'Size' types allowing for consistent icon scaling.
export const IconSizes: Record<Size, number> = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
};
