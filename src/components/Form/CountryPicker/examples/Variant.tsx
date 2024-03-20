import React from 'react';
import { CountryPicker } from '../../../Form/CountryPicker/CountryPicker';

import { Vertical } from 'src/components/Layout/Vertical/Vertical';

import { Variant } from '../CountryPicker/CountryPicker.type';

export const VariantCountryPicker = () => (
  <Vertical gap={10}>
    {['outline', 'default', 'none'].map((variant) => (
      <CountryPicker
        key={variant}
        variant={variant as Variant}
        label={variant}
        placeholder="Select a country..."
      />
    ))}
  </Vertical>
);
