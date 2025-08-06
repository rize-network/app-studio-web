import React from 'react';
import { ColorInputProps } from './ColorInput/ColorInput.props';
import { useColorInputState } from './ColorInput/ColorInput.state';
import ColorInputView from './ColorInput/ColorInput.view';

const ColorInputComponent: React.FC<ColorInputProps> = (
  props: ColorInputProps
) => {
  // Initialize the colorInputStates with state-management logic and relevant properties from useColorInputState hook
  const colorInputStates = useColorInputState(props);

  // Render the ColorInputView component with the spread attributes from both colorInputStates and props
  return <ColorInputView {...colorInputStates} {...props} />;
};

// Export ColorInputComponent as ColorInput
export const ColorInput = ColorInputComponent;
