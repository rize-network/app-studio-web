import { ViewProps } from 'app-studio';
// Defines the possible types of gradients, including linear, radial, and conic.
export type GradientType = 'linear' | 'radial' | 'conic';
// Specifies the allowed directions for a linear gradient, ranging from standard compass points to custom string values.
export type LinearDirection =
  | 'to-right'
  | 'to-left'
  | 'to-bottom'
  | 'to-top'
  | 'to-top-right'
  | 'to-top-left'
  | 'to-bottom-right'
  | 'to-bottom-left'
  | string;
// Defines the possible shapes for a radial gradient, either a circle or an ellipse.
export type RadialShape = 'circle' | 'ellipse';
// Specifies the starting position for a radial gradient, using keywords or custom string values.
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
  | string;
// Defines an individual color stop in a gradient, combining a color value and an optional position.
export interface ColorStop {
  // The color value for this specific stop in the gradient.
  color: string;
  // The optional position of the color stop, defining where the color transition occurs.
  position?: string | number;
}
// Defines custom styles for various parts of the Gradient component, leveraging standard ViewProps.
export interface GradientStyles {
  // Optional style properties for the main container element of the gradient.
  container?: ViewProps;
  // Optional style properties for the content area within the gradient component.
  content?: ViewProps;
}
