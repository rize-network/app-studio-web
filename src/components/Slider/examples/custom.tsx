import React, { useState } from 'react';
import { Vertical } from 'app-studio';
import { Slider } from '../Slider';

export const CustomDemo = () => {
  const [value, setValue] = useState(75);

  return (
    <Vertical gap={30} width="100%" maxWidth={400}>
      <Slider
        label="Custom Styled Slider"
        value={value}
        onChange={setValue}
        showValue
        min={0}
        max={200}
        step={5}
        views={{
          track: {
            backgroundColor: 'color.purple.200',
            height: 10,
            borderRadius: 5,
          },
          progress: {
            backgroundColor: 'color.purple.500',
          },
          thumb: {
            backgroundColor: 'white',
            border: '2px solid color.purple.500',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          },
          label: {
            color: 'color.purple.700',
            fontWeight: 600,
          },
          valueLabel: {
            backgroundColor: 'color.purple.500',
            color: 'white',
            padding: '2px 8px',
            borderRadius: 4,
          },
        }}
      />
    </Vertical>
  );
};
