import React from 'react';
import { LoaderType, Size, Speed, TextPosition } from './Loader.type';
import { ViewProps } from 'app-studio';
// Defines the LoaderProps interface, extending from ViewProps excluding 'size', to configure the Loader component.
export interface LoaderProps extends Omit<ViewProps, 'size'> {
  // Optional children prop to pass React nodes inside the Loader component.
  children?: React.ReactNode;
  // Optional prop to define the color of the loader element.
  loaderColor?: string;
  // Defines the type of the loader based on the LoaderType enum.
  type?: LoaderType;
  // Optional prop for setting the color of the text displayed with the loader.
  textColor?: string;
  // Determines the position of the text relative to the loader from the TextPosition enum.
  textPosition?: TextPosition;
  // Sets the size of the loader, which can be a specific pixel number or a standard Size enum.
  size?: number | Size;
  // Controls the speed of the loader's animation, using the values from the Speed enum.
  speed?: Speed;
}
// Defines properties specific to the default spinner variant of the loader.
export interface DefaultSpinnerProps extends Omit<ViewProps, 'size'> {
  size?: number | Size;
  speed?: Speed;
  // Overrides the color for the default spinner loader variant.
  color?: string;
}
// Defines properties for the dotted variant of the loader component.
export interface DottedProps extends Omit<ViewProps, 'size'> {
  size?: number | Size;
  speed?: Speed;
  // Overrides the color for the dotted loader variant.
  color?: string;
}
// Defines properties for the quarter variant of the loader component.
export interface QuarterProps extends Omit<ViewProps, 'size'> {
  size?: number | Size;
  speed?: Speed;
  // Overrides the color for the quarter loader variant.
  color?: string;
}
