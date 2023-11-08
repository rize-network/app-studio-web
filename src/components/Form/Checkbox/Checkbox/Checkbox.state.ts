import React from 'react';

import { CheckboxProps } from './Checkbox.props';

export const useCheckboxState = ({
  defaultIsSelected = false,
}: CheckboxProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isSelected, setIsSelected] =
    React.useState<boolean>(defaultIsSelected);

  return {
    isHovered,
    setIsHovered,
    isSelected,
    setIsSelected,
  };
};
