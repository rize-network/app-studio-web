import React from 'react';
import { Text } from 'src/components';
import { ToggleGroup } from '../ToggleGroup';

export const ItemsDemo = () => {
  const items = [
    { id: 'B', value: <Text>B</Text> },
    { id: 'C', value: <Text>C</Text> },
    { id: 'D', value: <Text>D</Text> },
  ];
  return <ToggleGroup items={items} />;
};
