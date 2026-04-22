import React from 'react';
import { Input, Typography, useTheme } from 'app-studio';
import { FieldContainer } from '../../../Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../../Input/FieldContent/FieldContent';
import { FieldLabel } from '../../../Input/FieldLabel/FieldLabel';
import { FieldWrapper } from '../../../Input/FieldWrapper/FieldWrapper';

import { DatePickerViewProps } from './DatePicker.props';

const DatePickerContent = (props: any) => <Input type="date" {...props} />;

const DatePickerView: React.FC<DatePickerViewProps> = ({
  id,
  icon,
  name,
  label,
  date,
  children,
  helperText,
  shadow = {},
  size = 'md',
  variant = 'default',
  shape = 'default',
  views = { container: {}, label: {}, helperText: {}, text: {}, field: {} },
  error = false,
  isHovered = false,
  isFocused = false,
  isDisabled = false,
  isReadOnly = false,
  setDate = () => {},
  setIsFocused = () => {},
  setIsHovered = () => {},
  onChange,
  onChangeText,
  ...props
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  const showLabel = !!(isFocused && label);

  const handleHover = () => setIsHovered(!isHovered);
  const handleFocus = () => setIsFocused(true);

  const handleDateChange = (event: any) => {
    if (typeof event === 'string') {
      setDate(event);
      if (onChangeText) onChangeText(event);
    } else {
      setDate(event.target.value);
      if (onChange) onChange(event.target.value);
    }
  };

  const fieldStyles = {
    margin: 0,
    paddingVertical: 8,
    paddingHorizontal: 0,
    width: '100%',
    heigth: '100%',
    border: 'none',
    on: {
      focus: {
        outline: 'none',
        backgroundColor: 'transparent',
      },
    },
    transition: 'all 0.2s ease-in-out',
    fontSize: Typography.fontSizes[size],
    backgroundColor: 'transparent',
    color: isDisabled
      ? isDark
        ? 'color-gray-500'
        : 'color-gray-400'
      : isDark
      ? 'color-gray-100'
      : 'color-gray-900',
    cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'auto' : 'pointer',
    ...views['field'],
  };

  return (
    <FieldContainer helperText={helperText} error={error} views={views}>
      <FieldContent
        label={label}
        size={size}
        error={error}
        shape={shape}
        views={views}
        shadow={shadow}
        color={'theme-primary'}
        variant={variant}
        value={date}
        isHovered={isHovered}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isFocused={isFocused}
        showLabel={showLabel}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <FieldWrapper>
          {showLabel && (
            <FieldLabel
              htmlFor={id}
              color={'theme-primary'}
              error={error}
              {...views}
            >
              {label}
            </FieldLabel>
          )}
          <DatePickerContent
            id={id}
            name={name}
            onFocus={handleFocus}
            disabled={isDisabled}
            readOnly={isReadOnly}
            {...fieldStyles}
            {...props}
            {...(onChangeText && { onChangeText: handleDateChange })}
            onChange={handleDateChange}
          />
        </FieldWrapper>
      </FieldContent>
    </FieldContainer>
  );
};

export default DatePickerView;
