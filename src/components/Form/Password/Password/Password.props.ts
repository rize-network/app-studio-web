import React from 'react';
import { TextFieldProps } from 'src/components/Form/TextField/TextField/TextField.props';

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

export interface PasswordViewProps extends PasswordProps {
  /**
   * Optional prop to determine if the password is visible
   */
  isVisible?: boolean;
  /**
   * Optional callback prop to update the visibility state
   */
  setIsVisible?: Function;
}
