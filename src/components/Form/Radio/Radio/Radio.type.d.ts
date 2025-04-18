/**
 * Radio Types
 *
 * Defines the types for the Radio component following the design guidelines.
 */

import { ViewProps } from 'app-studio';

/**
 * Size options for the Radio component
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Style customization options for the Radio component
 */
export type RadioStyles = {
  radio?: ViewProps;
  label?: ViewProps;
  infoText?: ViewProps;
};

/**
 * Variant options for the Radio component
 */
export type Variant = 'selected' | 'unselected';
