import { ViewProps } from 'app-studio';
import {
  GradientType,
  LinearDirection,
  RadialShape,
  RadialPosition,
  ColorStop,
} from './Gradient.type';
// Defines a mapping from common gradient direction keys to their corresponding CSS `linear-gradient` direction values.
export const DirectionMap: Record<string, string> = {
  'to-right': 'to right',
  'to-left': 'to left',
  'to-bottom': 'to bottom',
  'to-top': 'to top',
  'to-top-right': 'to top right',
  'to-top-left': 'to top left',
  'to-bottom-right': 'to bottom right',
  'to-bottom-left': 'to bottom left',
};
// Defines a mapping from common gradient position keys to their corresponding CSS `radial-gradient` or `conic-gradient` position values.
export const PositionMap: Record<string, string> = {
  center: 'center',
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  'top-right': 'top right',
  'top-left': 'top left',
  'bottom-right': 'bottom right',
  'bottom-left': 'bottom left',
};
// Provides default color stop configurations for various gradient types (linear, radial, conic), used when no specific color stops are provided.
export const DefaultColorStops: Record<GradientType, ColorStop[]> = {
  linear: [
    { color: 'color-blue-500', position: '0%' },
    { color: 'color-purple-500', position: '100%' },
  ],
  radial: [
    { color: 'color-blue-500', position: '0%' },
    { color: 'color-purple-500', position: '100%' },
  ],
  conic: [
    { color: 'color-red-500', position: '0deg' },
    { color: 'color-yellow-500', position: '90deg' },
    { color: 'color-green-500', position: '180deg' },
    { color: 'color-blue-500', position: '270deg' },
    { color: 'color-red-500', position: '360deg' },
  ],
};
// Generates a CSS gradient string (e.g., `linear-gradient`, `radial-gradient`, `conic-gradient`) based on the specified gradient type, colors, and other optional parameters.
// Parameters: `type` (GradientType) - The type of gradient to generate; `colors` (ColorStop[]) - An array of color stops defining the gradient's colors and positions; `direction` (LinearDirection, optional) - The direction for linear gradients; `shape` (RadialShape, optional) - The shape for radial gradients; `position` (RadialPosition, optional) - The position for radial or conic gradients.
// Steps: Iterates through color stops to format them; Uses a switch statement to construct the appropriate CSS gradient string based on the gradient type, applying default values for direction, shape, or position if not provided.
export const generateGradientString = (
  type: GradientType,
  colors: ColorStop[],
  direction?: LinearDirection,
  shape?: RadialShape,
  position?: RadialPosition
): string => {
  const colorStopsString = colors
    .map((stop) => `${stop.color} ${stop.position || ''}`)
    .join(', ');
  switch (type) {
    case 'linear':
      const dir =
        direction && DirectionMap[direction]
          ? DirectionMap[direction]
          : direction || 'to right';
      return `linear-gradient(${dir}, ${colorStopsString})`;
    case 'radial':
      const pos =
        position && PositionMap[position]
          ? PositionMap[position]
          : position || 'center';
      const shapeValue = shape || 'circle';
      return `radial-gradient(${shapeValue} at ${pos}, ${colorStopsString})`;
    case 'conic':
      const conicPos =
        position && PositionMap[position]
          ? PositionMap[position]
          : position || 'center';
      return `conic-gradient(from 0deg at ${conicPos}, ${colorStopsString})`;
    default:
      return `linear-gradient(to right, ${colorStopsString})`;
  }
};
// Contains predefined animation properties and keyframes for different gradient types (linear, radial, conic), designed to create dynamic visual effects.
export const GradientAnimations = {
  linear: {
    backgroundSize: '200% 200%',
    transition: 'background-position 3s ease-in-out',
    animate: {
      from: { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      to: { backgroundPosition: '0% 50%' },
    },
  },
  radial: {
    backgroundSize: '100% 100%',
    transition:
      'background-position 3s ease-in-out, background-size 3s ease-in-out',
    animate: {
      from: { backgroundPosition: 'center', backgroundSize: '100% 100%' },
      '50%': { backgroundSize: '120% 120%' },
      to: { backgroundPosition: 'center', backgroundSize: '100% 100%' },
    },
  },
  conic: {
    transition: 'transform 3s linear',
    animate: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
  },
};
// Defines default CSS styles for the gradient component's container and content elements, ensuring a consistent base appearance and layout.
export const DefaultGradientStyles = {
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    transition: 'border-radius 0.2s ease, opacity 0.2s ease',
  } as ViewProps,
  content: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
    padding: '16px',
  } as ViewProps,
};
