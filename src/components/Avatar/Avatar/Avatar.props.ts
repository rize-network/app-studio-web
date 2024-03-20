import { AvatarStyles, Size } from './Avatar.type';

export interface AvatarProps {
  src: string;
  size?: Size;
  fallback?: string;
  styles?: AvatarStyles;
}

export interface AvatarViewProps extends AvatarProps {
  imageError: boolean;
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
}
