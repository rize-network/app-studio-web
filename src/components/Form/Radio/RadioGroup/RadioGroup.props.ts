/**
 * RadioGroup Props
 *
 * Defines the props for the RadioGroup component following the design guidelines.
 */

import React from 'react';
import { ViewProps } from 'app-studio';
import { Direction, RadioGroupStyles } from './RadioGroup.type';

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps extends Omit<ViewProps, 'direction'> {
  /**
   * Children components (Radio buttons)
   */
  children: React.ReactNode;

  /**
   * Optional name attribute for all radio buttons in the group
   */
  name?: string;

  /**
   * Optional label for the radio group
   */
  label?: string;

  /**
   * Optional helper text for the radio group
   */
  helperText?: string;

  /**
   * Optional error message or state
   */
  error?: any;

  /**
   * Optional value for the selected radio button
   */
  value?: string;

  /**
   * Optional default value for the selected radio button
   */
  defaultValue?: string;

  /**
   * Optional callback for change events
   */
  onChange?: (value: string) => void;

  /**
   * Optional direction for the radio group layout
   */
  direction?: Direction;

  /**
   * Optional spacing between radio buttons
   */
  spacing?: number;

  /**
   * Optional disabled state for all radio buttons in the group
   */
  isDisabled?: boolean;

  /**
   * Optional read-only state for all radio buttons in the group
   */
  isReadOnly?: boolean;

  /**
   * Optional custom styles for the radio group
   */
  views?: RadioGroupStyles;
}

/**
 * Props for the RadioGroup view component
 */
export interface RadioGroupViewProps extends RadioGroupProps {
  /**
   * Selected value
   */
  selectedValue: string;

  /**
   * Setter for the selected value
   */
  setSelectedValue: (value: string) => void;
}
