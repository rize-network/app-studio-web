import React from 'react';

import { DatePicker } from '../DatePicker';

export const StyledDatePicker = () => (
  <DatePicker
    colorScheme="theme.primary"
    shadow={{ boxShadow: 'rgba(93, 37, 85, 0.3) 0px 3px 8px' }}
    styles={{
      box: { borderRadius: 10, borderColor: 'theme.primary' },
      label: { color: 'theme.primary' },
    }}
  />
);
