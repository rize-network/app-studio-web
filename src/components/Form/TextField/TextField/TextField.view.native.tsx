/**
 * TextField View Component (React Native)
 *
 * React Native counterpart of TextField.view.tsx. Uses app-studio's <Input/>
 * which maps to RN <TextInput/>. Drops web-only CSS (cursor, _hover, transition,
 * boxShadow, outline, autofill) and relies on the native focus indicator.
 *
 * NOTE: Password.tsx delegates to this view passing `type` ("text" | "password").
 * We translate that into `secureTextEntry` here so Password works for free.
 */

import React from 'react';
import { Input, useTheme, View } from 'app-studio';
import { FieldContainer } from '../../../Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../../Input/FieldContent/FieldContent';
import { FieldIcons } from '../../../Input/FieldIcons/FieldIcons';
import { FieldLabel } from '../../../Input/FieldLabel/FieldLabel';
import { FieldWrapper } from '../../../Input/FieldWrapper/FieldWrapper';
import { CloseIcon } from '../../../Icon/Icon';
import { TextFieldViewProps } from './TextField.props';

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
  isMultiline = false,
  rows,
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
    xs: { minHeight: 24, shellPaddingY: 6, shellPaddingX: 10, fontSize: 12 },
    sm: { minHeight: 32, shellPaddingY: 8, shellPaddingX: 10, fontSize: 12 },
    md: { minHeight: 40, shellPaddingY: 10, shellPaddingX: 12, fontSize: 14 },
    lg: { minHeight: 48, shellPaddingY: 12, shellPaddingX: 14, fontSize: 16 },
    xl: { minHeight: 56, shellPaddingY: 14, shellPaddingX: 16, fontSize: 18 },
  } as const;

  const fieldView = views?.field || {};
  const fieldStyles = {
    margin: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: '100%',
    minHeight: undefined,
    borderWidth: 0,
    backgroundColor: 'transparent',
    fontSize: fieldSizeStyles[size].fontSize,
    fontWeight: '400' as const,
    color: isDisabled ? 'color-gray-400' : 'color-gray-900',
    opacity: isDisabled ? 0.7 : 1,
    ...fieldView,
  };

  // Translate Password's `type="password"` into RN's secureTextEntry.
  // `type` itself is meaningless on a TextInput.
  const typeProp = (props as any).type;
  const secureTextEntry = typeProp === 'password';
  const {
    type: _ignoreType,
    autoComplete: _ignoreAutoComplete,
    ...restProps
  } = props as any;

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };
  const handleBlur = (event: any) => {
    if (onBlur) onBlur(event);
    setIsFocused(false);
  };
  const handleChangeText = (text: string) => {
    setValue(text);
    if (onChangeText) onChangeText(text);
    if (onChange) onChange(text);
  };
  const handleClear = () => {
    setValue('');
    if (onChange) onChange('');
    if (onChangeText) onChangeText('');
    if (onBlur) onBlur({ target: { name } });
  };

  const {
    container: _shellContainer,
    content: _shellContent,
    ...layoutViews
  } = views || {};

  return (
    <FieldContainer helperText={helperText} error={error} views={layoutViews}>
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
        minHeight={fieldSizeStyles[size].minHeight}
        paddingTop={fieldSizeStyles[size].shellPaddingY}
        paddingBottom={fieldSizeStyles[size].shellPaddingY}
        paddingLeft={fieldSizeStyles[size].shellPaddingX}
        paddingRight={fieldSizeStyles[size].shellPaddingX}
      >
        {left}
        <FieldWrapper>
          {showLabel && (
            <FieldLabel color={'theme-primary'} error={error} {...views?.label}>
              {label}
            </FieldLabel>
          )}
          <Input
            id={id}
            name={name}
            editable={!isReadOnly && !isDisabled}
            autoFocus={isAutoFocus}
            placeholder={placeholder || hint}
            placeholderTextColor={getColor('color-gray-400', {
              themeMode: elementMode ? elementMode : themeMode,
            })}
            secureTextEntry={secureTextEntry}
            multiline={isMultiline}
            numberOfLines={isMultiline ? rows : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            value={value as any}
            {...fieldStyles}
            {...restProps}
          />
        </FieldWrapper>
        {isClearable && value && !isReadOnly && !isDisabled && (
          <FieldIcons>
            <View onPress={handleClear}>
              <CloseIcon size={20} color={IconColor} borderRadius={9999} />
            </View>
          </FieldIcons>
        )}
        {right}
      </FieldContent>
    </FieldContainer>
  );
};

export default TextFieldView;
