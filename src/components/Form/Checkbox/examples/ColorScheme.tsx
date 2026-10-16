import React from 'react';
import { Vertical } from 'app-studio';

import { Checkbox } from '../Checkbox';

export const ColorCheckbox = () => (
  <Vertical gap={15}>
    {[
      'theme-primary',
      'theme-secondary',
      'theme-error',
      'theme-success',
      'theme-warning',
    ].map((color) => (
      <Checkbox
        key={color}
        label={color}
        defaultIsSelected
        views={{
          checkbox: {
            backgroundColor: color,
            borderColor: color,
          },
        }}
      />
    ))}
  </Vertical>
);
