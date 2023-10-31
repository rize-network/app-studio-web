import React, { useEffect, useState } from 'react';
import { Element, Input, Typography, useTheme } from 'app-studio';
import { FieldContainer, FieldContent, FieldIcons, FieldLabel, FieldWrapper } from '../../../Layout/Input';
import { ArrowDownSvg } from '../../../Svg/ArrowDown';
import { ArrowUpSvg } from '../../../Svg/ArrowUp';

import countryList from '../countries.json';

import { CountryPickerViewProps, DropDownItemProps, DropDownProps } from './CountryPicker.props';
import { IconSizes } from './CountryPicker.style';
import { Country } from './CountryPicker.type';

const CountryList: React.FC<DropDownProps> = (props) => <Element as="ul" {...props} />;

const CountrySelector: React.FC<any> = (props) => <Input type="country" {...props} />;

const CountryItem: React.FC<DropDownItemProps> = (props) => <Element as="li" {...props} />;

export const DropDownItem: React.FC<DropDownItemProps> = ({
  option,
  size = 'md',
  callback = () => {},
  styles = { text: {} },
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOptionClick = (event: any) => {
    event.stopPropagation();
    callback(option);
  };
  const handleHover = () => setIsHovered(!isHovered);
  return (
    <CountryItem
      margin={0}
      role="DropDownItem"
      listStyleType="none"
      paddingVertical={6}
      paddingHorizontal={12}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={handleOptionClick}
      fontSize={Typography.fontSizes[size]}
      backgroundColor={isHovered ? 'trueGray.100' : 'transparent'}
      {...styles['text']}
    >
      {option}
    </CountryItem>
  );
};

export const DropDown: React.FC<DropDownProps> = ({
  size,
  styles = { dropDown: {} },
  options,
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
      {...styles['dropDown']}
    >
      {options.map((option: Country) => (
        <DropDownItem
          key={option.code}
          size={size}
          option={option.name}
          callback={handleCallback}
          {...styles['text']}
        />
      ))}
    </CountryList>
  );
};

const CountryPickerView: React.FC<CountryPickerViewProps> = ({
  id,
  name,
  label,
  selected,
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
  colorScheme = 'theme.primary',
  onChange,
  onBlur = () => {},
  setHide = () => {},
  setNewOptions = () => {},
  setIsHovered = () => {},
  setIsFocused = () => {},
  setSelected = () => {},
  styles = {
    text: {},
    icon: {},
    label: {},
    dropDown: {},
    helperText: {},
    box: {},
  },
  ...props
}) => {
  const { getColor } = useTheme();
  const IconColor = getColor('color.blueGray.700');

  const handleHover = () => setIsHovered(!isHovered);
  const handleFocus = () => setIsFocused(true);

  const handleCallback = (option: string) => {
    setHide(!hide);
    setSelected(option);
  };

  const handleClick = () => {
    if (!isDisabled && !isReadOnly) {
      setHide(!hide);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCountry = event.target.value;
    const filteredCountries = countryList.filter((country) =>
      country.name.toLowerCase().startsWith(selectedCountry.toLowerCase())
    );
    if (hide) setHide(false);
    setSelected(event.target.value);
    setNewOptions(filteredCountries);
    if (onChange) onChange(event);
  };

  const handleBlur = (event: any) => {
    onBlur(event);
    setIsFocused(false);
  };

  useEffect(() => {
    if (onChange) onChange(selected); // Call onChange when selectedCountry changes
  }, [onChange, selected]);

  const isWithLabel = !!(isFocused && label);

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
    cursor: isDisabled ? 'not-allowed' : 'auto',
    ...styles['field'],
  };

  return (
    <FieldContainer helperText={helperText} error={error} styles={styles} onClick={handleClick}>
      <FieldContent
        label={label}
        size={size}
        error={error}
        shape={shape}
        styles={styles}
        shadow={shadow}
        variant={variant}
        value={selected}
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
            value={selected}
            onChange={handleChange}
          />
        </FieldWrapper>
        <FieldIcons>
          {hide ? (
            <ArrowDownSvg size={IconSizes[size]} color={IconColor} style={styles['icon']} />
          ) : (
            <ArrowUpSvg size={IconSizes[size]} color={IconColor} style={styles['icon']} />
          )}
        </FieldIcons>
      </FieldContent>
      {!hide && <DropDown size={size} styles={styles} options={newOptions} callback={handleCallback} />}
    </FieldContainer>
  );
};

export default CountryPickerView;
