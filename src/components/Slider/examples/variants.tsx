import React from 'react';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Slider } from '../Slider';
import { Variant } from '../Slider/Slider.type';

export const VariantsDemo = () => {
  const variants: Variant[] = ['default', 'outline'];

  return (
    <Vertical gap={30} width="100%" maxWidth={400}>
      {variants.map((variant) => (
        <Slider
          key={variant}
          label={`${variant} Variant`}
          variant={variant}
          value={50}
          showValue
        />
      ))}
    </Vertical>
  );
};
