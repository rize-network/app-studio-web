import React from 'react';
import { Vertical } from '../../../Layout/Vertical/Vertical';

import { DatePicker } from '../DatePicker';

export const ColorDatePicker = () => (
  <Vertical gap={15}>
    {[
      'theme.primary',
      'theme.secondary',
      'theme.error',
      'theme.success',
      'theme.warning',
    ].map((color) => (
      <DatePicker key={color} name="name" label="Select a date:" />
    ))}
  </Vertical>
);
