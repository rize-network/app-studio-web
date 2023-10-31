import React from 'react';
import { TextFieldStyles } from '../../../../Layout/configs/Input.type';

export interface ContainerProps {
  /**
   * The content to be rendered inside the container.
   */
  children?: React.ReactNode;
  /**
   * Specifies whether the input field should display an error state.
   */
  error?: boolean;
  /**
   * Provides additional information or instructions about the field.
   */
  helperText?: string;
  /**
   * CSS styles for the select box and dropdown.
   */
  styles?: TextFieldStyles;
  /**
   * Additional properties and attributes for the field.
   */
  [x: string]: any;
}
