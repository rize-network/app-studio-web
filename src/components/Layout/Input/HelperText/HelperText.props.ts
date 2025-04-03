import React from 'react';
import { TextFieldStyles } from '../../../Layout/configs/Input.type';
import { ViewProps } from 'app-studio';

export interface HelperTextProps extends ViewProps {
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
  views?: TextFieldStyles;
}
