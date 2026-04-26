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
// Defines the ColorInputView functional component, responsible for rendering the visual structure and interaction logic of the color input. It receives ColorInputViewProps to configure its appearance and behavior.
const ColorInputView: React.FC<ColorInputViewProps> = ({
  id,
  name,
  label,
  placeholder = 'Select a color',
  helperText,
  views = {},
  size = 'md',
  shape = 'default',
  variant = 'default',
  shadow,
  error = false,
  isDisabled = false,
  isReadOnly = false,
  isFocused = false,
  isHovered = false,
  predefinedColors = DefaultColorPalette,
  showCustomInput = true,
  showRecentColors = true,
  isOpen = false,
  selectedColor = '',
  recentColors = [],
  customColor = '',
  handleToggle = () => {},
  handleColorSelect = () => {},
  handleCustomColorChange = () => {},
  handleCustomColorSubmit = () => {},
  setIsFocused = () => {},
  setIsHovered = () => {},
  triggerRef,
  dropdownRef,
  onChange,
  ...props
}) => {
  // Initializes the getColor function from the useTheme hook, allowing access to theme-defined colors for consistent styling.
  const { getColor } = useTheme();
  // Combines default container styles with any custom styles provided through the views.container prop.
  const containerStyles = {
    ...DefaultColorInputStyles.container,
    ...views?.container,
  };
  // Combines default trigger styles with dynamic styles based on size, shape, variant, and component states such as error, disabled, focused, and hovered.
  const triggerStyles = {
    ...DefaultColorInputStyles.trigger,
    ...Sizes[size],
    ...Shapes[shape],
    ...Variants[variant],
    ...(error && { borderColor: 'color-red-500' }),
    ...(isDisabled && { opacity: 0.6, cursor: 'not-allowed' }),
    ...(isFocused && {
      borderColor: 'theme-primary',
      boxShadow:
        '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(29, 78, 216, 0.16)',
    }),
    ...(isHovered && !isDisabled && { borderColor: 'color-gray-400' }),
    ...views?.trigger,
    ...(shadow && shadow),
  };
  // Combines default dropdown styles with any custom styles provided through the views.dropdown prop.
  const dropdownStyles = {
    ...DefaultColorInputStyles.dropdown,
    ...views?.dropdown,
  };
  // Combines default color grid styles with any custom styles provided through the views.colorGrid prop for displaying predefined color swatches.
  const colorGridStyles = {
    ...DefaultColorInputStyles.colorGrid,
    ...views?.colorGrid,
  };
  // Combines default recent colors section styles with any custom styles provided through the views.recentColors prop.
  const recentColorsStyles = {
    ...DefaultColorInputStyles.recentColors,
    ...views?.recentColors,
  };
  // Determines the color to be displayed in the current color swatch, defaulting to 'color-gray-200' if no color is currently selected.
  const displayColor = selectedColor || 'color-gray-200';
  return (
    <View {...containerStyles} {...props}>
      {}
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
      {}
      <View
        ref={triggerRef}
        onClick={isDisabled || isReadOnly ? undefined : handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
        {}
        {}
        <View
          width="20px"
          height="20px"
          borderRadius="4px"
          backgroundColor={displayColor}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="color-gray-300"
        />
        {}
        {}
        {!isReadOnly && !isDisabled && (
          <ChevronIcon
            widthHeight={16}
            color="color-gray-500"
            orientation={isOpen ? 'up' : 'down'}
          />
        )}
      </View>
      {}
      {isOpen && (
        <View ref={dropdownRef} {...dropdownStyles}>
          {}
          <View {...colorGridStyles}>
            {predefinedColors.map((colorOption, index) => (
              <View
                key={index}
                width="24px"
                height="24px"
                borderRadius="8px"
                backgroundColor={colorOption.value}
                borderWidth="2px"
                borderStyle="solid"
                borderColor={
                  selectedColor === colorOption.value
                    ? 'theme-primary'
                    : 'transparent'
                }
                cursor="pointer"
                transition="transform 0.2s ease, border-color 0.2s ease"
                onClick={() => handleColorSelect(colorOption.value)}
                title={colorOption.name}
                _hover={{
                  transform: 'scale(1.05)',
                  borderColor: 'color-gray-400',
                }}
                {...views?.colorSwatch}
              />
            ))}
          </View>
          {}
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
                    borderRadius="8px"
                    backgroundColor={color}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor={
                      selectedColor === color
                        ? 'theme-primary'
                        : 'color-gray-300'
                    }
                    cursor="pointer"
                    transition="transform 0.2s ease, border-color 0.2s ease"
                    onClick={() => handleColorSelect(color)}
                    title={color}
                    _hover={{
                      transform: 'scale(1.05)',
                      borderColor: 'color-gray-400',
                    }}
                  />
                ))}
              </Horizontal>
            </Vertical>
          )}
          {}
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
                  backgroundColor="theme-primary"
                  borderRadius="8px"
                  cursor="pointer"
                  onClick={handleCustomColorSubmit}
                  transition="background-color 0.2s ease, opacity 0.2s ease"
                  _hover={{ backgroundColor: 'color-blue-700' }}
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
      {}
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
      {}
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
