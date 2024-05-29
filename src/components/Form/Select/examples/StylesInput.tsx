import React from 'react';

import { Select } from '../Select';

export const StyledSelect = () => (
  <Select
    colorScheme="theme.primary"
    options={['Item1', 'Item2', 'Item3']}
    styles={{
      selectBox: { borderRadius: 10, border: '1px solid purple' },
      text: { color: 'red', fontSize: 12 },
      label: { fontWeight: 'bold', color: 'theme.primary' },
    }}
  />
);
