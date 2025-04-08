import { ViewProps } from 'app-studio';
import { Orientation, Variant, Thickness } from './Separator.type';

export const SeparatorOrientations: Record<Orientation, ViewProps> = {
  horizontal: {
    width: '100%',
    height: 'auto',
  },
  vertical: {
    width: 'auto',
    height: '100%',
  },
};

export const SeparatorVariants: Record<Variant, string> = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
};

export const SeparatorThicknesses: Record<Thickness, string> = {
  thin: '1px',
  medium: '2px',
  thick: '4px',
};
