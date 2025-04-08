import { useState } from 'react';
import { SliderProps } from './Slider.props';

export const useSliderState = ({ value = 0, onChange }: SliderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const setValue = (newValue: number) => {
    setCurrentValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return {
    isHovered,
    setIsHovered,
    value: currentValue,
    setValue,
  };
};
