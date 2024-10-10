import { Size, Speed } from './Loader.type';
// Defines a mapping of spinning speed labels to their respective duration in seconds for the Loader component animations.
export const DefaultEllipsisSpeeds: Record<Speed, number> = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.8,
};
// Sets up a scale of sizes, mapping size labels to numerical values to be used for Loader component dimensions.
export const DefaultSizes: Record<Size, number> = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 26,
  xl: 30,
  '2xl': 40,
  '3xl': 50,
  '4xl': 60,
  '5xl': 70,
  '6xl': 80,
};
// Specifies a mapping of spinning speed labels to numerical millisecond values, determining the speed of the Loader component's animation cycles.
export const DefaultSpeeds: Record<Speed, number> = {
  fast: 50,
  normal: 100,
  slow: 300,
};
