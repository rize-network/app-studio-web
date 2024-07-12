import React from 'react';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';

import { Select } from '../Select';

export const SizeSelect = () => {
  const options = [
    { label: 'Item1', value: '1' },
    { label: 'Item2', value: '2' },
    { label: 'Item3', value: '3' },
  ];
  return (
    <Vertical gap={10}>
      <Select name="sm" size="sm" placeholder="sm" options={options} />
      <Select name="md" size="md" placeholder="md" options={options} />
      <Select name="lg" size="lg" placeholder="lg" options={options} />
      <Select name="xl" size="xl" placeholder="xl" options={options} />
    </Vertical>
  );
};
