import React, { CSSProperties } from 'react';
import { Elevation } from '../../../../utils/elevation';
import { Shadow, ViewProps } from 'app-studio';

import { DatePickerStyles, Shape, Size, Variant } from './DatePicker.type';

export interface DatePickerProps extends Omit<ViewProps, 'size'> {
  id?: string;
  /**
   * Custom icon to display when the DatePicker is checked.
   */
  icon?: React.ReactNode;
  /**
   * Indicates whether the DatePicker has an error.
   */
  error?: boolean;
  /**
   * Additional helper text that provides information about the field.
   */
  helperText?: string;
  /**
   * The name of the toggle.
   */
  name?: string;

  /**
   * The color scheme that changes the background color of the DatePicker.
   */
  colorScheme?: string;
  /**
   * If true, the DatePicker cannot be selected.
   */
  isReadOnly?: boolean;
  /**
   * If true, the DatePicker will be unusable.
   */
  isDisabled?: boolean;

  /**
   * The label text for the  field.
   */
  label?: string;
  /**
   * Callback function triggered when the DatePicker value changes.
   */
  onChange?: (value: any) => void;
  /**
   * Callback function triggered when the DatePicker value changes for IOS and Android.
   */
  onChangeText?: (text: string) => void;
  /**
   * CSS styles for the DatePicker container and label.
   */
  styles?: DatePickerStyles;
  /**
   * The shape that changes the outlines of the field.
   */
  shape?: Shape;
  /**
   * Changes the style of the  field.
   */
  variant?: Variant;
  /**
   * The size that sets the height and width of the DatePicker.
   */
  size?: Size;
  /**
   * Adds a shadow effect to the DatePicker.
   */
  shadow?: Shadow | Elevation | CSSProperties;
}

export interface DatePickerViewProps extends DatePickerProps {
  /**
   * The selected date value as a string.
   */
  date: string;

  /**
   * A function to set the selected date value.
   * @param {string} newDate - The new date value to set.
   */
  setDate: (newDate: string) => void;

  /**
   * Flag indicating if the date picker is currently being hovered.
   */
  isHovered: boolean;

  /**
   * A function to set the hovered state of the date picker.
   * @param {boolean} hovered - The hovered state to set.
   */
  setIsHovered: (hovered: boolean) => void;

  /**
   * Flag indicating if the date picker is currently focused.
   */
  isFocused: boolean;

  /**
   * A function to set the focus state of the date picker.
   * @param {boolean} focused - The focus state to set.
   */
  setIsFocused: (focused: boolean) => void;
}
