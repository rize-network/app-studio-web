import React from 'react';
import { SwitchProps } from './Switch.props';
// This file defines a custom hook for managing the state of a Switch component. It allows tracking whether the switch is hovered, and its on/off state based on 'isDisabled' and 'isChecked' properties.
export const useSwitchState = ({ isDisabled, isChecked }: SwitchProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [on, setOn] = React.useState(isDisabled ? !isDisabled : isChecked);
  return { isHovered, setIsHovered, on, setOn };
};
