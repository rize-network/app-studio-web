import { CSSProperties } from 'react';

import { Position, Shape, Size } from './Message.type';

export const ContainerShapes: Record<Shape, CSSProperties> = {
  sharp: { borderRadius: 0 },
  rounded: { borderRadius: 4 },
};
export const OverlayAlignments: Record<Position, CSSProperties> = {
  center: { justifyContent: 'center', alignItems: 'center' },
  top: { justifyContent: 'center' },
  right: { justifyContent: 'flex-end', alignItems: 'center' },
  bottom: { justifyContent: 'center', alignItems: 'flex-end' },
  left: { alignItems: 'center' },
};

export const HeaderIconSizes: Record<Size, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};
