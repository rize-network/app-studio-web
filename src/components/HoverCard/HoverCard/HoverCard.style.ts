import { ViewProps } from 'app-studio';
import { CSSProperties } from 'react';
import { Alignment, Side } from './HoverCard.type';

// Basic positioning styles for the content
export const ContentPositions: Record<
  Side,
  (align: Alignment, sideOffset?: number) => ViewProps
> = {
  top: (align, sideOffset = 8) => ({
    position: 'absolute',
    bottom: '100%',
    marginBottom: `${sideOffset}px`,
    ...(align === 'start' && { left: 0 }),
    ...(align === 'center' && { left: '50%', transform: 'translateX(-50%)' }),
    ...(align === 'end' && { right: 0 }),
  }),
  right: (align, sideOffset = 8) => ({
    position: 'absolute',
    left: '100%',
    marginLeft: `${sideOffset}px`,
    ...(align === 'start' && { top: 0 }),
    ...(align === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
    ...(align === 'end' && { bottom: 0 }),
  }),
  bottom: (align, sideOffset = 8) => ({
    position: 'absolute',
    top: '100%',
    marginTop: `${sideOffset}px`,
    ...(align === 'start' && { left: 0 }),
    ...(align === 'center' && { left: '50%', transform: 'translateX(-50%)' }),
    ...(align === 'end' && { right: 0 }),
  }),
  left: (align, sideOffset = 8) => ({
    position: 'absolute',
    right: '100%',
    marginRight: `${sideOffset}px`,
    ...(align === 'start' && { top: 0 }),
    ...(align === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
    ...(align === 'end' && { bottom: 0 }),
  }),
};

// Note: Advanced positioning logic has been replaced with intelligent viewport-aware
// positioning in the HoverCard component that automatically chooses optimal placement
// based on available space and prevents content from going off-screen.

// Legacy positioning function - kept for backward compatibility if needed
export const getContentPositionStyles = (
  triggerRect: DOMRect | null,
  side: Side = 'bottom',
  align: Alignment = 'center',
  sideOffset: number = 8
): CSSProperties => {
  if (!triggerRect) {
    return { position: 'absolute', opacity: 0, pointerEvents: 'none' }; // Hide if trigger isn't measured
  }

  const styles: CSSProperties = {
    position: 'absolute',
    zIndex: 1000,
  };

  // Calculate position based on side and alignment
  switch (side) {
    case 'top':
      styles.bottom = '100%';
      styles.marginBottom = sideOffset;
      if (align === 'start') {
        styles.left = 0;
      } else if (align === 'center') {
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
      } else if (align === 'end') {
        styles.right = 0;
      }
      break;
    case 'right':
      styles.left = '100%';
      styles.marginLeft = sideOffset;
      if (align === 'start') {
        styles.top = 0;
      } else if (align === 'center') {
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
      } else if (align === 'end') {
        styles.bottom = 0;
      }
      break;
    case 'bottom':
      styles.top = '100%';
      styles.marginTop = sideOffset;
      if (align === 'start') {
        styles.left = 0;
      } else if (align === 'center') {
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
      } else if (align === 'end') {
        styles.right = 0;
      }
      break;
    case 'left':
      styles.right = '100%';
      styles.marginRight = sideOffset;
      if (align === 'start') {
        styles.top = 0;
      } else if (align === 'center') {
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
      } else if (align === 'end') {
        styles.bottom = 0;
      }
      break;
  }

  return styles;
};
