import React from 'react';
import { Vertical } from 'app-studio';
import { ColorInput } from '../ColorInput';

export const DefaultColorInput = () => {
  return (
    <Vertical gap={16} width="300px">
      <ColorInput
        label="Background Color"
        placeholder="Choose a color"
        helperText="Select a background color for your theme"
      />

      <ColorInput
        label="Text Color"
        defaultValue="color.gray.800"
        helperText="Select a text color"
      />

      <ColorInput
        label="Accent Color"
        defaultValue="color.blue.500"
        showCustomInput={false}
        helperText="Choose from predefined colors only"
      />
    </Vertical>
  );
};
