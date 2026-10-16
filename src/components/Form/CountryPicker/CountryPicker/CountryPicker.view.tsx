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
// `type="country"` is not a valid HTML input type; browsers coerce it to
// text anyway, so declare what actually renders.
const CountrySelector: React.FC<any> = (props) => (
  <Input type="text" {...props} />
);
const CountryItem: React.FC<DropDownItemProps> = ({ size, ...props }) => (
  <Element as="li" {...props} />
);
export const DropDownItem: React.FC<DropDownItemProps> = ({
  id,
  option,
  size = 'md',
  isSelected = false,
  isHighlighted = false,
  callback = () => {},
  views = { text: {} },
}) => {
  const handleOptionClick = (event: any) => {
    if (event && event.stopPropagation) event.stopPropagation();
    // `option` is optional on DropDownItemProps; report '' rather than handing
    // the callback an `undefined` it would have to narrow.
    callback(option ?? '');
  };
  return (
    <CountryItem
      id={id}
      margin={0}
      role="option"
      aria-selected={isSelected}
      listStyleType="none"
      fontWeight="normal"
      paddingVertical={6}
      paddingHorizontal={12}
      onClick={handleOptionClick}
      fontSize={Typography.fontSizes[size]}
      backgroundColor={isHighlighted ? 'color-gray-100' : undefined}
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
  id,
  size,
  views = { dropDown: {} },
  options = [],
  selectedOption,
  highlightedIndex = -1,
  callback = () => {},
}) => {
  const handleCallback = (option: string) => callback(option);
  return (
    <CountryList
      id={id}
      role="listbox"
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
      {options.map((option: Country, index: number) => (
        <DropDownItem
          key={option.code}
          id={id ? `${id}-option-${index}` : undefined}
          size={size}
          option={option.name}
          isSelected={option.name === selectedOption}
          isHighlighted={index === highlightedIndex}
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
  selected,
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
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const listboxId = `${fieldId}-listbox`;
  // Roving highlight for keyboard navigation over the (filtered) option list.
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const isDark = (elementMode || themeMode) === 'dark';
  const IconColor = getColor('color-gray-500', {
    themeMode: elementMode ? elementMode : themeMode,
  });

  const handleFocus = () => setIsFocused(true);
  const handleCallback = (option: string) => {
    setHide(!hide);
    setHighlightedIndex(-1);
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
    setHighlightedIndex(filteredCountries.length > 0 ? 0 : -1);
    if (onChange) onChange(valueCountry);
  };
  // The list historically opened only via mouse click on the container;
  // ArrowDown/Enter/Escape make the combobox operable from the keyboard.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled || isReadOnly) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (hide) {
        setHide(false);
        setHighlightedIndex(newOptions.length > 0 ? 0 : -1);
      } else {
        setHighlightedIndex(
          Math.min(highlightedIndex + 1, newOptions.length - 1)
        );
      }
    } else if (event.key === 'ArrowUp') {
      if (!hide) {
        event.preventDefault();
        setHighlightedIndex(Math.max(highlightedIndex - 1, 0));
      }
    } else if (event.key === 'Enter') {
      if (!hide && highlightedIndex >= 0 && newOptions[highlightedIndex]) {
        event.preventDefault();
        handleCallback(newOptions[highlightedIndex].name);
      }
    } else if (event.key === 'Escape') {
      if (!hide) {
        setHide(true);
        setHighlightedIndex(-1);
      }
    }
  };
  const handleBlur = (event: any) => {
    onBlur(event);
    setIsFocused(false);
  };
  // The label is part of the field's accessible name; it must not disappear
  // while the field is unfocused and empty.
  const showLabel = !!label;
  const fieldStyles = {
    margin: 0,
    // The field shell already applies the vertical padding for the size.
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    on: { focus: { outline: 'none' } },
    transition: 'all 0.2s ease-in-out',
    fontSize: Typography.fontSizes[size],
    backgroundColor: 'transparent',
    color: isDisabled ? 'color-gray-400' : 'color-gray-900',
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
              htmlFor={fieldId}
              color={'theme-primary'}
              error={error}
              views={views}
            >
              {label}
            </FieldLabel>
          )}
          <CountrySelector
            id={fieldId}
            name={name}
            placeholder={placeholder}
            readOnly={isReadOnly}
            disabled={isDisabled}
            autoFocus={isAutoFocus}
            // A text input filtering a popup listbox is a combobox; the
            // attributes below tie it to the list for assistive tech.
            role="combobox"
            aria-expanded={!hide}
            aria-controls={hide ? undefined : listboxId}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-activedescendant={
              !hide && highlightedIndex >= 0
                ? `${listboxId}-option-${highlightedIndex}`
                : undefined
            }
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
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
          id={listboxId}
          size={size}
          views={views}
          options={newOptions}
          selectedOption={value}
          highlightedIndex={highlightedIndex}
          callback={handleCallback}
        />
      )}
    </FieldContainer>
  );
};
