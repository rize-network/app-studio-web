import React from 'react';
import { CountryPicker } from '../../..';
import { Vertical } from '../../../Layout/Vertical/examples';

import { Variant } from '../CountryPicker/CountryPicker.type';

export const VariantCountryPicker = () => (
  <Vertical gap={10}>
    {['outline', 'default', 'unStyled'].map((variant) => (
      <CountryPicker key={variant} variant={variant as Variant} label={variant} placeholder="Select a country..." />
    ))}
  </Vertical>
);
