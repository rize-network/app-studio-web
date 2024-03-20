import React from 'react';

import { LoaderType, Size, Speed, TextPosition } from './Loader.type';

/**
 * Props for the Loader component.
 */
export interface LoaderProps {
  /**
   * The text content.
   */
  children?: React.ReactNode;

  /**
   * The color of the loader.
   */
  loaderColor?: string;

  /**
   * The type of loader.
   */
  type?: LoaderType;

  /**
   * The color of the text.
   */
  textColor?: string;

  /**
   * The position where to place the children.
   */
  textPosition?: TextPosition;

  /**
   * The width and height of the loader.
   */
  size?: number | Size;

  /**
   * The rotation speed of the loader.
   */
  speed?: Speed;

  /**
   * Additional properties.
   */
  [x: string]: any;
}

export interface DefaultSpinnerProps {
  /**
   * To set the spinner height and width
   */
  size?: number | Size;
  /**
   * To set the rate at which the spinner moves
   */
  speed?: Speed;
  /**
   * To change the spinner color
   */
  color?: string;
  /**
   * Other props
   *  */
  [x: string]: any;
}

export interface DottedProps {
  /**
   * To set the spinner height and width
   */
  size?: number | Size;
  /**
   * To set the rate at which the spinner moves
   */
  speed?: Speed;
  /**
   * To change the spinner color
   */
  color?: string;
  /**
   * Other properties
   */
  [x: string]: any;
}

export interface QuarterProps {
  /**
   * To set the spinner height and width
   */
  size?: number | Size;
  /**
   * To set the rate at which the spinner moves
   */
  speed?: Speed;
  /**
   * To change the spinner color
   */
  color?: string;
  /**
   *Other properties
   */
  [x: string]: any;
}
