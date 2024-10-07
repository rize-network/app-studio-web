import React from 'react';
import PlusSvg from '../../../Svg/Plus';
import { ComboBox } from '../ComboBox';

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
      left={<PlusSvg size={12} />}
    />
  );
};
