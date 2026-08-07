import React, { useState } from 'react';
import { Horizontal } from 'app-studio';
import { Button } from '../../../Button/Button';
import { Select } from '../Select';

const options = [
  { label: 'Item1', value: '1' },
  { label: 'Item2', value: '2' },
  { label: 'Item3', value: '3' },
];

export const ControlledSelect = () => {
  const [value, setValue] = useState('2');

  return (
    <Horizontal gap={12} alignItems="center">
      <Select
        options={options}
        label="Select an item"
        value={value}
        // `onChange` hands back the next selection — a string here, and the
        // whole array when `isMulti`. Never a DOM event, so there is no
        // `e.target.value` to read.
        onChange={(next: string) => setValue(next)}
      />
      {/* The selection follows the state, whoever moved it. */}
      <Button onClick={() => setValue('3')}>Jump to Item3</Button>
    </Horizontal>
  );
};
