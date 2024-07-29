import React from 'react';
import { Size, TextFieldStyles } from '../../../../Layout/configs/Input.type';
import { ViewProps } from 'app-studio';

export interface FieldProps extends Omit<ViewProps, 'size'> {
  /**
   * The content to be rendered inside the Field.
   */
  children?: React.ReactNode;
  /**
   * The size of the field (default: "md").
   */
  size?: Size;
  /**
   * Determines if the field is disabled (default: false).
   */
  isDisabled?: boolean;
  /**
   * Determines if the field is read-only (default: false).
   */
  isReadOnly?: boolean;
  /**
   * CSS styles applied to the field (default: {}).
   */
  styles?: TextFieldStyles;
}
