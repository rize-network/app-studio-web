import React from 'react';
import { ColorInputProps } from './ColorInput/ColorInput.props';
import { useColorInputState } from './ColorInput/ColorInput.state';
import ColorInputView from './ColorInput/ColorInput.view';
// This file defines the main ColorInput component, orchestrating its properties, state management logic, and presentation view to create a complete and functional color input field.
const ColorInputComponent: React.FC<ColorInputProps> = (
  props: ColorInputProps
) => {
  const colorInputStates = useColorInputState(props);
  return <ColorInputView {...colorInputStates} {...props} />;
};
export const ColorInput = ColorInputComponent;
