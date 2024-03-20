import React from 'react';
import format from 'date-fns/format';

export const useDatePickerState = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [date, setDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));

  return {
    date,
    setDate,
    isHovered,
    setIsHovered,
    isFocused,
    setIsFocused,
  };
};
