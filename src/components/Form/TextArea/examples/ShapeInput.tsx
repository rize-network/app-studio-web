import React from 'react';
import { Vertical } from 'app-studio';

import { TextArea } from '../TextArea';
import { Shape } from '../TextArea/TextArea.type';

export const ShapesArea = () => {
  return (
    <Vertical gap={10} width="300px">
      {['default', 'sharp', 'rounded'].map((shape, index) => (
        <TextArea
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
