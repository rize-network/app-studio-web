import React, { useEffect, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import { Input, Typography, useTheme } from 'app-studio';
import { FieldContainer } from '../../Layout/Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../Layout/Input/FieldContent/FieldContent';
import { FieldLabel } from '../../Layout/Input/FieldLabel/FieldLabel';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { View } from '../../Layout/View/View';
import { OTPInputViewProps } from './OTPInput.props';

const OTPInputView: React.FC<
  OTPInputViewProps & {
    setInputRef: (index: number, ref: HTMLInputElement | null) => void;
    focusInput: (index: number) => void;
  }
> = ({
  id,
  name,
  label,
  value,
  length = 6,
  onChange,
  onChangeText,
  helperText,
  placeholder = '',
  shadow,
  views = {
    container: {},
    input: {},
    box: {},
    text: {},
    label: {},
    helperText: {},
  },
  size = 'md',
  shape = 'rounded',
  variant = 'outline',
  gap = 8,
  error = false,
  isFocused = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  isAutoFocus = false,
  setValue,
  setIsFocused,
  setIsHovered,
  setInputRef,
  focusInput,
  onBlur = () => {},
  onClick = () => {},
  onFocus = () => {},
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const isWithLabel = !!label;

  // Split the value into an array of characters
  const valueArray = value.split('');

  // Handle input change
  const handleChange = (index: number, inputValue: string) => {
    if (isDisabled || isReadOnly) return;

    // Only allow digits
    const digit = inputValue.replace(/[^0-9]/g, '');

    if (digit) {
      // Create a new value with the digit at the specified index
      const newValue = [...valueArray];
      newValue[index] = digit.charAt(0);

      // Fill in the new value
      const updatedValue = newValue.join('').slice(0, length);

      // Update the value
      setValue(updatedValue);
      onChange?.(updatedValue);
      onChangeText?.(updatedValue);

      // Focus the next input if available
      if (index < length - 1) {
        focusInput(index + 1);
      }
    }
  };

  // Handle key press
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled || isReadOnly) return;

    // Handle backspace
    if (e.key === 'Backspace') {
      e.preventDefault();

      // If the current input has a value, clear it
      if (valueArray[index]) {
        const newValue = [...valueArray];
        newValue[index] = '';
        const updatedValue = newValue.join('');

        setValue(updatedValue);
        onChange?.(updatedValue);
        onChangeText?.(updatedValue);
      }
      // Otherwise, go to the previous input
      else if (index > 0) {
        focusInput(index - 1);
      }
    }
    // Handle arrow keys
    else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  // Handle paste
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (isDisabled || isReadOnly) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    // Filter out non-digits and limit to the length
    const digits = pastedData.replace(/[^0-9]/g, '').slice(0, length);

    if (digits) {
      // Pad with empty strings if needed
      const newValue = digits.padEnd(length, '').slice(0, length);

      setValue(digits);
      onChange?.(digits);
      onChangeText?.(digits);

      // Focus the last input
      if (digits.length === length) {
        focusInput(length - 1);
      } else {
        focusInput(digits.length);
      }
    }
  };

  // Handle focus
  const handleFocus = (index: number) => {
    setIsFocused(true);
    onFocus?.();
  };

  // Handle blur
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.(value);
  };

  // Handle hover
  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  // Auto-focus the first input on mount
  useEffect(() => {
    if (isAutoFocus) {
      focusInput(0);
    }
  }, [isAutoFocus]);

  return (
    <FieldContainer helperText={helperText} error={error} views={views}>
      {isWithLabel && (
        <FieldLabel
          htmlFor={id}
          color={'theme.primary'}
          error={error}
          {...views.label}
        >
          {label}
        </FieldLabel>
      )}

      <Horizontal
        gap={gap}
        width="100%"
        justifyContent="center"
        {...views.container}
      >
        {Array.from({ length }, (_, index) => (
          <FieldContent
            key={`${id || name}-${index}`}
            size={size}
            error={error}
            shape={shape}
            views={views}
            // shadow={shadow}
            variant={variant}
            value={valueArray[index] || ''}
            color={'theme.primary'}
            isHovered={isHovered}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isFocused={isFocused}
            isWithLabel={false}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            width={40}
            height={40}
            justifyContent="center"
            alignItems="center"
            {...views.box}
          >
            <Input
              ref={(ref) => setInputRef(index, ref as any)}
              id={`${id || name}-${index}`}
              name={`${name}-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              readOnly={isReadOnly}
              disabled={isDisabled}
              placeholder={placeholder}
              value={valueArray[index] || ''}
              onChange={(e: any) => handleChange(index, e.target.value)}
              onKeyDown={(e: any) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              onClick={onClick}
              autoComplete="off"
              textAlign="center"
              width="100%"
              height="100%"
              fontSize={Typography.fontSizes[size]}
              {...views.input}
            />
          </FieldContent>
        ))}
      </Horizontal>
    </FieldContainer>
  );
};

export default OTPInputView;
