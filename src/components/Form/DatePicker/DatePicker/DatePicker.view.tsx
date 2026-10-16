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
  // Consumed by the state hook; kept out of the DOM spread so they cannot
  // fight the controlled `value={date}` binding below.
  value,
  defaultValue,
  ...props
}) => {
  const { themeMode } = useTheme();
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const isDark = themeMode === 'dark';
  // The label is part of the field's accessible name; it must not disappear
  // whenever the field loses focus.
  const showLabel = !!label;

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
    // The field shell above already applies the vertical padding for the
    // current size. Adding 8px here on top of it pushed a `md` DatePicker to
    // 57px against a declared 40px.
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: '100%',
    height: '100%',
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
    color: isDisabled ? 'color-gray-400' : 'color-gray-900',
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
              htmlFor={fieldId}
              color={'theme-primary'}
              error={error}
              views={views}
            >
              {label}
            </FieldLabel>
          )}
          <DatePickerContent
            id={fieldId}
            name={name}
            // Native date inputs have no implicit ARIA mapping (aria-query);
            // textbox is how VoiceOver exposes them, and it keeps the control
            // findable by role + accessible name. Consumers can still override
            // via the `role` prop, which arrives through {...props} below.
            role="textbox"
            // The visible label only renders while focused; without this the
            // input has no accessible name at rest.
            aria-label={
              !showLabel && typeof label === 'string' ? label : undefined
            }
            onFocus={handleFocus}
            disabled={isDisabled}
            readOnly={isReadOnly}
            {...fieldStyles}
            {...props}
            {...(onChangeText && { onChangeText: handleDateChange })}
            onChange={handleDateChange}
            value={date}
          />
        </FieldWrapper>
      </FieldContent>
    </FieldContainer>
  );
};

export default DatePickerView;
