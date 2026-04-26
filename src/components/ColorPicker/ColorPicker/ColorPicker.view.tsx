import React from 'react';
import { View, Horizontal, Vertical, Text } from 'app-studio';
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
  const containerStyles = {
    ...DefaultColorPickerStyles.container,
    ...views?.container,
  };

  const triggerStyles = {
    ...DefaultColorPickerStyles.trigger,
    ...Sizes[size],
    ...Shapes[shape],
    ...Variants[variant],
    ...(error && { borderColor: 'color-red-500' }),
    ...(isDisabled && { opacity: 0.6, cursor: 'not-allowed' }),
    ...(!isDisabled &&
      !isReadOnly && {
        _hover: {
          borderColor: 'rgba(148, 163, 184, 0.9)',
        },
      }),
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
  const displayColor = selectedColor || 'color-gray-200';

  return (
    <View {...containerStyles} {...props}>
      {label && (
        <Text
          fontSize="12px"
          lineHeight="16px"
          fontWeight="500"
          color="color-gray-600"
          marginBottom="6px"
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
          <View
            width="24px"
            height="24px"
            borderRadius="8px"
            backgroundColor={displayColor}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="color-gray-200"
          />

          <Text
            color={selectedColor ? 'color-gray-900' : 'color-gray-500'}
            fontSize="inherit"
          >
            {selectedColor || placeholder}
          </Text>
        </Horizontal>

        {!isReadOnly && !isDisabled && (
          <ChevronIcon
            widthHeight={16}
            color="color-gray-500"
            orientation={isOpen ? 'up' : 'down'}
          />
        )}
      </View>

      {isOpen && (
        <View ref={dropdownRef} {...dropdownStyles}>
          <View {...colorGridStyles}>
            {predefinedColors.map((colorOption, index) => (
              <View
                key={index}
                width="36px"
                height="36px"
                borderRadius="8px"
                backgroundColor={colorOption.value}
                borderWidth="1px"
                borderStyle="solid"
                borderColor={
                  selectedColor === colorOption.value
                    ? 'theme-primary'
                    : 'transparent'
                }
                cursor="pointer"
                onClick={() => handleColorSelect(colorOption.value)}
                title={colorOption.name}
                _hover={{
                  transform: 'scale(1.05)',
                  borderColor: 'color-gray-300',
                }}
                {...views?.colorSwatch}
              />
            ))}
          </View>

          {showCustomInput && (
            <View
              {...DefaultColorPickerStyles.customInput}
              {...views?.customInput}
            >
              <Horizontal gap={8} alignItems="center" marginBottom="10px">
                <input
                  type="color"
                  value={customColor || '#1D4ED8'}
                  onChange={(e) => {
                    const color = e.target.value;
                    handleCustomColorChange(color);
                    handleColorSelect(color);
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                  }}
                  title="Pick a color"
                />
                <Text fontSize="12px" lineHeight="16px" color="color-gray-500">
                  HEX
                </Text>
              </Horizontal>

              <TextField
                placeholder="#1D4ED8"
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
                      width="18px"
                      height="18px"
                      borderRadius="6px"
                      backgroundColor={customColor}
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="color-gray-200"
                      cursor="pointer"
                      onClick={handleCustomColorSubmit}
                    />
                  )
                }
              />
            </View>
          )}

          {showRecentColors && recentColors.length > 0 && (
            <View {...recentColorsStyles}>
              <Text
                fontSize="11px"
                lineHeight="16px"
                fontWeight="500"
                color="color-gray-500"
                marginBottom="8px"
              >
                Recent Colors
              </Text>
              <Horizontal gap={8} flexWrap="wrap">
                {recentColors.map((color, index) => (
                  <View
                    key={index}
                    width="24px"
                    height="24px"
                    borderRadius="8px"
                    backgroundColor={color}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="color-gray-200"
                    cursor="pointer"
                    transition="transform 0.2s ease, border-color 0.2s ease"
                    onClick={() => handleColorSelect(color)}
                    title={color}
                    _hover={{
                      transform: 'scale(1.05)',
                      borderColor: 'color-gray-300',
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
          fontSize="11px"
          lineHeight="16px"
          color={error ? 'color-red-500' : 'color-gray-500'}
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
