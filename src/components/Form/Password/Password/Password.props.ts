import React from 'react';
import { TextFieldProps } from '../../../Form/TextField/TextField/TextField.props';

export interface PasswordProps extends TextFieldProps {
  /**
   * The name of the input field
   */
  name?: string;
  /**
   * If true, the Input will be unusable
   */
  isDisabled?: boolean;
  /**
   * Icon to Indicate that the password is visible
   */
  visibleIcon?: React.ReactNode;
  /**
   * Icon to Indicate that the password is hidden
   */
  hiddenIcon?: React.ReactNode;
  /**
   * other properties
   */
  [x: string]: any;
}

