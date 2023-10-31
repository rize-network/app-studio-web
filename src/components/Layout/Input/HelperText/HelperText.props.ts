import React from 'react';
import { TextFieldStyles } from '../../../Layout/configs/Input.type';

export interface HelperTextProps {
  /**
   * The content to be rendered inside the HelperText.
   */
  children: React.ReactNode;
  /**
   * If true, changes the input style to indicate error.
   */
  error?: boolean;
  /**
   * CSS styles applied to the HelperText.
   */
  styles?: TextFieldStyles;
  /**
   * Additional properties and attributes for the field.
   */
  [x: string]: any;
}
