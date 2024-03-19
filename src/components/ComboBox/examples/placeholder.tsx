import React from 'react';
import { ComboBox } from '../ComboBox';

export const PlaceholderDemo = () => {
  const items = [
    {
      value: 'todo',
      label: 'To Do',
    },
    {
      value: 'inprogress',
      label: 'In Progress',
    },
  ];
  return (
    <ComboBox placeholder="Select..." searchEnabled={false} items={items} />
  );
};
