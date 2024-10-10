import React from 'react';
import countryList from '../countries.json';
import { CountryPickerProps } from './CountryPicker.props';
import { Country } from './CountryPicker.type';
// Defines a custom hook for managing the CountryPicker component's state, including options from a country list, selected value, and UI states for hiding, focus, and hover.
export const useCountryPickerState = ({ placeholder }: CountryPickerProps) => {
  const [newOptions, setNewOptions] =
    React.useState<Array<Country>>(countryList);
  const [value, setValue] = React.useState<string>(
    placeholder ?? countryList[0].name
  );
  const [hide, setHide] = React.useState(true);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  return {
    hide,
    setHide,
    newOptions,
    setNewOptions,
    isHovered,
    setIsHovered,
    isFocused,
    setIsFocused,
    value,
    setValue,
  };
};
