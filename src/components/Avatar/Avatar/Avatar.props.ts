import { AvatarStyles, Size } from './Avatar.type';
// Imports custom type definitions for styling and size from Avatar.type module, to be used in defining the props for the Avatar component.
export interface AvatarProps {
  src: string;
// Defines the AvatarProps interface specifying the properties that can be passed to the Avatar component.
  size?: Size;
// src is a string representing the source URL of the avatar image.
  fallback?: string;
// size is an optional property of type Size to set the size of the avatar.
  styles?: AvatarStyles;
// fallback is an optional string for a fallback image URL, in case the src fails to load.
}
// styles is an optional property for custom styling of the Avatar component, following the AvatarStyles type.
export interface AvatarViewProps extends AvatarProps {
  imageError: boolean;
// Defines the AvatarViewProps interface extending AvatarProps to include additional properties for the view logic.
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
// imageError is a boolean flag to indicate if there has been an error loading the image.
}
// setImageError is a function from React's useState hook to toggle the imageError state.
