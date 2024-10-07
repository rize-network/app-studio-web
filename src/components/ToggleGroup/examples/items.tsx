import React from 'react';
import { ToggleGroup } from '../ToggleGroup';
import { Text } from '../../Text/Text';

export const ItemsDemo = () => {
  const items = [
    { id: 'B', value: <Text>B</Text> },
    { id: 'C', value: <Text>C</Text> },
    { id: 'D', value: <Text>D</Text> },
  ];
  return <ToggleGroup items={items} />;
};
