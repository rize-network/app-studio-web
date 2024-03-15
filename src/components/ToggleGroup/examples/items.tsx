import React from 'react';
// import { View } from 'src/components';,
import { ToggleGroup } from '../ToggleGroup';

export const ItemsDemo = () => {
  const items = [
    { id: 'B', value: 'B' },
    { id: 'C', value: 'C' },
    { id: 'D', value: 'D' },
  ];
  return <ToggleGroup items={items} />;
};
