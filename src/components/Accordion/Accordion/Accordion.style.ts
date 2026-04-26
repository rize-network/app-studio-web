import { ViewProps } from 'app-studio';
import { Shape, Variant } from './Accordion.type';
// Defines styling for different accordion shapes, mapping shape types to specific border radius properties.
export const AccordionShapes: Record<Shape, ViewProps> = {
  // Style for the 'square' shape, setting a border radius of 0.
  square: { borderRadius: 0 },
  // Style for the 'rounded' shape, applying a border radius of 8 pixels.
  rounded: { borderRadius: 8 },
};
// Defines styling variations for the accordion component, mapping variant types to specific background, border, and transition properties.
export const AccordionVariants: Record<Variant, ViewProps> = {
  // Styles for the default variant, featuring a transparent background and no border.
  default: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    transition: 'background-color 0.15s ease',
  },
  // Styles for the outline variant, including a border, border color, and hover effects.
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
    _hover: {
      borderColor: 'color-gray-300',
    },
  },
  // Styles for the filled variant, providing a background color and hover effects.
  filled: {
    backgroundColor: 'color-gray-50',
    transition: 'background-color 0.15s ease',
    _hover: {
      backgroundColor: 'color-gray-100',
    },
  },
};
// Defines styles for the accordion trigger element, including transition effects for hover and focus states.
export const AccordionTriggerStyles: ViewProps = {
  transition: 'background-color 0.15s ease, color 0.15s ease',
  _hover: {
    backgroundColor: 'color-gray-50',
  },
  _focus: {
    outline: 'none',
    backgroundColor: 'color-gray-100',
  },
  _focusVisible: {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.1)',
  },
};
// Defines styles for the accordion content area, primarily handling transition effects for height and opacity during expansion/collapse.
export const AccordionContentStyles: ViewProps = {
  transition: 'height 0.2s ease, opacity 0.2s ease',
};
