import React from 'react';

import { Select } from '../../../Form/Select/Select';

export const MultiSelect = () => (
  <Select
    options={[
      { label: 'Item1', value: '1' },
      { label: 'Item2', value: '2' },
      { label: 'Item3', value: '3' },
    ]}
    placeholder="Select an item.."
    isMulti
  />
);
