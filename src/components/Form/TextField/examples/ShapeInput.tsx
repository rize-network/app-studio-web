import React from 'react';
import { Vertical } from 'app-studio';

import { TextField } from '../TextField';
import { Shape } from '../TextField/TextField.type';

export const ShapesInput = () => {
  return (
    <Vertical gap={10} width="300px">
      {['default', 'sharp', 'rounded', 'pillShaped'].map((shape, index) => (
        <TextField
          key={index}
          name={shape}
          placeholder={shape}
          shape={shape as Shape}
          variant="outline"
        />
      ))}
    </Vertical>
  );
};
