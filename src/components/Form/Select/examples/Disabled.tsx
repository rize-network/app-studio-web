import React from 'react';

import { Select } from '../Select';

export const DisabledSelect = () => (
  <Select
    isDisabled
    options={[
      { label: 'Item1', value: '1' },
      { label: 'Item2', value: '2' },
      { label: 'Item3', value: '3' },
    ]}
  />
);
