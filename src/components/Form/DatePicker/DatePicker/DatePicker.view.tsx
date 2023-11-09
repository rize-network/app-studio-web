import React from 'react';
import { Input, Typography } from 'app-studio';
import { FieldContainer } from '../../../Layout/Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../../Layout/Input/FieldContent/FieldContent';
import { FieldLabel } from '../../../Layout/Input/FieldLabel/FieldLabel';
import { FieldWrapper } from '../../../Layout/Input/FieldWrapper/FieldWrapper';

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
  colorScheme = 'theme.primary',
  styles = { box: {}, label: {}, helperText: {}, text: {}, field: {} },
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
  const isWithLabel = !!(isFocused && label);

  const handleHover = () => setIsHovered(!isHovered);
  const handleFocus = () => setIsFocused(true);

  const handleDateChange = (event: any) => {
    if (typeof event === 'string') {
      setDate(event);
      if (onChangeText) onChangeText(event);
    } else {
      setDate(event.target.value);
      if (onChange) onChange(event);
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
    fontSize: Typography.fontSizes[size],
    backgroundColor: 'transparent',
    color: isDisabled ? 'color.trueGray.600' : 'color.blueGray.700',
    cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'auto' : 'pointer',
    ...styles['field'],
  };

  return (
    <FieldContainer helperText={helperText} error={error} styles={styles}>
      <FieldContent
        label={label}
        size={size}
        error={error}
        shape={shape}
        styles={styles}
        shadow={shadow}
        variant={variant}
        value={date}
        color={colorScheme}
        isHovered={isHovered}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isFocused={isFocused}
        isWithLabel={isWithLabel}
        colorScheme={colorScheme}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <FieldWrapper>
          {isWithLabel && (
            <FieldLabel
              htmlFor={id}
              color={colorScheme}
              error={error}
              {...styles}
            >
              {label}
            </FieldLabel>
          )}
          <DatePickerContent
            id={id}
            name={name}
            value={date}
            onFocus={handleFocus}
            onChange={handleDateChange}
            disabled={isDisabled}
            readOnly={isReadOnly}
            {...fieldStyles}
            {...(onChangeText && { onChangeText: handleDateChange })}
            {...props}
          />
        </FieldWrapper>
      </FieldContent>
    </FieldContainer>
  );
};

export default DatePickerView;
