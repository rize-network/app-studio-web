import React, { useMemo } from 'react';
import { Element, Typography } from 'app-studio';
import { FieldContainer, FieldContent, FieldLabel, FieldWrapper } from 'src/components/Layout/Input';

import { TextAreaViewProps } from './TextArea.props';

const TextAreaView: React.FC<TextAreaViewProps> = ({
  id,
  name,
  hint,
  error,
  value,
  label,
  shadow,
  inputValue,
  helperText,
  placeholder,
  defaultValue,
  size = 'sm',
  shape = 'default',
  variant = 'default',
  colorScheme = 'theme.primary',
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
  onChangeText,
  setHint = () => {},
  setInputValue = () => {},
  setIsFocused = () => {},
  setIsHovered = () => {},
  styles = { box: {}, text: {}, label: {}, helperText: {}, field: {} },
  ...props
}) => {
  const isWithLabel = !!(isFocused && label);

  useMemo(() => {
    setHint(isFocused && !inputValue ? placeholder ?? '' : label ?? placeholder);
  }, [inputValue, isFocused, label, placeholder]);

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
      },
    },
    fontSize: Typography.fontSizes[size],
    backgroundColor: 'transparent',
    color: isDisabled ? 'trueGray.600' : 'blueGray.700',
    cursor: isDisabled ? 'not-allowed' : 'auto',
    ...styles['field'],
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof event === 'string') {
      //for ios and android
      setInputValue(event);
      if (onChangeText) onChangeText(event);
    } else {
      setInputValue(event.target.value);
      if (onChange) onChange(event);
    }
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
        value={inputValue}
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
            <FieldLabel htmlFor={id} color={colorScheme} error={error} {...styles}>
              {label}
            </FieldLabel>
          )}
          <Element
            as="textarea"
            id={id}
            name={name}
            rows={maxRows}
            cols={maxCols}
            value={inputValue}
            readOnly={isReadOnly}
            disabled={isDisabled}
            autoFocus={isAutoFocus}
            editable={isEditable}
            placeholder={hint}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleChange}
            multiline={isMultiline}
            {...fieldStyles}
            {...props}
            {...(onChangeText && { onChangeText: handleChange })}
          />
        </FieldWrapper>
      </FieldContent>
    </FieldContainer>
  );
};

export default TextAreaView;
