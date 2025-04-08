import React from 'react';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Slider } from '../Slider';
import { Shape } from '../Slider/Slider.type';

export const ShapesDemo = () => {
  const shapes: Shape[] = ['sharp', 'rounded', 'pillShaped'];

  return (
    <Vertical gap={30} width="100%" maxWidth={400}>
      {shapes.map((shape) => (
        <Slider
          key={shape}
          label={`${shape} Shape`}
          shape={shape}
          value={50}
          showValue
        />
      ))}
    </Vertical>
  );
};
