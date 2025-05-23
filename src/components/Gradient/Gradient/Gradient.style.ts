/**
 * Gradient Styles
 *
 * Defines the styles for the Gradient component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import { ViewProps } from 'app-studio';
import {
  GradientType,
  LinearDirection,
  RadialShape,
  RadialPosition,
  ColorStop,
} from './Gradient.type';

/**
 * Maps direction strings to CSS gradient directions
 */
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

/**
 * Maps position strings to CSS position values
 */
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

/**
 * Default color stops for different gradient types
 */
export const DefaultColorStops: Record<GradientType, ColorStop[]> = {
  linear: [
    { color: 'color.blue.500', position: '0%' },
    { color: 'color.purple.500', position: '100%' },
  ],
  radial: [
    { color: 'color.blue.500', position: '0%' },
    { color: 'color.purple.500', position: '100%' },
  ],
  conic: [
    { color: 'color.red.500', position: '0deg' },
    { color: 'color.yellow.500', position: '90deg' },
    { color: 'color.green.500', position: '180deg' },
    { color: 'color.blue.500', position: '270deg' },
    { color: 'color.red.500', position: '360deg' },
  ],
};

/**
 * Generates a CSS gradient string based on the provided parameters
 */
export const generateGradientString = (
  type: GradientType,
  colors: ColorStop[],
  direction?: LinearDirection,
  shape?: RadialShape,
  position?: RadialPosition
): string => {
  // Format color stops
  const colorStopsString = colors
    .map((stop) => `${stop.color} ${stop.position || ''}`)
    .join(', ');

  // Generate the appropriate gradient string based on type
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

/**
 * Animation styles for animated gradients using app-studio's animation system
 */
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
    transition: 'all 3s ease-in-out',
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

/**
 * Default styles for the Gradient component
 */
export const DefaultGradientStyles = {
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px', // 2 × 4px grid
    transition: 'all 0.2s ease',
  } as ViewProps,
  content: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
    padding: '16px', // 4 × 4px grid
  } as ViewProps,
};
