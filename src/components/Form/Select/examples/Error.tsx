import React from 'react';
import { Select } from '../Select';

export const ErrorSelect = () => (
  <Select
    id="error"
    name="error"
    error
    options={[
      { label: 'Item1', value: '1' },
      { label: 'Item2', value: '2' },
      { label: 'Item3', value: '3' },
    ]}
  />
);
