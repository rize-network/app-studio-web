import React from 'react';

import { Checkbox } from '../Checkbox';

export const StyledCheckbox = () => (
  <Checkbox
    label="Active"
    views={{
      checkbox: {
        borderRadius: '50%',
        borderColor: 'theme.primary',
        borderStyle: 'solid',
        borderWidth: 1,
        height: '16px',
        width: '16px',
      },
      label: { color: 'theme.primary' },
    }}
    defaultIsSelected
  />
);
