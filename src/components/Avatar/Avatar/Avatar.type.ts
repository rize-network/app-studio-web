import { ViewProps } from 'app-studio';

// Defines Avatar size options as a predefined set of string literals for consistent usage across the application
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Begins the declaration of an object type that specifies styling properties for different parts of the Avatar component
export type AvatarStyles = {
  // Optional CSSProperties object for customizing the container element of the Avatar
  container?: ViewProps;
  // Optional CSSProperties object for customizing the image element within the Avatar
  image?: ViewProps;
  // Optional any type property for defining a fallback display when the image is not available
  fallback?: ViewProps;
};
