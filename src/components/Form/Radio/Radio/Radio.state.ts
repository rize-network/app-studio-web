/**
 * Radio State
 *
 * Manages the state for the Radio component.
 */

import React from 'react';
import { RadioProps } from './Radio.props';

/**
 * Custom hook to manage the state of the Radio component
 */
export const useRadioState = ({
  defaultIsSelected = false,
  isChecked,
}: RadioProps) => {
  // State for hover
  const [isHovered, setIsHovered] = React.useState(false);

  // State for selection
  const [isSelected, setIsSelected] = React.useState<boolean>(
    isChecked !== undefined ? isChecked : defaultIsSelected
  );

  // Update isSelected when isChecked prop changes
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
