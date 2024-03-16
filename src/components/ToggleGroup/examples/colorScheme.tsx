import React from 'react';
import { Vertical, Text } from 'src/components';
import { ToggleGroup } from '../ToggleGroup';

export const ColorSchemeDemo = () => {
  const items = [
    { id: 'B', value: <Text>B</Text> },
    { id: 'C', value: <Text>C</Text>, isActive: true },
    { id: 'D', value: <Text>D</Text>, isDisabled: true },
  ];
  return (
    <Vertical gap={10}>
      {[
        'theme.primary',
        'theme.secondary',
        'theme.warning',
        'theme.success',
        'theme.error',
      ].map((color, index) => (
        <ToggleGroup key={index} items={items} colorScheme={color} />
      ))}
    </Vertical>
  );
};
