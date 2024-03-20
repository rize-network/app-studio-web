import { CSSProperties } from 'react';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines an alias 'Size' for the specific set of string literals representing different sizes for a component.
export type AvatarStyles = {
  // Declares a type 'AvatarStyles' describing the possible styles that can be applied to different parts of an Avatar component, such as the container, image, and a fallback style.
  container?: CSSProperties;
  image?: CSSProperties;
  fallback?: any;
};
