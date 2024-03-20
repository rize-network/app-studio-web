import React from 'react';

import { CountryPickerProps } from '../Form/CountryPicker/CountryPicker/CountryPicker.props';
import { useCountryPickerState } from '../Form/CountryPicker/CountryPicker/CountryPicker.state';
import CountryPickerView from '../Form/CountryPicker/CountryPicker/CountryPicker.view';
import { useFormikInput } from './Formik.Hook';

const CountryPickerComponent: React.FC<CountryPickerProps> = (props) => {
  const formProps = useFormikInput(props);
  const countryPickerStates = useCountryPickerState(props);
  return <CountryPickerView {...countryPickerStates} {...formProps} />;
};

/**
 * Country picker allows users to select a country from a dropdown list or search field.
 */
export const FormikCountryPicker = CountryPickerComponent;
