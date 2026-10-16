import React from 'react';
import { Vertical } from 'app-studio';
import { ColorInput } from '../ColorInput';
import { Size } from '../ColorInput/ColorInput.type';

export const SizesColorInput = () => {
  return (
    <Vertical gap={16} width="300px">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as Size[]).map((size) => (
        <ColorInput
          key={size}
          label={`Size ${size.toUpperCase()}`}
          size={size}
          placeholder="Select a color"
          defaultValue="color-green-500"
        />
      ))}
    </Vertical>
  );
};
