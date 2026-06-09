/**
 * Select View Component (React Native)
 *
 * RN counterpart of Select.view.tsx. There is no native <select> on RN, so
 * we simulate it with a pressable field that opens a React Native <Modal/>
 * containing a scrollable list of options. Drops web-only concepts:
 * - <select>/<option> HTML elements
 * - HiddenSelect (no need to keep an a11y twin on RN)
 * - Portal + getBoundingClientRect-based dropdown positioning
 *   (position: fixed, window.innerHeight, etc.)
 * - document.addEventListener / closeAllSelects custom event
 * - cursor, hover transitions, chevron rotation transitions
 *
 * Notable simplification: the dropdown becomes a centered modal rather than
 * a popover anchored to the trigger.
 */

import React from 'react';
import {
  Modal as RNModal,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Typography, Horizontal, Text, View, Vertical } from 'app-studio';
import { FieldContainer } from '../../../Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../../Input/FieldContent/FieldContent';
import { FieldIcons } from '../../../Input/FieldIcons/FieldIcons';
import { FieldLabel } from '../../../Input/FieldLabel/FieldLabel';
import { FieldWrapper } from '../../../Input/FieldWrapper/FieldWrapper';
import { ChevronIcon, CloseIcon } from '../../../Icon/Icon';
import {
  MultiSelectProps,
  SelectBoxProps,
  SelectViewProps,
} from './Select.props';
import {
  IconSizes,
  optionStyles,
  optionStateStyles,
  chipStyles,
} from './Select.style';

const withoutFieldShellView = <T extends Record<string, any>>(views?: T): T => {
  if (!views) return {} as T;
  const { container, content, ...layoutViews } = views;
  return layoutViews as T;
};

const fieldSizeStyles = {
  xs: { minHeight: 24, shellPaddingY: 6, shellPaddingX: 10 },
  sm: { minHeight: 32, shellPaddingY: 8, shellPaddingX: 10 },
  md: { minHeight: 40, shellPaddingY: 10, shellPaddingX: 12 },
  lg: { minHeight: 48, shellPaddingY: 12, shellPaddingX: 14 },
  xl: { minHeight: 56, shellPaddingY: 14, shellPaddingX: 16 },
} as const;

const SelectBox: React.FC<SelectBoxProps> = ({
  size = 'md',
  views = { field: {}, text: {} },
  value,
  isDisabled,
  placeholder,
  removeOption = () => {},
  options,
}) => {
  const fieldView = views?.field || {};
  const textView = views?.text || {};
  const fieldStyles = {
    width: '95%',
    paddingVertical: 4,
    fontSize: Typography.fontSizes[size],
    fontWeight: '400' as const,
    lineHeight: 20,
    color: isDisabled ? 'color-gray-400' : 'color-gray-900',
    ...fieldView,
    ...textView,
  };
  const option: any =
    options.length > 0 && options.find((option) => option.value === value);

  const isEmpty = value === '' || (Array.isArray(value) && value.length === 0);

  return (
    <Text {...fieldStyles}>
      {isEmpty && !!placeholder ? (
        placeholder
      ) : typeof value === 'string' ? (
        (option && option.label) ?? value
      ) : Array.isArray(value) && value.length > 0 ? (
        <Horizontal gap={6}>
          {value.map((opt) => (
            <MultiSelect key={opt} option={opt} removeOption={removeOption} />
          ))}
        </Horizontal>
      ) : (
        String(value ?? '')
      )}
    </Text>
  );
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  option,
  size = 'md',
  removeOption = () => {},
  ...props
}) => {
  const handlePress = () => removeOption(option);
  return (
    <Horizontal gap={6} alignItems="center" {...chipStyles} {...props}>
      <Text
        fontSize={Typography.fontSizes[size]}
        fontWeight="500"
        color="color-gray-700"
      >
        {option}
      </Text>
      <View onPress={handlePress}>
        <CloseIcon color="color-gray-500" widthHeight={IconSizes[size]} />
      </View>
    </Horizontal>
  );
};

const SelectView: React.FC<SelectViewProps> = ({
  id,
  name,
  label,
  value,
  placeholder,
  helperText,
  hide = false,
  error = false,
  isMulti = false,
  isFocused = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  options = [],
  shadow = {},
  size = 'md',
  shape = 'default',
  variant = 'default',
  views = {
    text: {},
    icon: {},
    dropDown: {},
    selectBox: {},
    label: {},
    helperText: {},
  },
  onChange = () => {},
  setHide = () => {},
  setValue = () => {},
  setIsHovered = () => {},
  setIsFocused = () => {},
  setHighlightedIndex,
  highlightedIndex,
  isScrollable: _isScrollable,
  ...props
}) => {
  const handlePressTrigger = () => {
    if (isDisabled || isReadOnly) return;
    const newHideState = !hide;
    setHide(newHideState);
    setIsFocused(!newHideState);
  };

  const handleSelect = (optionValue: string) => {
    if (isMulti && Array.isArray(value)) {
      if (!value.includes(optionValue)) {
        const newValue = [...value, optionValue];
        setValue(newValue);
        if (onChange) onChange(optionValue);
      }
    } else {
      setValue(optionValue);
      if (onChange) onChange(optionValue);
    }
    if (!isMulti) setHide(true);
  };

  const handleRemoveOption = (valueOption: string) => {
    if (Array.isArray(value) && value.includes(valueOption)) {
      const newValue = value.filter((option) => option !== valueOption);
      setValue(newValue.length === 0 ? [] : newValue);
    }
  };

  const isOptionSelected = (optionValue: string) => {
    if (Array.isArray(value)) return value.includes(optionValue);
    return value === optionValue;
  };

  const showLabel = !!label;
  const layoutViews = withoutFieldShellView(views);

  return (
    <FieldContainer
      width="100%"
      id={id}
      helperText={helperText}
      error={error}
      views={layoutViews}
      onPress={handlePressTrigger}
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
        minHeight={fieldSizeStyles[size].minHeight}
        paddingTop={fieldSizeStyles[size].shellPaddingY}
        paddingBottom={fieldSizeStyles[size].shellPaddingY}
        paddingLeft={fieldSizeStyles[size].shellPaddingX}
        paddingRight={fieldSizeStyles[size].shellPaddingX}
        {...(views as any)?.content}
      >
        <FieldWrapper>
          {showLabel && (
            <FieldLabel color={'theme-primary'} error={error} {...views?.label}>
              {label}
            </FieldLabel>
          )}
          <SelectBox
            options={options}
            size={size}
            views={views}
            value={value}
            isDisabled={isDisabled}
            placeholder={placeholder}
            removeOption={handleRemoveOption}
          />
        </FieldWrapper>
        <FieldIcons>
          {!isReadOnly && !isDisabled && (
            <ChevronIcon
              color="inherit"
              widthHeight={IconSizes[size]}
              orientation={hide ? 'down' : 'up'}
            />
          )}
        </FieldIcons>
      </FieldContent>

      <RNModal
        visible={!hide && options.length > 0}
        transparent
        animationType="fade"
        onRequestClose={() => setHide(true)}
      >
        <TouchableWithoutFeedback onPress={() => setHide(true)}>
          <View
            flex={1}
            backgroundColor="color-blackAlpha-500"
            justifyContent="center"
            alignItems="center"
            paddingHorizontal={24}
          >
            <TouchableWithoutFeedback>
              <Vertical
                width="100%"
                maxWidth={400}
                maxHeight={400}
                backgroundColor="color-white"
                borderRadius={12}
                paddingVertical={8}
                paddingHorizontal={4}
                shadowColor="rgba(0, 0, 0, 0.15)"
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={1}
                shadowRadius={16}
                elevation={5}
                {...(views as any)?.dropDown}
              >
                <ScrollView>
                  {options.map((option, index) => {
                    const selected = isOptionSelected(option.value);
                    const stateStyle = selected
                      ? optionStateStyles.selected
                      : optionStateStyles.default;
                    return (
                      <Pressable
                        key={option.value}
                        onPress={() => handleSelect(option.value)}
                      >
                        <Horizontal
                          alignItems="center"
                          justifyContent="space-between"
                          {...optionStyles}
                          {...stateStyle}
                        >
                          <Text
                            fontSize={Typography.fontSizes[size]}
                            fontWeight={selected ? '500' : '400'}
                            color={
                              selected ? 'color-gray-900' : 'color-gray-700'
                            }
                            {...(views as any)?.text}
                          >
                            {option.label}
                          </Text>
                          {selected && (
                            <Text color="theme-primary" fontSize={14}>
                              {'✓'}
                            </Text>
                          )}
                        </Horizontal>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </Vertical>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>
    </FieldContainer>
  );
};

export default SelectView;
