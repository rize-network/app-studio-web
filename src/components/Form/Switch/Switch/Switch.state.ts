import React from 'react';

import { SwitchProps } from './Switch.props';

export const useSwitchState = ({ isDisabled, isChecked }: SwitchProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const [on, setOn] = React.useState(isDisabled ? !isDisabled : isChecked);

  return { isHovered, setIsHovered, on, setOn };
};
