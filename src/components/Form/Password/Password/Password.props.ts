import React from 'react';
import { TextFieldProps } from '../../../Form/TextField/TextField/TextField.props';

/**
 * TextFieldProps already extends Omit<InputProps, ...>, so a second extend of
 * Omit<InputProps, ...> would conflict on every property TextField narrowed
 * (error, helperText, label, left, right, onBlur, onChange, onClick, onFocus,
 * shadow, value). The Password component is a TextField with a visibility
 * toggle — extend TextFieldProps alone.
 */
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
}

export interface PasswordViewProps extends PasswordProps {
  /**
   * Optional prop to determine if the password is visible
   */
  isVisible?: boolean;
  /**
   * Optional callback to update the visibility state.
   */
  setIsVisible?: (value: boolean) => void;
}
