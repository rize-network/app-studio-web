import React, { useState } from 'react';
import { Vertical } from 'app-studio';
import { Slider } from '../Slider';

export const DefaultDemo = () => {
  const [value, setValue] = useState(50);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Slider
        label="Default Slider"
        value={value}
        onChange={handleChange}
        showValue
        helperText="Drag the slider to change the value"
      />
    </Vertical>
  );
};
