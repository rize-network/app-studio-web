import React from 'react';

import { CountryPicker } from '../CountryPicker';

export const StyledCountryPicker = () => (
  <CountryPicker
    name="noColorScheme"
    views={{
      container: {
        borderRadius: 10,
        borderColor: 'theme.primary', // Assuming theme.primary is still desired
        borderStyle: 'solid',
        borderWidth: 1,
      },
      text: { color: 'theme.primary' }, // Assuming theme.primary is still desired
      label: { fontWeight: 'bold', color: 'theme.primary' }, // Assuming theme.primary is still desired
      dropDown: { color: 'theme.primary' }, // Assuming theme.primary is still desired
      field: { color: 'theme.primary' }, // Assuming theme.primary is still desired
    }}
  />
);
