import React, { CSSProperties } from 'react';
import {
  Shape,
  Size,
  TextFieldStyles,
  Variant,
} from '../../../../Layout/configs/Input.type';
import { Elevation } from 'src/utils/elevation';
import { Shadow } from 'app-studio';

export interface ContentProps {
  /**
   * The color of the Content component.
   */
  color?: string;
  /**
   * Changes the color style of the field.
   */
  colorScheme?: string;
  /**
   * The content to be rendered inside the Content component.
   */
  children?: React.ReactNode;
  /**
   * Indicates whether the field has an error.
   */
  error?: boolean;
  /**
   * Indicates whether the field has label
   */
  isWithLabel?: boolean;
  /**
   * Determines whether the Content component is disabled. Default value is false.
   */
  isDisabled?: boolean;
  /**
   * Determines wheter the field is focused or not.
   */
  isFocused?: boolean;
  /**
   * Determines whether the Content component is currently being hovered over.
   */
  isHovered?: boolean;
  /**
   * Determines whether the Content component is read-only. Default value is false.
   */
  isReadOnly?: boolean;
  /**
   * The label associated with the Content component.
   */
  label?: string;
  /**
   * The default value of the field.
   */
  value?: string | Array<string> | number;
  /**
   * Changes the Input style
   */
  variant?: Variant;
  /**
   * The shape of the Content component.
   */
  shape?: Shape;
  /**
   * The size of the Content component. Default value is "md".
   */
  size?: Size;
  /**
   * CSS styles applied to the Content component. Default value is an empty object.
   */
  styles?: TextFieldStyles;
  /**
   * The shadow effect applied to the Content component.
   */
  shadow?: Shadow | Elevation | CSSProperties;
  /**
   * Additional properties and attributes for the field.
   */
  [x: string]: any;
}
