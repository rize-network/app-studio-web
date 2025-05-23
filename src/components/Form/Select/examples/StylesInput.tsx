import React from 'react';

import { Select } from '../Select';

export const StyledSelect = () => (
  <Select
    options={[
      { label: 'Item1', value: '1' },
      { label: 'Item2', value: '2' },
      { label: 'Item3', value: '3' },
    ]}
    views={{
      selectBox: { borderRadius: 10, border: '1px solid purple' },
      text: { color: 'red', fontSize: 12 },
      label: { fontWeight: 'bold', color: 'theme.primary' },
    }}
  />
);
