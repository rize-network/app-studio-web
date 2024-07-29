import React from 'react';
import { TextFieldProps } from '../../../Form/TextField/TextField/TextField.props';
import { InputProps } from 'app-studio';

export interface PasswordProps
  extends TextFieldProps,
    Omit<InputProps, 'size'> {
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
