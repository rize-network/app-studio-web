import { Size } from './Avatar.type';
// Import the 'Size' type which likely enumerates possible size labels for avatar components.
export const AvatarSizeMap: Record<Size, number> = {
  // Define 'AvatarSizeMap' as an object that maps 'Size' labels to numeric pixel values, setting specific dimensions for different avatar sizes.
  xs: 24,
  // Map 'xs' (extra small) size to 24 pixels.
  sm: 32,
  // Map 'sm' (small) size to 32 pixels.
  md: 48,
  // Map 'md' (medium) size to 48 pixels.
  lg: 64,
  // Map 'lg' (large) size to 64 pixels.
  xl: 80,
  // Map 'xl' (extra large) size to 80 pixels. This mapping setup helps maintain consistency in avatar sizing across the application.
};
