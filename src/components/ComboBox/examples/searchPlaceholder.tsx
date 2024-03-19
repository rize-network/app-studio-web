import React from 'react';
import { ComboBox } from '../ComboBox';

export const SearchPlaceholderDemo = () => {
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
    <ComboBox
      placeholder="Select..."
      searchPlaceholder="FilterStatus.."
      items={items}
    />
  );
};
