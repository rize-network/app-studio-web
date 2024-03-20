import { CSSProperties } from 'react';
import { Shape, Size } from './Badge.type';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Define a type that enumerates all possible sizes for badges.
export const BadgeSizes: Record<Size, CSSProperties> = {
  xs: {
    // Create an object that maps badge sizes to their corresponding CSS properties, defining minimum width, height and padding for each size.
    minWidth: '20px',
    height: '20px',
    padding: '0 6px',
  },
  sm: {
    minWidth: '24px',
    height: '24px',
    padding: '0 8px',
  },
  md: {
    minWidth: '28px',
    height: '28px',
    padding: '0 10px',
  },
  // Create an object that maps badge shapes to their corresponding border-radius values to define the curvature of the badge's corners.
  lg: {
    minWidth: '32px',
    height: '32px',
    padding: '0 12px',
  },
  // Create an object defining CSS properties for positioning badges in the corners of a relative container, using absolute positioning.
  xl: {
    minWidth: '36px',
    height: '36px',
    padding: '0 14px',
  },
};
export const BadgeShapes: Record<Shape, number | string> = {
  sharp: 0,
  rounded: 4,
  pillShaped: 24,
};
export const PositionStyles: { [key: string]: React.CSSProperties } = {
  'top-right': { top: 0, right: 0, position: 'absolute' },
  'top-left': { top: 0, left: 0, position: 'absolute' },
  'bottom-right': { bottom: 0, right: 0, position: 'absolute' },
  'bottom-left': { bottom: 0, left: 0, position: 'absolute' },
};
