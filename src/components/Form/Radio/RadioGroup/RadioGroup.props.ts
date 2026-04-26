import React from 'react';
import { ViewProps } from 'app-studio';
import { Direction, RadioGroupStyles } from './RadioGroup.type';
// Defines the properties accepted by the RadioGroup component, extending ViewProps while omitting its 'direction' property.
export interface RadioGroupProps extends Omit<ViewProps, 'direction'> {
  // Specifies the children elements to be rendered within the RadioGroup, typically Radio components.
  children: React.ReactNode;
  // An optional name for the radio group, used to group related radio buttons together.
  name?: string;
  // An optional label displayed for the radio group, providing context to the user.
  label?: string;
  // Optional helper text displayed below the radio group, offering additional guidance or information.
  helperText?: string;
  // An optional error message or state to indicate validation issues.
  error?: any;
  // The currently selected value of the radio group, making it a controlled component.
  value?: string;
  // The initial selected value of the radio group when it is uncontrolled.
  defaultValue?: string;
  // A callback function triggered when the selected radio button changes, receiving the new value.
  onChange?: (value: string) => void;
  // Specifies the layout direction of the radio buttons within the group (e.g., row or column).
  direction?: Direction;
  // An optional number representing the spacing between individual radio buttons.
  spacing?: number;
  // A boolean flag to disable all radio buttons within the group, preventing user interaction.
  isDisabled?: boolean;
  // A boolean flag to make all radio buttons within the group read-only, allowing selection but preventing changes.
  isReadOnly?: boolean;
  // Optional styles object to customize the visual appearance of different parts of the RadioGroup.
  views?: RadioGroupStyles;
}
// Defines properties specifically for the view component of the RadioGroup, extending the base RadioGroupProps.
export interface RadioGroupViewProps extends RadioGroupProps {
  // The currently selected value, passed down to the view component for rendering.
  selectedValue: string;
  // A function to update the selected value, typically handled by the state management of the parent RadioGroup component.
  setSelectedValue: (value: string) => void;
}
