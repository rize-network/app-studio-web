import React from 'react';
import { View, Horizontal, Text, useTheme } from 'app-studio';
import { ColorPickerViewProps } from './ColorPicker.props';
import {
  DefaultColorPickerStyles,
  Sizes,
  Shapes,
  Variants,
  DefaultColorPalette,
} from './ColorPicker.style';
import { TextField } from '../../Form/TextField/TextField';
import { ChevronIcon } from '../../Icon/Icon';

const ColorPickerView: React.FC<ColorPickerViewProps> = ({
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

  // State
  error = false,
  isDisabled = false,
  isReadOnly = false,

  // Color options
  predefinedColors = DefaultColorPalette,
  showCustomInput = true,
  showRecentColors = true,

  // State from hook
  isOpen,
  selectedColor,
  recentColors,
  customColor,

  // Handlers from hook
  handleToggle,
  handleColorSelect,
  handleCustomColorChange,
  handleCustomColorSubmit,

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
    ...DefaultColorPickerStyles.container,
    ...views?.container,
  };

  const triggerStyles = {
    ...DefaultColorPickerStyles.trigger,
    ...Sizes[size],
    ...Shapes[shape],
    ...Variants[variant],
    ...(error && { borderColor: 'color.red.500' }),
    ...(isDisabled && { opacity: 0.6, cursor: 'not-allowed' }),
    ...views?.trigger,
  };

  const dropdownStyles = {
    ...DefaultColorPickerStyles.dropdown,
    ...views?.dropdown,
  };

  const colorGridStyles = {
    ...DefaultColorPickerStyles.colorGrid,
    ...views?.colorGrid,
  };

  const recentColorsStyles = {
    ...DefaultColorPickerStyles.recentColors,
    ...views?.recentColors,
  };

  // Get display color for the selected color swatch
  const displayColor = selectedColor || 'color.gray.200';

  return (
    <View {...containerStyles} {...props}>
      {label && (
        <Text
          fontSize={size === 'xs' ? '12px' : size === 'sm' ? '14px' : '16px'}
          fontWeight="500"
          color="color.gray.700"
          marginBottom="4px"
          {...views?.label}
        >
          {label}
        </Text>
      )}

      <View
        ref={triggerRef}
        onClick={isDisabled || isReadOnly ? undefined : handleToggle}
        {...triggerStyles}
      >
        <Horizontal alignItems="center" gap={8}>
          {/* Color preview swatch */}
          <View
            width="20px"
            height="20px"
            borderRadius="4px"
            backgroundColor={displayColor}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="color.gray.300"
          />

          <Text
            color={selectedColor ? 'color.gray.800' : 'color.gray.500'}
            fontSize="inherit"
          >
            {selectedColor || placeholder}
          </Text>
        </Horizontal>

        {!isReadOnly && !isDisabled && (
          <ChevronIcon
            widthHeight={16}
            color="color.gray.500"
            orientation={isOpen ? 'up' : 'down'}
          />
        )}
      </View>

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
                    ? 'color.blue.500'
                    : 'transparent'
                }
                cursor="pointer"
                transition="all 0.2s ease"
                onClick={() => handleColorSelect(colorOption.value)}
                title={colorOption.name}
                _hover={{
                  transform: 'scale(1.1)',
                  borderColor: 'color.gray.400',
                }}
                {...views?.colorSwatch}
              />
            ))}
          </View>

          {/* Custom color input */}
          {showCustomInput && (
            <View
              {...DefaultColorPickerStyles.customInput}
              {...views?.customInput}
            >
              {/* Native color picker */}
              <Horizontal gap={8} alignItems="center" marginBottom="8px">
                <input
                  type="color"
                  value={customColor || '#000000'}
                  onChange={(e) => {
                    const color = e.target.value;
                    handleCustomColorChange(color);
                    handleColorSelect(color);
                  }}
                  style={{
                    width: '40px',
                    height: '32px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                  }}
                  title="Pick a color"
                />
                <Text fontSize="12px" color="color.gray.600">
                  Use native color picker
                </Text>
              </Horizontal>

              {/* Hex input field */}
              <TextField
                placeholder="Enter hex color (e.g., #ff0000)"
                value={customColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCustomColorChange(e.target.value)
                }
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    handleCustomColorSubmit();
                  }
                }}
                size="sm"
                right={
                  customColor && (
                    <View
                      width="16px"
                      height="16px"
                      borderRadius="2px"
                      backgroundColor={customColor}
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="color.gray.300"
                      cursor="pointer"
                      onClick={handleCustomColorSubmit}
                    />
                  )
                }
              />
            </View>
          )}

          {/* Recent colors */}
          {showRecentColors && recentColors.length > 0 && (
            <View {...recentColorsStyles}>
              <Text fontWeight="500" color="color.gray.600" marginBottom="8px">
                Recent Colors
              </Text>
              <Horizontal gap={8} flexWrap="wrap">
                {recentColors.map((color, index) => (
                  <View
                    key={index}
                    width="20px"
                    height="20px"
                    borderRadius="4px"
                    backgroundColor={color}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="color.gray.300"
                    cursor="pointer"
                    onClick={() => handleColorSelect(color)}
                    title={color}
                    _hover={{
                      transform: 'scale(1.1)',
                    }}
                  />
                ))}
              </Horizontal>
            </View>
          )}
        </View>
      )}

      {helperText && (
        <Text
          color={error ? 'color.red.500' : 'color.gray.600'}
          marginTop="4px"
          {...views?.helperText}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};

export default ColorPickerView;
