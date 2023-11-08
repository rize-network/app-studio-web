import React from 'react';

import countryList from '../countries.json';

import { CountryPickerProps } from './CountryPicker.props';
import { Country } from './CountryPicker.type';

export const useCountryPickerState = ({ placeholder }: CountryPickerProps) => {
  const [newOptions, setNewOptions] =
    React.useState<Array<Country>>(countryList);
  const [selected, setSelected] = React.useState<string>(
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
    selected,
    setSelected,
  };
};
