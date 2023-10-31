import React from 'react';

import { CountryPickerProps } from './CountryPicker/CountryPicker.props';
import { useCountryPickerState } from './CountryPicker/CountryPicker.state';
import CountryPickerView from './CountryPicker/CountryPicker.view';

const CountryPickerComponent: React.FC<CountryPickerProps> = (props) => {
  const countryPickerStates = useCountryPickerState(props);

  return <CountryPickerView {...countryPickerStates} {...props} />;
};

/**
 * Country picker allows users to select a country from a dropdown list or search field.
 */
export const CountryPicker = CountryPickerComponent;
