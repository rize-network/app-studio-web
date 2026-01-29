/**
 * TextField View Component
 *
 * Renders a text input field with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Input, Typography, useTheme } from 'app-studio';
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
  const IconColor = getColor('color-blueGray-700', {
    themeMode: elementMode ? elementMode : themeMode,
  });
  const showLabel = !!(isFocused && label);
  /**
   * Styles for the input field
   * Design tokens:
   * - Typography: -0.01em letter-spacing for modern feel
   * - Colors: Gray-900 for text, Gray-400 for disabled, Gray-500 for placeholder
   * - Transitions: 200ms ease-out for smooth feedback
   * - Line height: 1.4x font size for optimal readability
   */
  const fieldStyles = {
    // Layout properties
    margin: 0,
    paddingVertical: 4, // 2 × 4px grid
    paddingHorizontal: 0,
    width: '100%',
    height: '100%',
    border: 'none',

    // Focus state
    on: {
      focus: {
        outline: 'none',
      },
    },

    // Typography properties
    fontSize: Typography.fontSizes[size],
    lineHeight: `${Math.round(Typography.fontSizes[size] * 1.4)}px`, // 1.4x for better readability
    letterSpacing: '-0.01em', // Slight negative tracking for modern look
    fontWeight: 400,

    // Visual properties
    backgroundColor: 'transparent',
    color: isDisabled ? 'color-gray-400' : 'color-gray-900',

    // State properties
    cursor: isDisabled ? 'not-allowed' : 'text',
    opacity: isDisabled ? 0.7 : 1,

    // Animation - smooth transitions for all interactive states
    transition: 'color 200ms ease-out, opacity 200ms ease-out',

    // Apply custom field styles
    ...views['field'],
  };
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };
  const handleHover = () => setIsHovered(!isHovered);
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
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
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
            placeholder={hint}
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
              transition="background-color 150ms ease-out, transform 150ms ease-out"
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
