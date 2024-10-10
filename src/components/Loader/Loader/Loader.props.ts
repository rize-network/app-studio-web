import React from 'react';
import { LoaderType, Size, Speed, TextPosition } from './Loader.type';
import { ViewProps } from 'app-studio';
export interface LoaderProps extends Omit<ViewProps, 'size'> {
  children?: React.ReactNode;
  loaderColor?: string;
  type?: LoaderType;
  textColor?: string;
  textPosition?: TextPosition;
  size?: number | Size;
  speed?: Speed;
}
export interface DefaultSpinnerProps extends Omit<ViewProps, 'size'> {
  size?: number | Size;
  speed?: Speed;
  color?: string;
}
export interface DottedProps extends Omit<ViewProps, 'size'> {
  size?: number | Size;
  speed?: Speed;
  color?: string;
}
export interface QuarterProps extends Omit<ViewProps, 'size'> {
  size?: number | Size;
  speed?: Speed;
  color?: string;
}
