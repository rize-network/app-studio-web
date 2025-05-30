import React from 'react';
import { ColorPickerProps } from './ColorPicker/ColorPicker.props';
import { useColorPickerState } from './ColorPicker/ColorPicker.state';
import ColorPickerView from './ColorPicker/ColorPicker.view';

const ColorPickerComponent: React.FC<ColorPickerProps> = (
  props: ColorPickerProps
) => {
  // Initialize the colorPickerStates with state-management logic and relevant properties from useColorPickerState hook
  const colorPickerStates = useColorPickerState(props);

  // Render the ColorPickerView component with the spread attributes from both colorPickerStates and props
  return <ColorPickerView {...colorPickerStates} {...props} />;
};

// Export ColorPickerComponent as ColorPicker
export const ColorPicker = ColorPickerComponent;
