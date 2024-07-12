import React from 'react';

import { SelectProps } from './Select.props';

export const useSelectState = ({
  placeholder,
  isMulti,
  options,
}: SelectProps) => {
  const defaultValue = placeholder ? (isMulti ? [] : '') : options[0].value;

  const [hide, setHide] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState<string | string[]>(defaultValue);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(0);
  return {
    value,
    setValue,
    hide,
    setHide,
    isHovered,
    setIsHovered,
    isFocused,
    setIsFocused,
    highlightedIndex,
    setHighlightedIndex,
  };
};

export const useItemState = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return { isHovered, setIsHovered };
};
