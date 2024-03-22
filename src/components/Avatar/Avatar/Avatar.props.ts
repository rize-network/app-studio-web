import { AvatarStyles, Size } from './Avatar.type';
export interface AvatarProps {
  // Defines an interface 'AvatarProps' for the Avatar component props. This includes the image source URL, an optional size from a predefined set of sizes, an optional fallback URL for when the image source fails, and optional custom styles.
  src: string;
  size?: Size;
  fallback?: string;
  styles?: AvatarStyles;
  // Extends 'AvatarProps' to include 'AvatarViewProps' for the view-specific properties. This adds an 'imageError' flag to signal when an image has failed to load and a 'setImageError' function to update this flag.
}
// The 'setImageError' function uses React.Dispatch to ensure that the state update is strongly typed with 'React.SetStateAction', ensuring type safety when updating the state.
export interface AvatarViewProps extends AvatarProps {
  imageError: boolean;
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
}
