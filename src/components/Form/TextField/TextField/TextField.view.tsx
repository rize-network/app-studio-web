import React, { useMemo } from 'react';
import { Input, Typography, useTheme } from 'app-studio';
import { FieldContainer } from '../../../Layout/Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../../Layout/Input/FieldContent/FieldContent';
import { FieldIcons } from '../../../Layout/Input/FieldIcons/FieldIcons';
import { FieldLabel } from '../../../Layout/Input/FieldLabel/FieldLabel';
import { FieldWrapper } from '../../../Layout/Input/FieldWrapper/FieldWrapper';
import { CloseSvg } from '../../../Svg';

import { TextFieldViewProps } from './TextField.props';

const TextFieldInput = (props: any) => <Input type="text" {...props} />;

const TextFieldView: React.FC<TextFieldViewProps> = ({
  id,
  name,
  label,
  value,
  hint,
  inputValue,
  onChange,
  leftChild,
  rightChild,
  helperText,
  placeholder,
  onChangeText,
  shadow = {},
  styles = { box: {}, field: {}, label: {}, helperText: {}, text: {} },
  size = 'md',
  shape = 'default',
  variant = 'default',
  colorScheme = 'theme.primary',
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
  setInputValue = () => {},
  onClick = () => {},
  onFocus,
  onBlur = () => {},
  ...props
}) => {
  const { getColor } = useTheme();
  const IconColor = getColor('color.blueGray.700');

  const isWithLabel = !!(isFocused && label);

  useMemo(() => {
    setHint(
      isFocused && !inputValue ? placeholder ?? '' : label ?? placeholder
    );
  }, [inputValue, isFocused, label, placeholder]);

  const fieldStyles = {
    margin: 0,
    paddingVertical: 8,
    padddingHorizontal: 0,
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
    color: isDisabled ? 'color.trueGray.600' : 'color.blueGray.700',
    cursor: isDisabled ? 'not-allowed' : 'auto',
    ...styles['field'],
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleHover = () => setIsHovered(!isHovered);

  const handleBlur = (event: any) => {
    onBlur(event);
    setIsFocused(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    if (typeof event === 'string') {
      //for ios and android
      setInputValue(event);
      if (onChangeText) onChangeText(event);
    } else {
      //Web
      setInputValue(event.target.value);
      if (onChange) onChange(event);
    }
  };

  const handleClear = () => {
    setInputValue('');
    //Web
    if (onChange) {
      onBlur({ target: { name } });
      onChange({ target: { name, value: '' } });
    }
    //for ios and android
    if (typeof document === 'undefined' && onChangeText) onChangeText('');
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
        {leftChild}
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
          <TextFieldInput
            id={id}
            name={name}
            value={inputValue}
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
            {...(onChangeText && { onChangeText: handleChange })}
          />
        </FieldWrapper>
        {(rightChild || (isClearable && inputValue)) && (
          <FieldIcons>
            {rightChild && <>{rightChild}</>}
            {isClearable && inputValue && !isReadOnly && !isDisabled && (
              <CloseSvg
                size={Typography.fontSizes[size]}
                color={IconColor}
                onClick={handleClear}
              />
            )}
          </FieldIcons>
        )}
      </FieldContent>
    </FieldContainer>
  );
};

export default TextFieldView;
