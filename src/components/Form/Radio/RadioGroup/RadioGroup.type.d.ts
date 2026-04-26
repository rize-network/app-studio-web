import { ViewProps } from 'app-studio';
// Defines the type for custom styling options available for various parts of the RadioGroup component.
export type RadioGroupStyles = {
  // Specifies styling properties for the main container wrapping the RadioGroup.
  container?: ViewProps;
  // Specifies styling properties for the label associated with the RadioGroup.
  label?: ViewProps;
  // Specifies styling properties for the helper text displayed below the RadioGroup.
  helperText?: ViewProps;
};
// Defines the possible orientations for arranging radio buttons, allowing either horizontal or vertical display.
export type Direction = 'horizontal' | 'vertical';
