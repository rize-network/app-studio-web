import React from 'react';
import { IconPickerProps } from './IconPicker/IconPicker.props';
import { useIconPickerState } from './IconPicker/IconPicker.state';
import IconPickerView from './IconPicker/IconPicker.view';
// This file defines the main `IconPicker` functional component. It integrates state management through `useIconPickerState` and renders the component's UI by composing `IconPickerView` with both internal state and external props.
const IconPickerComponent: React.FC<IconPickerProps> = (
  props: IconPickerProps
) => {
  const iconPickerStates = useIconPickerState(props);
  return <IconPickerView {...iconPickerStates} {...props} />;
};
export const IconPicker = IconPickerComponent;
