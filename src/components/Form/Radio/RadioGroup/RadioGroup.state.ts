/**
 * RadioGroup State
 *
 * Manages the state for the RadioGroup component.
 */

import React from 'react';
import { RadioGroupProps } from './RadioGroup.props';

/**
 * Custom hook to manage the state of the RadioGroup component
 */
export const useRadioGroupState = ({
  value,
  defaultValue = '',
  onChange,
}: RadioGroupProps) => {
  // State for the selected value
  const [selectedValue, setSelectedValue] = React.useState<string>(
    value !== undefined ? value : defaultValue
  );

  // Update selectedValue when value prop changes
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Handle value change
  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setSelectedValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  return {
    selectedValue,
    setSelectedValue: handleValueChange,
  };
};
