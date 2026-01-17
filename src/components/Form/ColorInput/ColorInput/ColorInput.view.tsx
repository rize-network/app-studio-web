import React from 'react';
import { View, Vertical, Horizontal, Text, useTheme } from 'app-studio';
import { ColorInputViewProps } from './ColorInput.props';
import {
  DefaultColorInputStyles,
  Sizes,
  Shapes,
  Variants,
  DefaultColorPalette,
} from './ColorInput.style';
import { TextField } from '../../TextField/TextField';
import { ChevronIcon } from '../../../Icon/Icon';
import { Label } from '../../Label/Label';

const ColorInputView: React.FC<ColorInputViewProps> = ({
  // Basic props
  id,
  name,
  label,
  placeholder = 'Select a color',
  helperText,

  // Styling
  views = {},
  size = 'md',
  shape = 'default',
  variant = 'default',
  shadow,

  // State
  error = false,
  isDisabled = false,
  isReadOnly = false,
  isFocused = false,
  isHovered = false,

  // Color options
  predefinedColors = DefaultColorPalette,
  showCustomInput = true,
  showRecentColors = true,

  // State from hook
  isOpen = false,
  selectedColor = '',
  recentColors = [],
  customColor = '',

  // Handlers from hook
  handleToggle = () => {},
  handleColorSelect = () => {},
  handleCustomColorChange = () => {},
  handleCustomColorSubmit = () => {},
  setIsFocused = () => {},
  setIsHovered = () => {},

  // Refs
  triggerRef,
  dropdownRef,

  // Other props
  onChange,
  ...props
}) => {
  const { getColor } = useTheme();

  // Combine styles
  const containerStyles = {
    ...DefaultColorInputStyles.container,
    ...views?.container,
  };

  const triggerStyles = {
    ...DefaultColorInputStyles.trigger,
    ...Sizes[size],
    ...Shapes[shape],
    ...Variants[variant],
    ...(error && { borderColor: 'color-red-500' }),
    ...(isDisabled && { opacity: 0.6, cursor: 'not-allowed' }),
    ...(isFocused && {
      borderColor: 'color-blue-500',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    }),
    ...(isHovered && !isDisabled && { borderColor: 'color-gray-400' }),
    ...views?.trigger,
    ...(shadow && shadow),
  };

  const dropdownStyles = {
    ...DefaultColorInputStyles.dropdown,
    ...views?.dropdown,
  };

  const colorGridStyles = {
    ...DefaultColorInputStyles.colorGrid,
    ...views?.colorGrid,
  };

  const recentColorsStyles = {
    ...DefaultColorInputStyles.recentColors,
    ...views?.recentColors,
  };

  // Get display color for the selected color swatch
  const displayColor = selectedColor || 'color-gray-200';

  return (
    <View {...containerStyles} {...props}>
      {/* Label */}
      {label && (
        <Label
          htmlFor={id}
          size={size}
          isDisabled={isDisabled}
          error={error}
          views={views?.label}
        >
          {label}
        </Label>
      )}

      {/* Color Input Trigger */}
      <View
        ref={triggerRef}
        onClick={isDisabled || isReadOnly ? undefined : handleToggle}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={isDisabled ? -1 : 0}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label || placeholder}
        width={'fit-content'}
        gap={8}
        {...triggerStyles}
      >
        {/* <Horizontal alignItems="center" gap={8}> */}
        {/* Color preview swatch */}
        <View
          width="20px"
          height="20px"
          borderRadius="4px"
          backgroundColor={displayColor}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="color-gray-300"
        />
        {/* <Text
            color={selectedColor ? 'color-gray-800' : 'color-gray-500'}
            fontSize="inherit"
            {...views?.text}
          >
            {selectedColor || placeholder}
          </Text> */}
        {/* </Horizontal> */}

        {!isReadOnly && !isDisabled && (
          <ChevronIcon
            widthHeight={16}
            color="color-gray-500"
            orientation={isOpen ? 'up' : 'down'}
          />
        )}
      </View>

      {/* Dropdown */}
      {isOpen && (
        <View ref={dropdownRef} {...dropdownStyles}>
          {/* Predefined colors grid */}
          <View {...colorGridStyles}>
            {predefinedColors.map((colorOption, index) => (
              <View
                key={index}
                width="24px"
                height="24px"
                borderRadius="4px"
                backgroundColor={colorOption.value}
                borderWidth="2px"
                borderStyle="solid"
                borderColor={
                  selectedColor === colorOption.value
                    ? 'color-blue-500'
                    : 'transparent'
                }
                cursor="pointer"
                transition="all 0.2s ease"
                onClick={() => handleColorSelect(colorOption.value)}
                title={colorOption.name}
                _hover={{
                  transform: 'scale(1.1)',
                  borderColor: 'color-gray-400',
                }}
                {...views?.colorSwatch}
              />
            ))}
          </View>

          {/* Recent colors */}
          {showRecentColors && recentColors.length > 0 && (
            <Vertical gap={8} marginTop="16px">
              <Text fontSize="12px" fontWeight="500" color="color-gray-600">
                Recent Colors
              </Text>
              <Horizontal gap={4} flexWrap="wrap" {...recentColorsStyles}>
                {recentColors.map((color, index) => (
                  <View
                    key={index}
                    width="20px"
                    height="20px"
                    borderRadius="4px"
                    backgroundColor={color}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor={
                      selectedColor === color
                        ? 'color-blue-500'
                        : 'color-gray-300'
                    }
                    cursor="pointer"
                    transition="all 0.2s ease"
                    onClick={() => handleColorSelect(color)}
                    title={color}
                    _hover={{
                      transform: 'scale(1.1)',
                      borderColor: 'color-gray-400',
                    }}
                  />
                ))}
              </Horizontal>
            </Vertical>
          )}

          {/* Custom color input */}
          {showCustomInput && (
            <Vertical gap={8} marginTop="16px">
              <Text fontSize="12px" fontWeight="500" color="color-gray-600">
                Custom Color
              </Text>
              <Horizontal gap={8}>
                <TextField
                  value={customColor}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  placeholder="#000000 or rgb(0,0,0)"
                  size="sm"
                  style={{ flex: 1 }}
                  views={views?.customInput}
                />
                <View
                  padding="8px 12px"
                  backgroundColor="color-blue-500"
                  borderRadius="4px"
                  cursor="pointer"
                  onClick={handleCustomColorSubmit}
                  _hover={{ backgroundColor: 'color-blue-600' }}
                >
                  <Text color="color-white" fontSize="12px" fontWeight="500">
                    Add
                  </Text>
                </View>
              </Horizontal>
            </Vertical>
          )}
        </View>
      )}

      {/* Helper text */}
      {helperText && (
        <Text
          fontSize="12px"
          color={error ? 'color-red-500' : 'color-gray-600'}
          marginTop="4px"
          {...views?.helperText}
        >
          {helperText}
        </Text>
      )}

      {/* Error message */}
      {error && typeof error === 'string' && (
        <Text
          fontSize="12px"
          color="color-red-500"
          marginTop="4px"
          {...views?.error}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default ColorInputView;
