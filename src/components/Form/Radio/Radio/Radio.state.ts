import React from 'react';
import { RadioProps } from './Radio.props';
// This file defines the `useRadioState` hook, which centralizes the state management for the Radio component, handling its selection and hover states.
export const useRadioState = ({
  defaultIsSelected = false,
  isChecked,
}: RadioProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState<boolean>(
    isChecked !== undefined ? isChecked : defaultIsSelected
  );
  React.useEffect(() => {
    if (isChecked !== undefined) {
      setIsSelected(isChecked);
    }
  }, [isChecked]);
  return {
    isHovered,
    setIsHovered,
    isSelected,
    setIsSelected,
  };
};
