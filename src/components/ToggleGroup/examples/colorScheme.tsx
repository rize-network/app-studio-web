import React from 'react';
import { Vertical } from 'src/components';
import { ToggleGroup } from '../ToggleGroup';

export const ColorSchemeDemo = () => {
  const items = [
    { id: 'B', value: 'B', state: false },
    { id: 'C', value: 'C', state: true },
    { id: 'D', value: 'D', isDisabled: true },
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
