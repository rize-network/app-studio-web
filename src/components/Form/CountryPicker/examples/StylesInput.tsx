import React from 'react';

import { CountryPicker } from '../CountryPicker';

export const StyledCountryPicker = () => (
  <CountryPicker
    name="colorScheme"
    colorScheme="theme.primary"
    styles={{
      box: {
        borderRadius: 10,
        borderColor: 'theme.primary',
        borderStyle: 'solid',
        borderWidth: 1,
      },
      text: { color: 'theme.primary' },
      label: { fontWeight: 'bold', color: 'theme.primary' },
      dropDown: { color: 'theme.primary' },
      field: { color: 'theme.primary' },
    }}
  />
);
