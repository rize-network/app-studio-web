import React from 'react';
import { Size, TextFieldStyles } from 'src/components/Layout/configs/Input.type';

export interface FieldProps {
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
  /**
   * Additional properties and attributes for the field.
   */
  [x: string]: any;
}
