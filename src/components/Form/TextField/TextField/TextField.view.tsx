/**
 * TextField View Component
 *
 * Renders a text input field with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Input, useTheme } from 'app-studio';
import { FieldContainer } from '../../../Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../../Input/FieldContent/FieldContent';
import { FieldIcons } from '../../../Input/FieldIcons/FieldIcons';
import { FieldLabel } from '../../../Input/FieldLabel/FieldLabel';
import { FieldWrapper } from '../../../Input/FieldWrapper/FieldWrapper';
import { CloseIcon } from '../../../Icon/Icon';
import { TextFieldViewProps } from './TextField.props';

/**
 * Input component for text fields
 */
const TextFieldInput = (props: any) => <Input type="text" {...props} />;
const TextFieldView: React.FC<TextFieldViewProps> = ({
  id,
  name,
  label,
  hint,
  value,
  onChange,
  left,
  right,
  helperText,
  placeholder,
  onChangeText,
  shadow = {},
  views = { container: {}, field: {}, label: {}, helperText: {}, text: {} },
  size = 'md',
  shape = 'default',
  variant = 'default',
  error = false,
  isFocused = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  isClearable = true,
  isAutoFocus = false,
  setHint = () => {},
  setIsFocused = () => {},
  setIsHovered = () => {},
  setValue = () => {},
  onClick = () => {},
  onFocus,
  onBlur = () => {},
  themeMode: elementMode,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const IconColor = getColor(isDisabled ? 'color-gray-400' : 'color-gray-500', {
    themeMode: elementMode ? elementMode : themeMode,
  });
  const showLabel = !!label;
  const fieldSizeStyles = {
    xs: {
      minHeight: 24,
      shellPaddingY: 6,
      shellPaddingX: 10,
      fontSize: 12,
      lineHeight: '16px',
    },
    sm: {
      minHeight: 32,
      shellPaddingY: 8,
      shellPaddingX: 10,
      fontSize: 12,
      lineHeight: '16px',
    },
    md: {
      minHeight: 40,
      shellPaddingY: 10,
      shellPaddingX: 12,
      fontSize: 14,
      lineHeight: '20px',
    },
    lg: {
      minHeight: 48,
      shellPaddingY: 12,
      shellPaddingX: 14,
      fontSize: 16,
      lineHeight: '24px',
    },
    xl: {
      minHeight: 56,
      shellPaddingY: 14,
      shellPaddingX: 16,
      fontSize: 18,
      lineHeight: '28px',
    },
  } as const;
  const fieldStyles = {
    margin: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: '100%',
    minHeight: 'auto',
    border: 'none',
    on: {
      focus: {
        outline: 'none',
      },
    },
    fontSize: fieldSizeStyles[size].fontSize,
    letterSpacing: '-0.01em',
    fontWeight: 400,
    backgroundColor: 'transparent',
    color: isDisabled ? 'color-gray-400' : 'color-gray-900',
    cursor: isDisabled ? 'not-allowed' : 'text',
    opacity: isDisabled ? 0.7 : 1,
    transition: 'color 0.2s ease, opacity 0.2s ease',
    ...views['field'],
  };
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleBlur = (event: any) => {
    if (onBlur) onBlur(event);
    setIsFocused(false);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    if (typeof event === 'string') {
      setValue(event);
      if (onChangeText) onChangeText(event);
      if (onChange) onChange(event);
    } else {
      setValue(event.target.value);
      if (onChangeText) onChangeText(event.target.value);
      if (onChange) onChange(event.target.value);
    }
  };
  const handleClear = () => {
    setValue('');
    if (onChange) {
      onBlur({ target: { name } });
      if (onChangeText) onChangeText('');
      if (onChange) onChange('');
    }
    if (typeof document === 'undefined' && onChangeText) onChangeText('');
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
        variant={variant}
        value={value}
        color={'theme-primary'}
        isHovered={isHovered}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isFocused={isFocused}
        showLabel={showLabel}
        minHeight={`${fieldSizeStyles[size].minHeight}px`}
        paddingTop={fieldSizeStyles[size].shellPaddingY}
        paddingBottom={fieldSizeStyles[size].shellPaddingY}
        paddingLeft={fieldSizeStyles[size].shellPaddingX}
        paddingRight={fieldSizeStyles[size].shellPaddingX}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {left}
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
          <TextFieldInput
            id={id}
            name={name}
            readOnly={isReadOnly}
            disabled={isDisabled}
            autoFocus={isAutoFocus}
            placeholder={placeholder || hint}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            {...fieldStyles}
            {...props}
            onChange={handleChange}
            value={value}
          />
        </FieldWrapper>
        {isClearable && value && !isReadOnly && !isDisabled && (
          <FieldIcons>
            <CloseIcon
              size={20}
              color={IconColor}
              onClick={handleClear}
              cursor="pointer"
              borderRadius="50%"
              transition="background-color 0.2s ease, transform 0.2s ease"
              _hover={{
                backgroundColor: 'color-gray-100',
                transform: 'scale(1.05)',
              }}
              _active={{
                transform: 'scale(0.95)',
              }}
            />
          </FieldIcons>
        )}
        {right}
      </FieldContent>
    </FieldContainer>
  );
};
export default TextFieldView;
