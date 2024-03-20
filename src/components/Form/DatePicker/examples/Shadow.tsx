import React from 'react';
import { DatePicker } from '../../../Form/DatePicker/DatePicker';

export const ShadowDatePicker = () => (
  <DatePicker
    shadow={{
      boxShadow: 'rgba(0, 0, 0, 0.20) 0px 3px 8px',
    }}
  />
);
