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
    transition: 'background-color 0.15s ease',
  },
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'color.gray.200',
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
    _hover: {
      borderColor: 'color.gray.300',
    },
  },
  filled: {
    backgroundColor: 'color.gray.50',
    transition: 'background-color 0.15s ease',
    _hover: {
      backgroundColor: 'color.gray.100',
    },
  },
};

/**
 * Accordion trigger styles matching shadcn/ui patterns
 */
export const AccordionTriggerStyles: ViewProps = {
  transition: 'background-color 0.15s ease, color 0.15s ease',
  _hover: {
    backgroundColor: 'color.gray.50',
  },
  _focus: {
    outline: 'none',
    backgroundColor: 'color.gray.100',
  },
  _focusVisible: {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.1)',
  },
};

/**
 * Accordion content styles with smooth animation
 */
export const AccordionContentStyles: ViewProps = {
  transition: 'height 0.2s ease, opacity 0.2s ease',
};
