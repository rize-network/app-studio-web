import React from 'react';
import { CountryPickerProps } from './CountryPicker/CountryPicker.props';
// Uses the custom hook 'useCountryPickerState' to manage state specific to the CountryPicker component.
import { useCountryPickerState } from './CountryPicker/CountryPicker.state';
import CountryPickerView from './CountryPicker/CountryPicker.view';
// Defines the CountryPickerComponent as a functional component with type 'React.FC' that takes 'CountryPickerProps' as props.
const CountryPickerComponent: React.FC<CountryPickerProps> = (props) => {
  // Invokes the 'useCountryPickerState' hook to obtain state and methods related to country picking functionality.
  const countryPickerStates = useCountryPickerState(props);
  // Renders the CountryPickerView component passing in state and props for dynamic UI representation.
  return <CountryPickerView {...countryPickerStates} {...props} />;
};
// Exports the CountryPickerComponent for use in other parts of the application as 'CountryPicker'.
export const CountryPicker = CountryPickerComponent;
