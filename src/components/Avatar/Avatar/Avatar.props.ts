import { AvatarStyles, Size } from './Avatar.type';
// Defines the properties for the Avatar component.
export interface AvatarProps {
  // Source URL for the avatar image.
  src: string;
  // Optional size of the avatar, predefined in 'Size' type.
  size?: Size;
  // URL or path for the fallback image if the source fails to load.
  fallback?: string;
  // Optional custom styles for the avatar, defined by 'AvatarStyles'.
  styles?: AvatarStyles;
}
// Extends 'AvatarProps' with additional view-related properties.
export interface AvatarViewProps extends AvatarProps {
  // Signals whether there was an error when loading the avatar image.
  imageError: boolean;
  // Function to change the state of image load error.
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
}
