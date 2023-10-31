import React from 'react';
import { CountryPicker } from 'src/components';
import { Vertical } from 'src/components/Layout/Vertical/examples';

import { Shape } from '../CountryPicker/CountryPicker.type';

export const ShapeCountryPicker = () => (
  <Vertical gap={10}>
    {['default', 'sharp', 'rounded', 'pillShaped'].map((shape) => (
      <CountryPicker key={shape} label={shape} shape={shape as Shape} placeholder="Select a country..." />
    ))}
  </Vertical>
);
