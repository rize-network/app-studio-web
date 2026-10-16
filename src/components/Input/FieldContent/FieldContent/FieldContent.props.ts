import React from 'react';
import { Shape, Size, TextFieldStyles, Variant } from '../../Input.type';
import { Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';

export interface ContentProps extends Omit<ViewProps, 'size' | 'shadow'> {
  /**
   * Shadow applied to the field shell. Accepts the design-system primitives
   * (boolean / number / Shadow), the consumer's elevation token, or a raw
   * ViewProps-shaped style object used as a shadow descriptor.
   */
  shadow?: boolean | number | Shadow | Elevation | ViewProps;
  /**
   * The color of the Content component.
   */
  color?: string;
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
  showLabel?: boolean;
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
   * The default value of the field. Accepts the same shape as
   * HTMLInputElement.value (including `readonly string[]` for compatibility
   * with React 19's stricter Input typing).
   */
  value?: string | number | readonly string[];
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
  views?: TextFieldStyles;
}
