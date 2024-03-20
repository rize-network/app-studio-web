import React from 'react';
import { ToggleGroup } from '../ToggleGroup';

export const DefaultDemo = () => {
  const items = [
    { id: 'B', value: 'B' },
    { id: 'C', value: 'C' },
    { id: 'D', value: 'D' },
  ];
  return <ToggleGroup items={items} />;
};
