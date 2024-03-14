import { Size } from './Avatar.type';

export const AvatarSizeMap: Record<Size, number> = {
  xs: 24, // Extra small: 24px - Ideal for very small spaces or subtle user hints.
  sm: 32, // Small: 32px - Good for less prominent user interfaces or smaller devices.
  md: 48, // Medium: 48px - Standard size for most use cases.
  lg: 64, // Large: 64px - Great for featured profiles or more prominent user displays.
  xl: 80, // Extra large: 80px - Best for main profile images or key user interfaces.
};
