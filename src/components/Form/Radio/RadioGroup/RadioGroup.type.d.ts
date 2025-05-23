/**
 * RadioGroup Types
 *
 * Defines the types for the RadioGroup component following the design guidelines.
 */

import { ViewProps } from 'app-studio';

/**
 * Style customization options for the RadioGroup component
 */
export type RadioGroupStyles = {
  container?: ViewProps;
  label?: ViewProps;
  helperText?: ViewProps;
};

/**
 * Direction options for the RadioGroup component
 */
export type Direction = 'horizontal' | 'vertical';
