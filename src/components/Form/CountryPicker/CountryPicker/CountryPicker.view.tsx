import React from 'react';
import { Element, Input, Typography, useTheme } from 'app-studio';
import {
  FieldContainer,
  FieldContent,
  FieldIcons,
  FieldLabel,
  FieldWrapper,
} from '../../../Input';

import countryList from '../countries.json';
import {
  CountryPickerViewProps,
  DropDownItemProps,
  CountryPickerDropDownProps,
} from './CountryPicker.props';
import { IconSizes } from './CountryPicker.style';
import { Country } from './CountryPicker.type';
import { ChevronIcon } from '../../../Icon/Icon';
const CountryList: React.FC<CountryPickerDropDownProps> = ({
  size,
  ...props
}) => <Element as="ul" {...props} />;
const CountrySelector: React.FC<any> = (props) => (
  <Input type="country" {...props} />
);
const CountryItem: React.FC<DropDownItemProps> = ({ size, ...props }) => (
  <Element as="li" {...props} />
);
export const DropDownItem: React.FC<DropDownItemProps> = ({
  option,
  size = 'md',
  callback = () => {},
  views = { text: {} },
}) => {
  const handleOptionClick = (event: any) => {
    if (event && event.stopPropagation) event.stopPropagation();
    callback(option);
  };
  return (
    <CountryItem
      margin={0}
      role="DropDownItem"
      listStyleType="none"
      fontWeight="normal"
      paddingVertical={6}
      paddingHorizontal={12}
      onClick={handleOptionClick}
      fontSize={Typography.fontSizes[size]}
      _hover={{
        backgroundColor: 'color-gray-100',
        transition: 'all 0.15s ease-in-out',
      }}
      {...views['text']}
    >
      {option}
    </CountryItem>
  );
};
export const DropDown: React.FC<CountryPickerDropDownProps> = ({
  size,
  views = { dropDown: {} },
  options = [],
  callback = () => {},
}) => {
  const handleCallback = (option: string) => callback(option);
  return (
    <CountryList
      role="dropDown"
      margin={0}
      padding={0}
      top="100%"
      width="100%"
      display="flex"
      zIndex={1000}
      overflow="auto"
      maxHeight="300px"
      borderRadius={12} // radius-lg
      position="absolute"
      flexDirection="column"
      backgroundColor="color-white"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="color-gray-200"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      {...views['dropDown']}
    >
      {options.map((option: Country) => (
        <DropDownItem
          key={option.code}
          size={size}
          option={option.name}
          callback={handleCallback}
          {...views['text']}
        />
      ))}
    </CountryList>
  );
};
export const CountryPickerView: React.FC<CountryPickerViewProps> = ({
  id,
  name,
  label,
  value,
  placeholder,
  helperText,
  hide = false,
  error = false,
  isHovered = false,
  isFocused = false,
  isAutoFocus = false,
  isDisabled = false,
  isReadOnly = false,
  shadow = {},
  newOptions = [],
  size = 'md',
  variant = 'default',
  shape = 'default',
  onChange,
  onBlur = () => {},
  setHide = () => {},
  setNewOptions = () => {},
  setIsHovered = () => {},
  setIsFocused = () => {},
  setValue = () => {},
  views = {
    text: {},
    icon: {},
    label: {},
    dropDown: {},
    helperText: {},
  },
  themeMode: elementMode,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const isDark = (elementMode || themeMode) === 'dark';
  const IconColor = getColor(isDark ? 'color-gray-400' : 'color-gray-500', {
    themeMode: elementMode ? elementMode : themeMode,
  });

  const handleFocus = () => setIsFocused(true);
  const handleCallback = (option: string) => {
    setHide(!hide);
    setValue(option);
    if (onChange) onChange(option);
  };
  const handleClick = () => {
    if (!isDisabled && !isReadOnly) {
      setHide(!hide);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueCountry = event.target.value;
    const filteredCountries = countryList.filter((country) =>
      country.name.toLowerCase().startsWith(valueCountry.toLowerCase())
    );
    if (hide) setHide(false);
    setNewOptions(filteredCountries);
    if (onChange) onChange(valueCountry);
  };
  const handleBlur = (event: any) => {
    onBlur(event);
    setIsFocused(false);
  };
  // Show label if it exists and either the field is focused or has a value
  const showLabel = !!(label && (isFocused || value));
  const fieldStyles = {
    margin: 0,
    paddingVertical: 8,
    paddingHorizontal: 0,
    width: '100%',
    heigth: '100%',
    border: 'none',
    on: { focus: { outline: 'none' } },
    transition: 'all 0.2s ease-in-out',
    fontSize: Typography.fontSizes[size],
    backgroundColor: 'transparent',
    color: isDisabled
      ? isDark
        ? 'color-gray-500'
        : 'color-gray-400'
      : isDark
      ? 'color-gray-100'
      : 'color-gray-900',
    cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'auto' : 'pointer',
    ...views['field'],
  };
  return (
    <FieldContainer
      helperText={helperText}
      error={error}
      views={views}
      onClick={handleClick}
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
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isFocused={isFocused}
        showLabel={showLabel}
        _hover={
          !isDisabled && !error
            ? {
                borderColor: 'theme-primary',
              }
            : undefined
        }
      >
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
          <CountrySelector
            id={id}
            name={name}
            placeholder={placeholder}
            readOnly={isReadOnly}
            disabled={isDisabled}
            autoFocus={isAutoFocus}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...fieldStyles}
            {...props}
            value={value}
            onChange={handleChange}
          />
        </FieldWrapper>
        <FieldIcons>
          {hide ? (
            <ChevronIcon
              orientation="down"
              widthHeight={IconSizes[size]}
              color={IconColor}
              style={views['icon']}
            />
          ) : (
            <ChevronIcon
              orientation="up"
              widthHeight={IconSizes[size]}
              color={IconColor}
              style={views['icon']}
            />
          )}
        </FieldIcons>
      </FieldContent>
      {!hide && (
        <DropDown
          size={size}
          views={views}
          options={newOptions}
          callback={handleCallback}
        />
      )}
    </FieldContainer>
  );
};
