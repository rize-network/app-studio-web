import { CSSProperties } from 'react';

import { Shape, Size, Variant } from './Input.type';

export const Shapes: Record<Shape, CSSProperties> = {
  default: {
    borderRadius: 0,
  },
  sharp: { borderRadius: 0 },
  rounded: { borderRadius: 4 },
  pillShaped: { borderRadius: 24 },
};

export const LabelSizes: Record<Size, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
};

export const InputVariants: Record<Variant, CSSProperties> = {
  outline: {
    borderWidth: 1,
  },
  default: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  none: {
    border: 'none',
    backgroundColor: 'transparent',
  },
};

export const PadddingWithLabel = {
  paddingTop: 14,
  paddingBottom: 0,
  paddingLeft: 18,
  paddingRight: 36,
};

export const PaddingWithoutLabel = {
  paddingTop: 10,
  paddingBottom: 4,
  paddingLeft: 18,
  paddingRight: 36,
};
