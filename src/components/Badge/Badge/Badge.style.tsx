import { ViewProps } from 'app-studio';
import { Shape, Size } from './Badge.type';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const BadgeSizes: Record<Size, ViewProps> = {
  xs: {
    minWidth: '20px', // Minimum width to ensure content fits
    height: '20px',
    padding: '0 6px', // Horizontal padding
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
  lg: {
    minWidth: '32px',
    height: '32px',
    padding: '0 12px',
  },
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
