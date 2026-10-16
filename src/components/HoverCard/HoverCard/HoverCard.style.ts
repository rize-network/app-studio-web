import { ViewProps } from 'app-studio';
import { CSSProperties } from 'react';
import { Alignment, Side } from './HoverCard.type';
// This object stores functions that define the default positioning styles for the HoverCard content relative to its trigger, for each possible side.
export const ContentPositions: Record<
  Side,
  (align: Alignment, sideOffset?: number) => ViewProps
> = {
  // Calculates the CSS styles to position the HoverCard content above the trigger, adjusting for horizontal alignment and a vertical offset.
  top: (align, sideOffset = 8) => ({
    position: 'absolute',
    bottom: '100%',
    marginBottom: `${sideOffset}px`,
    ...(align === 'start' && { left: 0 }),
    ...(align === 'center' && { left: '50%', transform: 'translateX(-50%)' }),
    ...(align === 'end' && { right: 0 }),
  }),
  // Calculates the CSS styles to position the HoverCard content to the right of the trigger, adjusting for vertical alignment and a horizontal offset.
  right: (align, sideOffset = 8) => ({
    position: 'absolute',
    left: '100%',
    marginLeft: `${sideOffset}px`,
    ...(align === 'start' && { top: 0 }),
    ...(align === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
    ...(align === 'end' && { bottom: 0 }),
  }),
  // Calculates the CSS styles to position the HoverCard content below the trigger, adjusting for horizontal alignment and a vertical offset.
  bottom: (align, sideOffset = 8) => ({
    position: 'absolute',
    top: '100%',
    marginTop: `${sideOffset}px`,
    ...(align === 'start' && { left: 0 }),
    ...(align === 'center' && { left: '50%', transform: 'translateX(-50%)' }),
    ...(align === 'end' && { right: 0 }),
  }),
  // Calculates the CSS styles to position the HoverCard content to the left of the trigger, adjusting for vertical alignment and a horizontal offset.
  left: (align, sideOffset = 8) => ({
    position: 'absolute',
    right: '100%',
    marginRight: `${sideOffset}px`,
    ...(align === 'start' && { top: 0 }),
    ...(align === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
    ...(align === 'end' && { bottom: 0 }),
  }),
};
// This function dynamically calculates and returns the CSS styles required to position the HoverCard content, considering the trigger's position, preferred side, alignment, and offset.
export const getContentPositionStyles = (
  // Parameter: `triggerRect` - The bounding rectangle of the trigger element, used to determine the content's position relative to the trigger.
  triggerRect: DOMRect | null,
  // Parameter: `side` - Specifies the desired side ('top', 'right', 'bottom', 'left') where the HoverCard content should appear relative to the trigger.
  side: Side = 'bottom',
  // Parameter: `align` - Determines the alignment ('start', 'center', 'end') of the HoverCard content along the specified side.
  align: Alignment = 'center',
  // Parameter: `sideOffset` - The distance in pixels between the trigger element and the HoverCard content.
  sideOffset: number = 8
): CSSProperties => {
  // Checks if the trigger's bounding rectangle is available. If not, the content cannot be positioned correctly.
  if (!triggerRect) {
    // Returns a hidden, non-interactive style object if `triggerRect` is missing, preventing the HoverCard from displaying improperly.
    return { position: 'absolute', opacity: 0, pointerEvents: 'none' };
  }
  // Initializes an object to accumulate the CSS styles that will be applied to the HoverCard content.
  const styles: CSSProperties = {
    position: 'absolute',
    zIndex: 1000,
  };
  // Uses a switch statement to apply specific positioning logic based on the chosen side ('top', 'right', 'bottom', 'left').
  switch (side) {
    // Applies CSS rules to position the content above the trigger, adjusting its horizontal alignment and vertical margin.
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
    // Applies CSS rules to position the content to the right of the trigger, adjusting its vertical alignment and horizontal margin.
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
    // Applies CSS rules to position the content below the trigger, adjusting its horizontal alignment and vertical margin.
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
    // Applies CSS rules to position the content to the left of the trigger, adjusting its vertical alignment and horizontal margin.
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
  // Returns the complete set of calculated CSS styles for the HoverCard content.
  return styles;
};
