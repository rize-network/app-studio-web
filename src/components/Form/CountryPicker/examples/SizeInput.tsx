import React from 'react';
import { Vertical } from 'src/components/Layout/Vertical/examples';

import { CountryPicker } from '../CountryPicker';

export const SizeCountryPicker = () => {
  return (
    <Vertical gap={10}>
      <CountryPicker name="xs" size="xs" label="xs" />
      <CountryPicker name="sm" size="sm" label="sm" />
      <CountryPicker name="md" size="md" label="md" />
      <CountryPicker name="lg" size="lg" label="lg" />
      <CountryPicker name="xl" size="xl" label="xl" />
    </Vertical>
  );
};
