import React, { useState } from 'react';
import { Text, Vertical } from 'app-studio';
import { Selector } from '../Selector';

export const ControlledSelector = () => {
  const [value, setValue] = useState('weekly');
  return (
    <Vertical gap={8}>
      <Selector
        label="Frequency"
        options={[
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
        ]}
        onChange={(next: string) => setValue(next)}
      />
      <Text color="color-gray-500" fontSize="12px">
        Selected: {value}
      </Text>
    </Vertical>
  );
};
