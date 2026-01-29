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
  const showLabel = !!(isFocused && label);
  /**
   * Styles for the textarea field
   * Design tokens:
   * - Typography: -0.01em letter-spacing for modern feel
   * - Colors: Gray-900 for text, Gray-400 for disabled
   * - Transitions: 200ms ease-out for smooth feedback
   * - Line height: 1.5x font size for multi-line readability
   * - Min height: 5em for comfortable editing area
   */
  const fieldStyles = {
    // Layout properties
    margin: 0,
    paddingVertical: 4, // 1 × 4px grid - matched with TextField
    paddingHorizontal: 0,
    width: '100%',
    minHeight: '5em', // Use minHeight instead of fixed height for flexibility
    maxHeight: 'calc(100vh - 100px)',
    border: 'none',

    // Focus state
    on: {
      focus: {
        outline: 'none',
      },
    },

    // Typography properties
    fontSize: Typography.fontSizes[size],
    lineHeight: `${Math.round(Typography.fontSizes[size] * 1.5)}px`, // 1.5x for multi-line readability
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
    <FieldContainer
      helperText={helperText}
      error={error}
      views={views}
      {...props}
    >
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
            editable={`${!!isEditable.toString()}`}
            placeholder={hint}
            onBlur={handleBlur}
            onFocus={handleFocus}
            multiline={`${!!isMultiline.toString()}`}
            onChange={(e) => handleChange(e as any)}
            {...fieldStyles}
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
