import { ViewProps } from 'app-studio';
import {
  GradientType,
  LinearDirection,
  RadialShape,
  RadialPosition,
  ColorStop,
  GradientStyles,
} from './Gradient.type';
// Defines the properties available for the Gradient component, extending `ViewProps` but omitting its 'colors' property to provide a custom color definition.
export interface GradientProps extends Omit<ViewProps, 'colors'> {
  // Specifies the type of gradient to be rendered, such as linear or radial.
  type?: GradientType;
  // Defines the direction for a linear gradient, e.g., 'to top', 'to right'.
  direction?: LinearDirection;
  // Determines the shape of a radial gradient, such as 'circle' or 'ellipse'.
  shape?: RadialShape;
  // Sets the starting position for a radial gradient, e.g., 'center', 'farthest-corner'.
  position?: RadialPosition;
  // Specifies the starting color of the gradient, usually in hexadecimal or RGB format. Used if 'colors' array is not provided.
  from?: string;
  // Specifies the ending color of the gradient, usually in hexadecimal or RGB format. Used if 'colors' array is not provided.
  to?: string;
  // Defines an array of color stops to create a multi-color gradient, providing more granular control over color transitions.
  colors?: ColorStop[];
  // Controls whether the gradient should animate its colors or position over time.
  animate?: boolean;
  // Sets the duration of the gradient animation in milliseconds.
  animationDuration?: number;
  // Allows rendering of child components or elements within the gradient container.
  children?: React.ReactNode;
  // Provides custom styles for different parts of the gradient component, allowing for theme integration or specific visual adjustments.
  views?: GradientStyles;
}
