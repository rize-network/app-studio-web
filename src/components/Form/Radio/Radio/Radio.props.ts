import React from 'react';
import { Elevation } from '../../../../utils/elevation';
import { InputProps, Shadow } from 'app-studio';
import { RadioStyles, Size } from './Radio.type';
import { ViewProps } from 'app-studio';
// Defines the core properties for the Radio component, extending base input properties while customizing the 'size' property.
export interface RadioProps extends Omit<InputProps, 'size'> {
  // Optional unique identifier for the radio input.
  id?: string;
  // Optional React node to be displayed as an icon within or alongside the radio.
  icon?: React.ReactNode;
  // Optional error state indicator or message for the radio.
  error?: any;
  // The name attribute for the radio input, used for grouping radio buttons.
  name?: string;
  // The text label associated with the radio input.
  label?: string;
  // The value associated with the radio input when selected.
  value?: string;
  // Determines if the radio button is currently checked (controlled state).
  isChecked?: boolean;
  // Sets the initial selected state of the radio button (uncontrolled state).
  defaultIsSelected?: boolean;
  // Indicates if the radio button is read-only, preventing user interaction.
  isReadOnly?: boolean;
  // Indicates if the radio button is disabled, making it unclickable.
  isDisabled?: boolean;
  // Specifies the position of the label relative to the radio input.
  labelPosition?: 'left' | 'right';
  // Callback function triggered when the radio button's checked state changes.
  onChange?: Function;
  // Callback function triggered specifically when the radio button's value changes.
  onValueChange?: Function;
  // Custom styles or view configurations for the radio component.
  views?: RadioStyles;
  // Defines the visual size of the radio component.
  size?: Size;
  // Applies shadow effects or elevation styles to the radio component.
  shadow?: Shadow | Elevation | ViewProps;
  // Optional supplementary text providing additional information about the radio.
  infoText?: string;
}
// Extends RadioProps with additional properties specific to the presentational view layer of the Radio component, often for internal state management.
export interface RadioViewProps extends RadioProps {
  // Internal state property indicating if the radio component is currently hovered.
  isHovered?: boolean;
  // Setter function to update the `isHovered` state.
  setIsHovered?: (hovered: boolean) => void;
  // Internal state property indicating if the radio component is currently selected.
  isSelected?: boolean;
  // Setter function to update the `isSelected` state.
  setIsSelected?: (selected: boolean) => void;
}
