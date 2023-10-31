import React from 'react';

import { DatePickerProps } from './DatePicker/DatePicker.props';
import { useDatePickerState } from './DatePicker/DatePicker.state';
import DatePickerView from './DatePicker/DatePicker.view';

const DatePickerComponent: React.FC<DatePickerProps> = (props) => {
  const datePickerStates = useDatePickerState();
  return <DatePickerView {...datePickerStates} {...props} />;
};

/**
 * Date picker allows users to select a date from a calendar view.
 */
export const DatePicker = DatePickerComponent;
