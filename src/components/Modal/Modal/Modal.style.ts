import { ViewProps } from 'app-studio';
import { Shape, Size } from './Modal.type';

export const ContainerShapes: Record<Shape, ViewProps> = {
  sharp: { borderRadius: 0 },
  rounded: { borderRadius: 4 },
};
export const OverlayAlignments: Record<string, ViewProps> = {
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
