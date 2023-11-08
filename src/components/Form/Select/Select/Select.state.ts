import React from 'react';

import { SelectProps } from './Select.props';

export const useSelectState = ({
  placeholder,
  isMulti,
  options,
}: SelectProps) => {
  const defaultSelected = placeholder ? (isMulti ? [] : '') : options[0];

  const [hide, setHide] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [selected, setSelected] = React.useState<string | Array<string>>(
    defaultSelected
  );
  return {
    selected,
    setSelected,
    hide,
    setHide,
    isHovered,
    setIsHovered,
    isFocused,
    setIsFocused,
  };
};

export const useItemState = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return { isHovered, setIsHovered };
};
