import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  const handleOptionClick = (event: any) => {
    if (event && event.stopPropagation) event.stopPropagation();
    callback(option);
  };
  const handleHover = () => setIsHovered(!isHovered);
  return (
    <CountryItem
      margin={0}
      role="DropDownItem"
      listStyleType="none"
      fontWeight="normal"
      paddingVertical={6}
      paddingHorizontal={12}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={handleOptionClick}
      fontSize={Typography.fontSizes[size]}
      backgroundColor={isHovered ? 'trueGray.100' : 'transparent'}
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
      borderRadius={4}
      position="absolute"
      flexDirection="column"
      backgroundColor="white"
      boxShadow="rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px"
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
  const IconColor = getColor(
    'color.blueGray.700',
    elementMode ? elementMode : themeMode
  );
  const handleHover = () => setIsHovered(!isHovered);
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
    paddingVerical: 8,
    paddingHorizonatl: 0,
    width: '100%',
    heigth: '100%',
    border: 'none',
    on: { focus: { outline: 'none' } },
    fontSize: Typography.fontSizes[size],
    backgroundColor: 'transparent',
    color: isDisabled ? 'color.trueGray.600' : 'color.blueGray.700',
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
        color={'theme.primary'}
        isHovered={isHovered}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isFocused={isFocused}
        showLabel={showLabel}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <FieldWrapper>
          {showLabel && (
            <FieldLabel
              htmlFor={id}
              color={'theme.primary'}
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
