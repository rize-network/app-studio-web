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
  xs: 8,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
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
  paddingTop: 16,
  paddingBottom: 0,
  paddingLeft: 16,
  paddingRight: 35,
};

export const PaddingWithoutLabel = {
  paddingVertical: 8,
  paddingLeft: 16,
  paddingRight: 35,
};
