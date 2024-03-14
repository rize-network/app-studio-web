import { CSSProperties } from 'react';

import { Shape, Size } from './Badge.type';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const BadgeSizes: Record<Size, CSSProperties> = {
  xs: {
    minWidth: '20px', // Minimum width to ensure content fits
    height: '20px',
    padding: '0 6px', // Horizontal padding
    borderRadius: '10px', // Fully rounded corners for circular shape if content is short
  },
  sm: {
    minWidth: '24px',
    height: '24px',
    padding: '0 8px',
    borderRadius: '12px',
  },
  md: {
    minWidth: '28px',
    height: '28px',
    padding: '0 10px',
    borderRadius: '14px',
  },
  lg: {
    minWidth: '32px',
    height: '32px',
    padding: '0 12px',
    borderRadius: '16px',
  },
  xl: {
    minWidth: '36px',
    height: '36px',
    padding: '0 14px',
    borderRadius: '18px',
  },
};

export const BadgeShapes: Record<Shape, number | string> = {
  sharp: 0,
  rounded: 4,
  pillShaped: 24,
};

// Example of how you might adjust styles based on the 'position' prop
export const PositionStyles: { [key: string]: React.CSSProperties } = {
  'top-right': { top: 0, right: 0 },
  'top-left': { top: 0, left: 0 },
  'bottom-right': { bottom: 0, right: 0 },
  'bottom-left': { bottom: 0, left: 0 },
};
