import { ViewProps } from 'app-studio';
import { Shape, Size, Variant } from './Card.type';

export const CardSizes: Record<Size, ViewProps> = {
  sm: {
    padding: '12px',
  },
  md: {
    padding: '16px',
  },
  lg: {
    padding: '24px',
  },
};

export const CardShapes: Record<Shape, number | string> = {
  sharp: 0,
  rounded: 8,
  pillShaped: 16,
};

export const CardVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'white',
    border: 'none',
  },
  outlined: {
    backgroundColor: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
  },
  elevated: {
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    border: 'none',
  },
};
