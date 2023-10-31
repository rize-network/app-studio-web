import { Size, Speed } from './Loader.type';

export const DefaultEllipsisSpeeds: Record<Speed, number> = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.8,
};

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
export const DefaultSpeeds: Record<Speed, number> = {
  fast: 50,
  normal: 100,
  slow: 300,
};
