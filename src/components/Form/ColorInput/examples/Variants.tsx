import React from 'react';
import { Vertical } from 'app-studio';
import { ColorInput } from '../ColorInput';
import { Variant } from '../ColorInput/ColorInput.type';

export const VariantsColorInput = () => {
  return (
    <Vertical gap={16} width="300px">
      {(['default', 'outline', 'none'] as Variant[]).map((variant) => (
        <ColorInput
          key={variant}
          label={`${
            variant.charAt(0).toUpperCase() + variant.slice(1)
          } Variant`}
          variant={variant}
          placeholder="Select a color"
          defaultValue="color.blue.500"
        />
      ))}
    </Vertical>
  );
};
