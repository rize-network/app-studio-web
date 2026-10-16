import React from 'react';

import { CountryPicker } from '../CountryPicker';

export const StyledCountryPicker = () => (
  <CountryPicker
    name="noColorScheme"
    views={{
      text: { color: 'theme-primary' }, // Assuming theme-primary is still desired
      label: { fontWeight: 'bold', color: 'theme-primary' }, // Assuming theme-primary is still desired
      dropDown: { color: 'theme-primary' }, // Assuming theme-primary is still desired
      field: { color: 'theme-primary' }, // Assuming theme-primary is still desired
    }}
  />
);
