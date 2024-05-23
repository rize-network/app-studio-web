import React, { useCallback } from 'react';
import { Element } from 'app-studio';
import { Typography } from 'app-studio';

import { Horizontal } from '../../../Layout/Horizontal/Horizontal';
import { Text } from '../../../Text/Text';

import { FieldContainer } from '../../../Layout/Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../../Layout/Input/FieldContent/FieldContent';
import { FieldIcons } from '../../../Layout/Input/FieldIcons/FieldIcons';
import { FieldLabel } from '../../../Layout/Input/FieldLabel/FieldLabel';
import { FieldWrapper } from '../../../Layout/Input/FieldWrapper/FieldWrapper';
import { ArrowDownSvg, ArrowUpSvg, CloseSvg } from '../../../Svg';

import {
  DropDownProps,
  HiddenSelectProps,
  ItemProps,
  MultiSelectProps,
  SelectBoxProps,
  SelectViewProps,
} from './Select.props';
import { useItemState } from './Select.state';
import { IconSizes } from './Select.style';

const Item: React.FC<ItemProps> = ({
  isHovered,
  setIsHovered,
  option,
  size = 'md',
  callback = () => {},
  ...props
}) => {
  const handleOptionClick = (option: string) => callback(option);
  const handleHover = () => setIsHovered(!isHovered);

  return (
    <Element
      as="li"
      margin={0}
      paddingVertical={10}
      paddingHorizontal={12}
      listStyleType="none"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      fontSize={Typography.fontSizes[size]}
      onClick={() => handleOptionClick(option)}
      backgroundColor={isHovered ? 'trueGray.100' : 'transparent'}
      {...props}
    >
      <Text> {option}</Text>
    </Element>
  );
};

const SelectBox: React.FC<SelectBoxProps> = ({
  size = 'md',
  styles = { field: {}, text: {} },
  value,
  isDisabled,
  placeholder,
  removeOption = () => {},
}) => {
  const fieldStyles = {
    margin: 0,
    width: '95%',
    heigth: '100%',
    border: 'none',
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontSize: Typography.fontSizes[size],
    backgroundColor: 'transparent',
    color: isDisabled ? 'color.trueGray.600' : 'color.blueGray.700',
    cursor: isDisabled ? 'not-allowed' : 'auto',
    ...styles['field'],
    ...styles['text'],
  };

  return (
    <Text {...fieldStyles}>
      {(value === '' || (value && value.length === 0)) && !!placeholder ? (
        placeholder
      ) : (
        <>
          {typeof value === 'string'
            ? value
            : value &&
              value.length > 0 && (
                <Horizontal gap={6}>
                  {value.map((option) => (
                    <MultiSelect
                      key={option}
                      option={option}
                      removeOption={removeOption}
                    />
                  ))}
                </Horizontal>
              )}
        </>
      )}
    </Text>
  );
};

const HiddenSelect: React.FC<HiddenSelectProps> = ({
  id,
  name,
  value,
  onChange,
  isMulti = false,
  isDisabled = false,
  isReadOnly = false,
  options = [],
  ...props
}) => {
  const handleChange = (event: any) => {
    if (onChange) onChange(event);
  };
  return (
    <Element
      id={id}
      name={name}
      as="select"
      opacity={0}
      width={0}
      height={0}
      position="absolute"
      value={value}
      disabled={isDisabled}
      readOnly={isReadOnly}
      onChange={handleChange}
      multiple={isMulti}
      {...props}
    >
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </Element>
  );
};

const DropDown: React.FC<DropDownProps> = ({
  size,
  styles = { dropDown: {} },
  options,
  callback = () => {},
  highlightedIndex,
  setHighlightedIndex,
}) => {
  const itemStates = useItemState();
  const handleCallback = (option: string) => callback(option);
  const shadow =
    typeof document !== undefined
      ? {
          boxShadow:
            'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
        }
      : {
          elevation: 2,
          shadowColor: 'rgba(0, 0, 0, 0.07)',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 1,
          shadowRadius: 1,
        };

  return (
    <Element
      as="ul"
      role="dropdown"
      top="100%"
      width="100%"
      display="flex"
      zIndex={1000}
      overflowY="scroll"
      marginTop={5}
      marginLeft={0}
      marginRight={0}
      marginBottom={0}
      padding={0}
      borderRadius={4}
      position="absolute"
      flexDirection="column"
      backgroundColor="white"
      maxHeight="200px"
      style={{
        scrollbarWidth: 'none' /* For Firefox */,
        msOverflowStyle: 'none' /* For Internet Explorer and Edge */,
        '&::-webkit-scrollbar': {
          display: 'none' /* For Chrome, Safari, and Opera */,
        },
      }}
      {...shadow}
      {...styles['dropDown']}
    >
      {options.map((option, index) => (
        <Item
          key={option}
          size={size}
          option={option}
          callback={handleCallback}
          backgroundColor={
            index === highlightedIndex ? 'color.gray.100' : 'transparent'
          }
          onMouseEnter={() => setHighlightedIndex(index)}
          {...itemStates}
          {...styles['text']}
        />
      ))}
    </Element>
  );
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  option,
  size = 'md',
  removeOption = () => {},
  ...props
}) => {
  const handleClick = () => removeOption(option);

  return (
    <Horizontal
      gap={10}
      padding={6}
      borderRadius={4}
      alignItems="center"
      fontSize={Typography.fontSizes[size]}
      backgroundColor="color.trueGray.300"
      onClick={(event: any) => event.stopPropagation()}
      {...props}
    >
      <Text size={size}>{option}</Text>
      <CloseSvg
        role="close-button"
        color="inherit"
        size={IconSizes[size]}
        onClick={handleClick}
      />
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
  colorScheme = 'theme.primary',
  shape = 'default',
  variant = 'default',
  styles = {
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
  ...props
}) => {
  const isWithLabel = !!(isFocused && label);

  const handleHover = () => setIsHovered(!isHovered);
  const handleFocus = () => setIsFocused(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event && event.stopPropagation) event.stopPropagation();
    setHide(!hide);
    setIsFocused(!isFocused);
  };

  const handleCallback = useCallback(
    (option: string) => {
      setHide(!hide);
      if (isMulti && Array.isArray(value)) {
        !value.includes(option) && setValue([...value, option]);
      } else {
        setValue(option);
      }
      if (onChange) onChange(option);
    },

    [hide, isMulti, value]
  );

  const handleRemoveOption = (valueOption: string) => {
    if (Array.isArray(value) && value.includes(valueOption)) {
      const newValue = value.filter((option) => option !== valueOption);
      setValue(newValue.length === 0 ? [] : newValue);
    }
  };

  return (
    <FieldContainer
      role="SelectBox"
      helperText={helperText}
      error={error}
      styles={styles}
      onClick={isDisabled || isReadOnly ? () => {} : handleClick}
    >
      <FieldContent
        label={label}
        size={size}
        error={error}
        shape={shape}
        styles={styles}
        shadow={shadow}
        variant={variant}
        value={value}
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
            <FieldLabel
              htmlFor={id}
              color={colorScheme}
              error={error}
              {...styles}
            >
              {label}
            </FieldLabel>
          )}
          <HiddenSelect
            id={id}
            name={name}
            options={options}
            onChange={onChange}
            value={value}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isMulti={isMulti}
            onFocus={handleFocus}
            {...props}
          />
          <SelectBox
            size={size}
            styles={styles}
            value={value}
            isDisabled={isDisabled}
            placeholder={placeholder}
            removeOption={handleRemoveOption}
          />
        </FieldWrapper>
        <FieldIcons>
          {!isReadOnly && !isDisabled && (
            <>
              {hide ? (
                <ArrowDownSvg
                  color="inherit"
                  size={IconSizes[size]}
                  style={styles.icon}
                />
              ) : (
                <ArrowUpSvg
                  color="inherit"
                  size={IconSizes[size]}
                  style={styles.icon}
                />
              )}
            </>
          )}
        </FieldIcons>
      </FieldContent>
      {!hide && (
        <DropDown
          size={size}
          styles={styles}
          options={options}
          callback={handleCallback}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
        />
      )}
    </FieldContainer>
  );
};

export default SelectView;
