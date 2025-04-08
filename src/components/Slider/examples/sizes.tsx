import React from 'react';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Slider } from '../Slider';
import { Size } from '../Slider/Slider.type';

export const SizesDemo = () => {
  const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <Vertical gap={30} width="100%" maxWidth={400}>
      {sizes.map((size) => (
        <Slider
          key={size}
          label={`${size.toUpperCase()} Size`}
          size={size}
          value={50}
          showValue
        />
      ))}
    </Vertical>
  );
};
