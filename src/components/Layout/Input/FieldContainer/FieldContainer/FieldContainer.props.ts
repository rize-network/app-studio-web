import React from 'react';
import { TextFieldStyles } from '../../../../Layout/configs/Input.type';
import { ViewProps } from 'app-studio';

export interface ContainerProps extends ViewProps {
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
  views?: TextFieldStyles;
}
