import React, { useCallback, useRef } from 'react';
import { Element, useElementPosition } from 'app-studio';
import { Typography } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { FieldContainer } from '../../../Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../../Input/FieldContent/FieldContent';
import { FieldIcons } from '../../../Input/FieldIcons/FieldIcons';
import { FieldLabel } from '../../../Input/FieldLabel/FieldLabel';
import { FieldWrapper } from '../../../Input/FieldWrapper/FieldWrapper';
import { ChevronIcon, CloseIcon } from '../../../Icon/Icon';
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
/**
 * Item Component
 *
 * Renders an individual option item in the select dropdown
 */
const Item: React.FC<ItemProps> = ({
  isHovered,
  setIsHovered,
  option,
  size = 'md',
  callback = () => {},
  style,
  ...props
}) => {
  // Handles the click event on an option by invoking the callback with the selected option's value
  const handleOptionClick = (e: React.MouseEvent, option: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof callback === 'function') {
      callback(option);
    }
  };

  // Toggles the hover state on the item
  const handleHover = () => setIsHovered(!isHovered);

  return (
    <Element
      as="li"
      // Layout properties
      margin={0}
      paddingVertical={8} // 2 × 4px grid
      paddingHorizontal={8} // 2 × 4px grid
      listStyleType="none"
      cursor="pointer"
      // Event handlers
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={(e: React.MouseEvent) => handleOptionClick(e, option.value)}
      // Visual properties
      backgroundColor={isHovered ? 'color.gray.100' : 'transparent'}
      borderRadius="4px" // Subtle rounded corners for items
      // Animation
      transition="all 0.15s ease"
      // Apply custom props
      {...props}
    >
      <Text
        // Typography properties
        fontSize={Typography.fontSizes[size]}
        fontWeight="400" // Regular weight
        lineHeight="15px"
        // Apply custom styles
        {...style}
      >
        {option.label}
      </Text>
    </Element>
  );
};
/**
 * SelectBox Component
 *
 * Renders the main select box with selected value(s)
 */
const SelectBox: React.FC<SelectBoxProps> = ({
  size = 'md',
  views = { field: {}, text: {} },
  value,
  isDisabled,
  placeholder,
  removeOption = () => {},
  options,
}) => {
  /**
   * Styles for the select field
   */
  const fieldStyles = {
    // Layout properties
    margin: 0,
    width: '95%',
    height: '100%',
    border: 'none',
    paddingVertical: 4, // 3 × 4px grid
    paddingHorizontal: 0,

    // Typography properties
    fontSize: Typography.fontSizes[size],

    fontWeight: '400', // Regular weight
    lineHeight: '1.5',
    letterSpacing: '-0.01em', // Slight negative tracking for modern look

    // Visual properties
    backgroundColor: 'transparent',
    color: isDisabled ? 'color.gray.400' : 'color.gray.900',

    // State properties
    cursor: isDisabled ? 'not-allowed' : 'pointer',

    // Animation
    transition: 'all 0.2s ease',

    // Apply custom styles
    ...views['field'],
    ...views['text'],
  };
  const option: any =
    options.length > 0 && options.find((option) => option.value === value);
  return (
    <Text {...fieldStyles}>
      {/* Check if value is an empty string or if value is an array but with no items, then show placeholder */}
      {(value === '' || (Array.isArray(value) && value.length === 0)) &&
      !!placeholder ? (
        placeholder
      ) : (
        <>
          {/* If value is a string, use the option label or value */}
          {typeof value === 'string' ? (
            (option && option.label) ?? value
          ) : // If value is an array and not empty, render MultiSelect options
          Array.isArray(value) && value.length > 0 ? (
            <Horizontal gap={6}>
              {value.map((option) => (
                <MultiSelect
                  key={option}
                  option={option}
                  removeOption={removeOption}
                />
              ))}
            </Horizontal>
          ) : (
            // Handle any other types of value (including objects or unexpected values)
            <span>{value}</span>
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
      {options.length > 0 &&
        options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
    </Element>
  );
};
/**
 * DropDown Component
 *
 * Renders the dropdown list of options for the select component
 */
const DropDown: React.FC<DropDownProps> = ({
  size,
  views = {},
  options,
  callback = () => {},
  highlightedIndex,
  setHighlightedIndex,
}) => {
  const itemStates = useItemState();
  const handleCallback = (option: string) => callback(option);

  // Shadow styles for the dropdown - now applied directly in the Element

  return (
    <Element
      as="ul"
      role="dropdown"
      width="100%"
      display="flex"
      flexDirection="column"
      backgroundColor="color.white"
      transition="all 0.2s ease"
      margin={0}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '4px',
        },
      }}
      {...views?.dropDown}
    >
      {options &&
        options.length > 0 &&
        options.map((option, index) => (
          <Item
            key={option.value}
            size={size}
            style={views['text']}
            option={option}
            callback={handleCallback}
            backgroundColor={
              index === highlightedIndex ? 'color.gray.100' : 'transparent'
            }
            onMouseEnter={() => setHighlightedIndex(index)}
            {...itemStates}
          />
        ))}
    </Element>
  );
};
/**
 * MultiSelect Component
 *
 * Renders a selected option in a multi-select component
 */
export const MultiSelect: React.FC<MultiSelectProps> = ({
  option,
  size = 'md',
  removeOption = () => {},
  ...props
}) => {
  const handleClick = () => removeOption(option);

  return (
    <Horizontal
      gap={8}
      padding={8}
      alignItems="center"
      borderRadius="6px"
      backgroundColor="color.gray.200"
      fontSize={Typography.fontSizes[size]}
      onClick={(event: any) => event.stopPropagation()}
      transition="all 0.2s ease"
      {...props}
    >
      <Text
        size={size}
        fontWeight="500" // Medium weight
      >
        {option}
      </Text>

      <CloseIcon
        role="close-button"
        color="inherit"
        widthHeight={IconSizes[size]}
        onClick={handleClick}
        transition="all 0.2s ease"
        _hover={{
          opacity: 0.7,
        }}
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
  ...props
}) => {
  const {
    ref: triggerRef,
    relation,
    updateRelation,
  } = useElementPosition({
    trackChanges: true,
    throttleMs: 100,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get optimal positioning style based on available space
  const getDropdownStyle = () => {
    if (!relation) {
      // Default positioning when relation is not available
      return {
        position: 'absolute' as const,
        top: '100%',
        marginTop: '8px',
        left: 0,
        right: 0,
        zIndex: 10000,
      };
    }

    const baseStyle = {
      position: 'absolute' as const,
      left: 0,
      right: 0,
      zIndex: 10000,
    };

    // Place dropdown where there's more space vertically
    if (relation.space.vertical === 'top') {
      return {
        ...baseStyle,
        bottom: '100%',
        marginBottom: '8px',
      };
    } else {
      return {
        ...baseStyle,
        top: '100%',
        marginTop: '8px',
      };
    }
  };
  // close when *any* other select opens
  React.useEffect(() => {
    const handleCloseAll = () => setHide(true);
    document.addEventListener('closeAllSelects', handleCloseAll);
    return () =>
      document.removeEventListener('closeAllSelects', handleCloseAll);
  }, [setHide]);

  // Add a global click handler to close the dropdown when clicking outside
  React.useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only close if clicking outside of this specific select component
      if (!target.closest(`#${id}`) && !hide) {
        setHide(true);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [id, hide, setHide]);
  const showLabel = !!(isFocused && label);
  const handleHover = () => setIsHovered(!isHovered);
  const handleFocus = () => setIsFocused(true);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // tell all other selects to close
    document.dispatchEvent(new Event('closeAllSelects'));

    if (event && event.stopPropagation) event.stopPropagation();

    // Toggle dropdown visibility
    const newHideState = !hide;
    setHide(newHideState);
    setIsFocused(!newHideState); // Set focus state based on dropdown visibility
  };
  const handleCallback = useCallback(
    (option: string) => {
      // Close dropdown after selection
      setHide(true);

      // Tell all other selects to close
      document.dispatchEvent(new Event('closeAllSelects'));

      // Update value based on multi-select or single-select mode
      if (isMulti && Array.isArray(value)) {
        if (!value.includes(option)) {
          const newValue = [...value, option];
          setValue(newValue);
          if (onChange) onChange(option);
        }
      } else {
        setValue(option);
        if (onChange) onChange(option);
      }

      // Set focus to indicate selection
      setIsFocused(true);
    },
    [isMulti, value, setHide, setValue, onChange, setIsFocused]
  );
  const handleRemoveOption = (valueOption: string) => {
    if (Array.isArray(value) && value.includes(valueOption)) {
      const newValue = value.filter((option) => option !== valueOption);
      setValue(newValue.length === 0 ? [] : newValue);
    }
  };
  return (
    <FieldContainer
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      position="relative"
      width="100%"
      display="inline-block"
      id={id}
      role="SelectBox"
      helperText={helperText}
      error={error}
      views={views}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        // Stop propagation to prevent clicks from bubbling up
        e.stopPropagation();

        // Only handle click if not disabled or readonly
        if (!(isDisabled || isReadOnly)) {
          handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }
      }}
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
        position="relative"
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
            <>
              {hide ? (
                <ChevronIcon
                  color="inherit"
                  widthHeight={IconSizes[size]}
                  style={views.icon}
                  orientation="down"
                />
              ) : (
                <ChevronIcon
                  color="inherit"
                  orientation="up"
                  widthHeight={IconSizes[size]}
                  style={views.icon}
                />
              )}
            </>
          )}
        </FieldIcons>
        {!hide && options.length > 0 && (
          <Element
            ref={dropdownRef}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={getDropdownStyle()}
          >
            <DropDown
              size={size}
              views={{
                ...views,
                dropDown: {
                  borderRadius: '6px',
                  border: '1px solid color.gray.200',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  padding: '8px',
                  maxHeight: '240px',
                  overflowY: 'auto',
                },
              }}
              options={options}
              callback={handleCallback}
              highlightedIndex={highlightedIndex}
              setHighlightedIndex={setHighlightedIndex}
            />
          </Element>
        )}
      </FieldContent>
    </FieldContainer>
  );
};
export default SelectView;
