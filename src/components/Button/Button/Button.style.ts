import { CSSProperties } from 'react';

import { Shape, Size } from './Button.type';

export const ButtonSizes: Record<Size, CSSProperties> = {
  xs: {
    width: 79,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    fontWeight: 600,
    fontSize: 'xs',
    lineHeight: 16,
    letterSpacing: 1.25,
  },
  sm: {
    width: 128,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    fontWeight: 600,
    fontSize: 'sm',
    lineHeight: 20,
    letterSpacing: 1.25,
  },
  md: {
    width: 144,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18,
    fontWeight: 600,
    fontSize: 'md',
    lineHeight: 24,
    letterSpacing: 1.25,
  },
  lg: {
    width: 178,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 22,
    paddingRight: 22,
    fontWeight: 600,
    fontSize: 'lg',
    lineHeight: 24,
    letterSpacing: 1.25,
  },
  xl: {
    width: 220,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 26,
    paddingRight: 26,
    fontWeight: 600,
    fontSize: 'xl',
    lineHeight: 24,
    letterSpacing: 1.25,
  },
};

export const ButtonShapes: Record<Shape, number | string> = {
  sharp: 0,
  rounded: 4,
  pillShaped: 24,
};

export const IconSizes: Record<Size, CSSProperties> = {
  xs: {
    width: 24,
    height: 24,
    padding: 12,
  },
  sm: {
    width: 24,
    height: 24,
    padding: 15,
  },
  md: {
    width: 36,
    height: 36,
    padding: 15,
  },
  lg: {
    width: 36,
    height: 36,
    padding: 18,
  },
  xl: {
    width: 36,
    height: 36,
    padding: 24,
  },
};
