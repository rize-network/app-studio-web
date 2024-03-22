import { CSSProperties } from 'react';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines a type alias 'Size' which can be one of five string literal values representing size categories.
export type AvatarStyles = {
// Describes the basic shape of the AvatarStyles object, allowing for optional customization of container, image, and fallback styles.
  container?: CSSProperties;
// container property within AvatarStyles may hold CSS properties specific to the container element of an avatar.
  image?: CSSProperties;
// image property within AvatarStyles may hold CSS properties specific to the image element within the avatar container.
  fallback?: any;
// fallback property within AvatarStyles can be of any type, implying usage for alternative content when the image is not available.
};
