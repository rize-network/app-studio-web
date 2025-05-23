/**
 * Gradient Props
 *
 * Defines the props for the Gradient component following the design guidelines.
 */

import { ViewProps } from 'app-studio';
import {
  GradientType,
  LinearDirection,
  RadialShape,
  RadialPosition,
  ColorStop,
  GradientStyles,
} from './Gradient.type';

/**
 * Props for the Gradient component
 */
export interface GradientProps extends Omit<ViewProps, 'colors'> {
  /**
   * Type of gradient (linear, radial, or conic)
   * @default 'linear'
   */
  type?: GradientType;

  /**
   * Direction for linear gradients
   * @default 'to-right'
   */
  direction?: LinearDirection;

  /**
   * Shape for radial gradients
   * @default 'circle'
   */
  shape?: RadialShape;

  /**
   * Position for radial gradients
   * @default 'center'
   */
  position?: RadialPosition;

  /**
   * Starting color for simple two-color gradients
   */
  from?: string;

  /**
   * Ending color for simple two-color gradients
   */
  to?: string;

  /**
   * Array of color stops for multi-color gradients
   * Takes precedence over from/to if provided
   */
  colors?: ColorStop[];

  /**
   * Whether to animate the gradient
   * @default false
   */
  animate?: boolean;

  /**
   * Animation duration in seconds
   * @default 3
   */
  animationDuration?: number;

  /**
   * Children to render inside the gradient
   */
  children?: React.ReactNode;

  /**
   * Custom styles for the gradient
   */
  views?: GradientStyles;
}
