/**
 * TextArea View Component
 *
 * Renders a multi-line text input field with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Element, Typography } from 'app-studio';
import {
  FieldContainer,
  FieldContent,
  FieldLabel,
  FieldWrapper,
} from '../../../Input';
import { TextAreaViewProps } from './TextArea.props';
const TextAreaView: React.FC<TextAreaViewProps> = ({
  id,
  name,
  hint,
  error,
  value,
  label,
  shadow,
  helperText,
  placeholder,
  size = 'sm',
  shape = 'default',
  variant = 'default',
  isHovered = false,
  isFocused = false,
  isEditable = false,
  isReadOnly = false,
  isDisabled = false,
  isAutoFocus = false,
  isMultiline = false,
  maxRows = 3,
  maxCols = 30,
  onBlur = () => {},
  onChange,
  onFocus,
  setHint = () => {},
  setValue = () => {},
  setIsFocused = () => {},
  setIsHovered = () => {},
  views = { label: {}, helperText: {} },
  ...props
}) => {
  const showLabel = !!label;
  const fieldSizeStyles = {
    xs: {
      minHeight: '72px',
      shellPaddingY: 6,
      shellPaddingX: 10,
      fontSize: 12,
      lineHeight: '16px',
    },
    sm: {
      minHeight: '88px',
      shellPaddingY: 8,
      shellPaddingX: 10,
      fontSize: 12,
      lineHeight: '16px',
    },
    md: {
      minHeight: '104px',
      shellPaddingY: 10,
      shellPaddingX: 12,
      fontSize: 14,
      lineHeight: '20px',
    },
    lg: {
      minHeight: '120px',
      shellPaddingY: 12,
      shellPaddingX: 14,
      fontSize: 16,
      lineHeight: '24px',
    },
    xl: {
      minHeight: '136px',
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
    minHeight: fieldSizeStyles[size].minHeight,
    maxHeight: 'calc(100vh - 100px)',
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
  const handleHover = () => setIsHovered(!isHovered);
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };
  const handleBlur = (event: any) => {
    onBlur(event);
    setIsFocused(false);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    if (typeof event === 'string') {
      setValue(event);
      if (onChange) onChange(event);
    } else {
      setValue(event.target.value);
      if (onChange) onChange(event.target.value);
    }
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
        alignItems="flex-start"
        minHeight={fieldSizeStyles[size].minHeight}
        paddingTop={fieldSizeStyles[size].shellPaddingY}
        paddingBottom={fieldSizeStyles[size].shellPaddingY}
        paddingLeft={fieldSizeStyles[size].shellPaddingX}
        paddingRight={fieldSizeStyles[size].shellPaddingX}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...views?.content}
      >
        <FieldWrapper {...views?.warper}>
          {showLabel && (
            <FieldLabel
              htmlFor={id}
              color={'theme-primary'}
              error={error}
              {...views?.label}
            >
              {label}
            </FieldLabel>
          )}
          <Element
            as="textarea"
            id={id}
            name={name}
            rows={maxRows}
            cols={maxCols}
            value={value}
            readOnly={isReadOnly}
            disabled={isDisabled}
            autoFocus={isAutoFocus}
            placeholder={placeholder || hint}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={(e) => handleChange(e as any)}
            {...fieldStyles}
            {...props}
            style={{
              resize: isDisabled || isReadOnly ? 'none' : 'vertical',
            }}
            {...views?.textarea}
          />
        </FieldWrapper>
      </FieldContent>
    </FieldContainer>
  );
};
export default TextAreaView;
