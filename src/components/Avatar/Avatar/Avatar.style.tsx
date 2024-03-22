import { Size } from './Avatar.type';
// This import statement brings in the 'Size' type from the 'Avatar.type' file, which is probably an enumeration or set of predefined string sizes that 'AvatarSizeMap' uses as keys.
export const AvatarSizeMap: Record<Size, number> = {
// Exporting a constant 'AvatarSizeMap' which is a mapping from the 'Size' type to numerical values. This map defines specific numeric sizes for different avatar size variants.
  xs: 24,
// Defines an extra-small avatar size as 24 pixels.
  sm: 32,
// Defines a small avatar size as 32 pixels.
  md: 48,
// Defines a medium avatar size as 48 pixels.
  lg: 64,
// Defines a large avatar size as 64 pixels.
  xl: 80,
// Defines an extra-large avatar size as 80 pixels. This mapping is essential for providing consistent avatar sizes across the application based on the size designation (xs, sm, md, lg, xl).
};
