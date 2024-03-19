import React from 'react';
import { Badge } from '../..';
import { ComboBox } from '../ComboBox';

export const LeftDemo = () => {
  const items = [
    {
      value: 'enhancement',
      label: 'Enhancement',
    },
    {
      value: 'bug',
      label: 'Bugs',
    },
  ];

  return <ComboBox items={items} left={<Badge content="Status" />} />;
};
