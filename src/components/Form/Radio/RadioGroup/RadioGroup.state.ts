import React from 'react';
import { RadioGroupProps } from './RadioGroup.props';
// This file defines the `useRadioGroupState` hook, which centralizes the state management logic for the RadioGroup component. It handles the internal selected value, manages updates from both controlled and uncontrolled props, and provides a consistent way to update the selected option.
export const useRadioGroupState = ({
  value,
  defaultValue = '',
  onChange,
}: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(
    value !== undefined ? value : defaultValue
  );
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);
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
