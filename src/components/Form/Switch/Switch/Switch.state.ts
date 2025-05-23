import React, { useEffect } from 'react';
import { SwitchProps } from './Switch.props';

// This file defines a custom hook for managing the state of a Switch component.
// It allows tracking whether the switch is hovered, and its on/off state based on 'isDisabled' and 'isChecked' properties.
export const useSwitchState = ({ isDisabled, isChecked }: SwitchProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [on, setOn] = React.useState(isChecked || false);
  const [value, setValue] = React.useState(isChecked || false);

  // Update the value when isChecked changes
  useEffect(() => {
    if (isChecked !== undefined) {
      setOn(isChecked);
      setValue(isChecked);
    }
  }, [isChecked]);

  return {
    isHovered,
    setIsHovered,
    on,
    setOn,
    value,
    setValue,
  };
};
