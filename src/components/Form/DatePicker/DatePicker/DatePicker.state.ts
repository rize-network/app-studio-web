import React from 'react';
import format from 'date-fns/format';

import { DatePickerProps } from './DatePicker.props';

// `value`/`defaultValue` arrive through ViewProps as
// `string | number | readonly string[]`; a date input only understands a
// `yyyy-MM-dd` string, so anything else falls back to the default.
const toDateString = (value: DatePickerProps['value']): string | undefined =>
  typeof value === 'string' ? value : undefined;

export const useDatePickerState = ({
  value,
  defaultValue,
}: Pick<DatePickerProps, 'value' | 'defaultValue'> = {}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [date, setDate] = React.useState(
    () =>
      toDateString(value) ??
      toDateString(defaultValue) ??
      format(new Date(), 'yyyy-MM-dd')
  );

  // Controlled usage: when the consumer drives `value`, the bound input value
  // must follow it.
  const controlledValue = toDateString(value);
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setDate(controlledValue);
    }
  }, [controlledValue]);

  return {
    date,
    setDate,
    isHovered,
    setIsHovered,
    isFocused,
    setIsFocused,
  };
};
