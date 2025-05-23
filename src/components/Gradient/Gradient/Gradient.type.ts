/**
 * Gradient Types
 *
 * Defines the types for the Gradient component following the design guidelines.
 */

import { ViewProps } from 'app-studio';

/**
 * Gradient type - linear or radial
 */
export type GradientType = 'linear' | 'radial' | 'conic';

/**
 * Direction for linear gradients
 * Can be a predefined direction or a custom angle in degrees
 */
export type LinearDirection =
  | 'to-right'
  | 'to-left'
  | 'to-bottom'
  | 'to-top'
  | 'to-top-right'
  | 'to-top-left'
  | 'to-bottom-right'
  | 'to-bottom-left'
  | string; // For custom angles like '45deg'

/**
 * Shape for radial gradients
 */
export type RadialShape = 'circle' | 'ellipse';

/**
 * Position for radial gradients
 */
export type RadialPosition =
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | string; // For custom positions like '20% 30%'

/**
 * Color stop for gradients
 */
export interface ColorStop {
  color: string;
  position?: string | number; // Percentage or absolute value
}

/**
 * Styles for the Gradient component
 */
export interface GradientStyles {
  container?: ViewProps;
  content?: ViewProps;
}
