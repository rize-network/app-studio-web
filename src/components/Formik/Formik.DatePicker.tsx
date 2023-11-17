import React from 'react';

import { DatePickerProps } from '../Form/DatePicker/DatePicker/DatePicker.props';
import { useDatePickerState } from '../Form/DatePicker/DatePicker/DatePicker.state';
import DatePickerView from '../Form/DatePicker/DatePicker/DatePicker.view';
import { useFormikInput } from './Formik.Hook';

const DatePickerComponent: React.FC<DatePickerProps> = (props) => {
  const formProps = useFormikInput(props);

  const datePickerStates = useDatePickerState();
  return <DatePickerView {...datePickerStates} {...formProps} />;
};

/**
 * Date picker allows users to select a date from a calendar view.
 */
export const FormikDatePicker = DatePickerComponent;
