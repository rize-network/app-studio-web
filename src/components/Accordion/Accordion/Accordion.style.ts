import { ViewProps } from 'app-studio';
import { Shape, Variant } from './Accordion.type';

export const AccordionShapes: Record<Shape, ViewProps> = {
  sharp: { borderRadius: 0 },
  rounded: { borderRadius: 8 },
};

export const AccordionVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
  },
  filled: {
    backgroundColor: 'color.gray.50',
  },
};
