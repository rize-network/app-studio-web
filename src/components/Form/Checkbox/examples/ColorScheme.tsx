import React from 'react';
import { Vertical } from '../../../Layout/Vertical/Vertical';

import { Checkbox } from '../Checkbox';

export const ColorCheckbox = () => (
  <Vertical gap={15}>
    {[
      'theme.primary',
      'theme.secondary',
      'theme.error',
      'theme.success',
      'theme.warning',
    ].map((color) => (
      <Checkbox
        key={color}
        colorScheme={color}
        label={color}
        defaultIsSelected
      />
    ))}
  </Vertical>
);
