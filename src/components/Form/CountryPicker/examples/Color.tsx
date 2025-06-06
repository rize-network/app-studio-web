import React from 'react';
import { Vertical } from 'app-studio';

import { CountryPicker } from '../CountryPicker';

export const ColorCountryPicker = () => (
  <Vertical gap={15}>
    {[
      'theme.primary',
      'theme.secondary',
      'theme.error',
      'theme.success',
      'theme.warning',
    ].map((color) => (
      <CountryPicker key={color} label={color} />
    ))}
  </Vertical>
);
