import React from 'react';
import { DatePicker } from '../../../Form/DatePicker/DatePicker';

export const HelperTextDatePicker = () => (
  <DatePicker
    id="error"
    name="error"
    error
    helperText="Please select another date"
  />
);
