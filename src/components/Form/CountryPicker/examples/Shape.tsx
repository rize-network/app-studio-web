import React from 'react';
import { CountryPicker } from '../../../Form/CountryPicker/CountryPicker';

import { Vertical } from 'app-studio';

import { Shape } from '../CountryPicker/CountryPicker.type';

export const ShapeCountryPicker = () => (
  <Vertical gap={10}>
    {['default', 'square', 'rounded', 'pill'].map((shape) => (
      <CountryPicker
        key={shape}
        label={shape}
        shape={shape as Shape}
        placeholder="Select a country..."
      />
    ))}
  </Vertical>
);
