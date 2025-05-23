import React, { useState } from 'react';
import { Horizontal } from 'app-studio';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';
import { Slider } from '../Slider';

export const RangeDemo = () => {
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(80);

  const handleMinChange = (value: number) => {
    // Ensure min value doesn't exceed max value
    setMinValue(Math.min(value, maxValue - 1));
  };

  const handleMaxChange = (value: number) => {
    // Ensure max value doesn't go below min value
    setMaxValue(Math.max(value, minValue + 1));
  };

  return (
    <Vertical gap={30} width="100%" maxWidth={400}>
      <Text fontSize={16} fontWeight={500}>
        Price Range Filter
      </Text>

      <Slider
        label="Min Value"
        value={minValue}
        onChange={handleMinChange}
        min={0}
        max={100}
        showValue
      />

      <Slider
        label="Max Value"
        value={maxValue}
        onChange={handleMaxChange}
        min={0}
        max={100}
        showValue
      />

      <Horizontal justifyContent="space-between" alignItems="center">
        <Text>Selected Range:</Text>
        <Text fontWeight={500}>
          ${minValue} - ${maxValue}
        </Text>
      </Horizontal>
    </Vertical>
  );
};
