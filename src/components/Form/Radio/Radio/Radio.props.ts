/**
 * Radio Props
 *
 * Defines the props for the Radio component following the design guidelines.
 */

import React from 'react';
import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow } from 'app-studio';
import { RadioStyles, Size } from './Radio.type';
import { ViewProps } from 'app-studio';

/**
 * Props for the Radio component
 */
export interface RadioProps extends Omit<InputProps, 'size'> {
  /**
   * Optional identifier for the radio element
   */
  id?: string;

  /**
   * Optional custom icon for the radio element
   */
  icon?: React.ReactNode;

  /**
   * Optional error message or state
   */
  error?: any;

  /**
   * Optional name attribute for the radio element
   */
  name?: string;

  /**
   * Optional label text for the radio element
   */
  label?: string;

  /**
   * Optional value for the radio element
   */
  value?: string;

  /**
   * Optional checked state for the radio element
   */
  isChecked?: boolean;

  /**
   * Optional default selected state for the radio element
   */
  defaultIsSelected?: boolean;

  /**
   * Optional read-only state for the radio element
   */
  isReadOnly?: boolean;

  /**
   * Optional disabled state for the radio element
   */
  isDisabled?: boolean;

  /**
   * Optional position for the label
   */
  labelPosition?: 'left' | 'right';

  /**
   * Optional callback for change events
   */
  onChange?: Function;

  /**
   * Optional callback for value change events
   */
  onValueChange?: Function;

  /**
   * Optional custom styles for the radio element
   */
  views?: RadioStyles;

  /**
   * Optional size for the radio element
   */
  size?: Size;

  /**
   * Optional shadow for the radio element
   */
  shadow?: Shadow | Elevation | ViewProps;

  /**
   * Optional info text for the radio element
   */
  infoText?: string;
}

/**
 * Props for the Radio view component
 */
export interface RadioViewProps extends RadioProps {
  /**
   * Optional hover state for the radio element
   */
  isHovered?: boolean;

  /**
   * Optional setter for the hover state
   */
  setIsHovered?: (hovered: boolean) => void;

  /**
   * Optional selected state for the radio element
   */
  isSelected?: boolean;

  /**
   * Optional setter for the selected state
   */
  setIsSelected?: (selected: boolean) => void;
}
