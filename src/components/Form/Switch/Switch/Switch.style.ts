import { CSSProperties } from 'react';
import { Size } from './Switch.type';
// Defines a mapping of size types to their respective knob style properties, specifying the height and width for various predefined sizes.
export const KnobSizes: Record<Size, CSSProperties> = {
  xs: { height: 6, width: 6 },
  sm: { height: 9, width: 9 },
  md: { height: 12, width: 12 },
  lg: { height: 15, width: 15 },
  xl: { height: 18, width: 18 },
  '2xl': { height: 21, width: 21 },
  '3xl': { height: 24, width: 24 },
  '4xl': { height: 27, width: 27 },
  '5xl': { height: 30, width: 30 },
  '6xl': { height: 33, width: 33 },
};
// Specifies the dimensions of the switch's slider for each predefined size by mapping them to the height and width CSS properties.
export const SliderSizes: Record<Size, CSSProperties> = {
  xs: {
    height: 16,
    width: 28,
  },
  sm: {
    height: 20,
    width: 36,
  },
  md: {
    height: 24,
    width: 44,
  },
  lg: {
    height: 28,
    width: 52,
  },
  xl: {
    height: 32,
    width: 60,
  },
  '2xl': {
    height: 36,
    width: 68,
  },
  '3xl': {
    height: 40,
    width: 76,
  },
  '4xl': {
    height: 44,
    width: 84,
  },
  '5xl': {
    height: 48,
    width: 92,
  },
  '6xl': {
    height: 52,
    width: 100,
  },
};
// Associates each size type with corresponding padding values for vertical and horizontal spacing, used to adjust the position of the elements within the switch.
export const SliderPadding: Record<Size, Record<string, number>> = {
  xs: { paddingVertical: 0, paddingHorizontal: 2 },
  sm: { paddingVertical: 0, paddingHorizontal: 3 },
  md: { paddingVertical: 0, paddingHorizontal: 5 },
  lg: { paddingVertical: 0, paddingHorizontal: 6 },
  xl: { paddingVertical: 0, paddingHorizontal: 8 },
  '2xl': { paddingVertical: 0, paddingHorizontal: 9 },
  '3xl': { paddingVertical: 0, paddingHorizontal: 10 },
  '4xl': { paddingVertical: 0, paddingHorizontal: 13 },
  '5xl': { paddingVertical: 0, paddingHorizontal: 15 },
  '6xl': { paddingVertical: 0, paddingHorizontal: 16 },
};
