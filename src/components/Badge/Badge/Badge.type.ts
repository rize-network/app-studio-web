import { CSSProperties } from 'react';
export type Shape = 'sharp' | 'rounded' | 'pillShaped';
// Defines possible values for the shape of a UI component such as buttons or badges.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Specifies available sizes for UI elements, catering to a range of scalability from extra small to extra large.
export type Variant = 'filled' | 'outline' | 'link' | 'ghost';
// Determines the styling variants a UI component can have, which could include filled, outlined, or ghost styles among others.
export type Position =
  // Lists possible positions for UI elements that can be placed in one of the corners of a container, like notification badges.
  | 'top-right'
  | 'top-left'
  // Describes the style properties available for badge components, where container styles the outer part and text styles the inner content.
  | 'bottom-right'
  | 'bottom-left';
export type BadgeStyles = {
  container?: CSSProperties;
  text?: any;
};
