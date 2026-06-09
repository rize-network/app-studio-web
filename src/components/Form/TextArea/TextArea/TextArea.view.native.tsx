/**
 * TextArea View Component (React Native)
 *
 * RN counterpart of TextArea.view.tsx. Uses app-studio's <Input/> with
 * `multiline` to behave like a textarea. Drops web-only concepts: <textarea>
 * HTML element, `as="textarea"`, `resize`, `100vh`, _focus selectors,
 * letterSpacing in fractional units, cursor, transitions.
 */

import React from 'react';
import { Input, useTheme } from 'app-studio';
import {
  FieldContainer,
  FieldContent,
  FieldLabel,
  FieldWrapper,
} from '../../../Input';
import { TextAreaViewProps } from './TextArea.props';

const withoutFieldShellView = <T extends Record<string, any>>(views?: T): T => {
  if (!views) return {} as T;
  const { container, content, ...layoutViews } = views;
  return layoutViews as T;
};

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
  isReadOnly = false,
  isDisabled = false,
  isAutoFocus = false,
  maxRows = 3,
  maxCols: _maxCols = 30,
  onBlur = () => {},
  onChange,
  onFocus,
  setHint = () => {},
  setValue = () => {},
  setIsFocused = () => {},
  setIsHovered = () => {},
  onChangeText,
  views = { label: {}, helperText: {} },
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const showLabel = !!label;
  const fieldSizeStyles = {
    xs: { minHeight: 72, shellPaddingY: 6, shellPaddingX: 10, fontSize: 12 },
    sm: { minHeight: 88, shellPaddingY: 8, shellPaddingX: 10, fontSize: 12 },
    md: { minHeight: 104, shellPaddingY: 10, shellPaddingX: 12, fontSize: 14 },
    lg: { minHeight: 120, shellPaddingY: 12, shellPaddingX: 14, fontSize: 16 },
    xl: { minHeight: 136, shellPaddingY: 14, shellPaddingX: 16, fontSize: 18 },
  } as const;

  const fieldView = views?.field || {};
  const fieldShellView = views?.container || {};
  const contentViews = {
    ...views,
    container: {
      ...fieldShellView,
      overflow: 'hidden',
    },
  };
  const layoutViews = withoutFieldShellView(views);

  const fieldStyles = {
    margin: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: '100%',
    minHeight: fieldSizeStyles[size].minHeight,
    borderWidth: 0,
    backgroundColor: 'transparent',
    fontSize: fieldSizeStyles[size].fontSize,
    fontWeight: '400' as const,
    color: isDisabled ? 'color-gray-400' : 'color-gray-900',
    opacity: isDisabled ? 0.7 : 1,
    textAlignVertical: 'top' as const,
    ...fieldView,
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };
  const handleBlur = (event: any) => {
    onBlur(event);
    setIsFocused(false);
  };
  const handleChangeText = (text: string) => {
    setValue(text);
    if (onChange) onChange(text);
    if (onChangeText) onChangeText(text);
  };

  return (
    <FieldContainer helperText={helperText} error={error} views={layoutViews}>
      <FieldContent
        label={label}
        size={size}
        error={error}
        shape={shape}
        views={contentViews}
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
        {...contentViews?.content}
      >
        <FieldWrapper {...(views as any)?.warper}>
          {showLabel && (
            <FieldLabel color={'theme-primary'} error={error} {...views?.label}>
              {label}
            </FieldLabel>
          )}
          <Input
            id={id}
            name={name}
            multiline
            numberOfLines={maxRows}
            value={value as any}
            editable={!isReadOnly && !isDisabled}
            autoFocus={isAutoFocus}
            placeholder={placeholder || hint}
            placeholderTextColor={getColor('color-gray-400', { themeMode })}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChangeText={handleChangeText}
            {...fieldStyles}
            {...props}
            {...(views as any)?.textarea}
          />
        </FieldWrapper>
      </FieldContent>
    </FieldContainer>
  );
};

export default TextAreaView;
