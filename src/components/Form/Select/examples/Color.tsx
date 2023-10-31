import React from 'react';
import { Vertical } from 'src/components/Layout/Vertical/examples';

import { Select } from '../Select';

export const ColorSelect = () => (
  <Vertical gap={15}>
    {['theme.primary', 'theme.secondary', 'theme.error', 'theme.success', 'theme.warning'].map((color) => (
      <Select key={color} options={['Item1', 'Item2', 'Item3']} colorScheme={color} />
    ))}
  </Vertical>
);
