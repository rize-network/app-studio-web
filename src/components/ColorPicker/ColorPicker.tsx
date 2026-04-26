import React from 'react';
import { ColorPickerProps } from './ColorPicker/ColorPicker.props';
import { useColorPickerState } from './ColorPicker/ColorPicker.state';
import ColorPickerView from './ColorPicker/ColorPicker.view';
// This file defines the main ColorPicker component, acting as the entry point that integrates state management with the visual presentation, combining the state logic and the UI view.
const ColorPickerComponent: React.FC<ColorPickerProps> = (
  props: ColorPickerProps
) => {
  const colorPickerStates = useColorPickerState(props);
  return <ColorPickerView {...colorPickerStates} {...props} />;
};
export const ColorPicker = ColorPickerComponent;
