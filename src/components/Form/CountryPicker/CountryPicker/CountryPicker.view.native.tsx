import React from 'react';
import { Input, Typography, useTheme } from 'app-studio';
import {
  FieldContainer,
  FieldContent,
  FieldIcons,
  FieldLabel,
  FieldWrapper,
} from '../../../Input';
import { ActionSheet } from '../../../ActionSheet/ActionSheet';

import countryList from '../countries.json';
import { CountryPickerViewProps } from './CountryPicker.props';
import { IconSizes } from './CountryPicker.style';
import { ChevronIcon } from '../../../Icon/Icon';

const CountrySelector: React.FC<any> = (props) => (
  <Input type="country" {...props} />
);

export const CountryPickerView: React.FC<CountryPickerViewProps> = ({
  id,
  name,
  label,
  value,
  placeholder,
  helperText,
  hide = false,
  error = false,
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
  const iconColor = getColor('color-gray-500', {
    themeMode: elementMode ? elementMode : themeMode,
  });
  const sheetSize =
    size === 'xs' || size === 'sm' ? 'sm' : size === 'xl' ? 'lg' : 'md';

  const handleFocus = () => setIsFocused(true);

  const handleCallback = (option: string) => {
    setHide(true);
    setIsFocused(false);
    setValue(option);
    onChange?.(option);
  };

  const handleOpen = () => {
    if (!isDisabled && !isReadOnly) {
      setHide(!hide);
      setIsFocused(hide);
    }
  };

  const handleChange = (event: any) => {
    const valueCountry =
      typeof event === 'string' ? event : event?.target?.value ?? '';
    const filteredCountries = countryList.filter((country) =>
      country.name.toLowerCase().startsWith(valueCountry.toLowerCase())
    );
    if (hide) setHide(false);
    setNewOptions(filteredCountries);
    onChange?.(valueCountry);
  };

  const handleBlur = (event: any) => {
    onBlur(event);
    setIsFocused(false);
  };

  const showLabel = !!(label && (isFocused || value));
  const fieldStyles = {
    margin: 0,
    paddingVertical: 8,
    paddingHorizontal: 0,
    width: '100%',
    heigth: '100%',
    border: 'none',
    fontSize: Typography.fontSizes[size],
    backgroundColor: 'transparent',
    color: isDisabled ? 'color-gray-400' : 'color-gray-900',
    ...views['field'],
  };

  return (
    <FieldContainer
      helperText={helperText}
      error={error}
      views={views}
      onPress={handleOpen}
      onClick={handleOpen}
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
      >
        <FieldWrapper>
          {showLabel && (
            <FieldLabel
              htmlFor={id}
              color={'theme-primary'}
              error={error}
              views={views}
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
          <ChevronIcon
            orientation={hide ? 'down' : 'up'}
            widthHeight={IconSizes[size]}
            color={iconColor}
            style={views['icon']}
          />
        </FieldIcons>
      </FieldContent>

      <ActionSheet
        isOpen={!hide}
        onClose={() => {
          setHide(true);
          setIsFocused(false);
        }}
        title={label || placeholder || 'Select country'}
        value={value}
        showCancel
        size={sheetSize}
        items={newOptions.map((country) => ({
          id: country.code,
          value: country.name,
          label: `${country.emoji} ${country.name}`,
          description: country.dial_code,
          selected: value === country.name,
          onPress: () => handleCallback(country.name),
        }))}
        views={{
          sheet: views?.dropDown,
          itemLabel: views?.text,
        }}
      />
    </FieldContainer>
  );
};
