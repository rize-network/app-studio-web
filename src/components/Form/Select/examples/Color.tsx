import React from 'react';
import { Vertical } from 'app-studio';

import { Select } from '../Select';

export const ColorDemo = () => (
  <Vertical gap={15}>
    {[
      'theme.primary',
      'theme.secondary',
      'theme.error',
      'theme.success',
      'theme.warning',
    ].map((color) => (
      <Select
        key={color}
        options={[
          { label: 'Item1', value: '1' },
          { label: 'Item2', value: '2' },
          { label: 'Item3', value: '3' },
        ]}
      />
    ))}
  </Vertical>
);
