import React from 'react';
import { Select } from '../../..';

export const MultiSelect = () => (
  <Select options={['Item1', 'Item2', 'Item3']} placeholder="Select an item.." isMulti />
);
