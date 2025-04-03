import React from 'react';
import { ComboBox } from '../ComboBox';
import { PlusIcon } from '../../../Icon/Icon';

export const LabelDemo = () => {
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
      id="label"
      name="label"
      label="Status"
      items={items}
      left={<PlusIcon widthHeight={12} />}
    />
  );
};
