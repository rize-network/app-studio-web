import React from 'react';
import { View, Horizontal, Vertical, Text } from 'app-studio';
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
import { ActionSheet } from '../../../ActionSheet/ActionSheet';

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
  handleClose,
  triggerRef,
  dropdownRef,
  closeOnSelect,
  value,
  defaultValue,
  onFocus,
  onBlur,
  ...props
}) => {
  // The trigger is a plain RN View driven by onPress, which has no focus
  // events, so the public onFocus/onBlur are proxied onto the popup
  // lifecycle: opening the sheet reports focus, closing it reports blur.
  // The effect covers every close path (toggle, backdrop, closeOnSelect).
  const wasOpenRef = React.useRef(isOpen);
  React.useEffect(() => {
    if (wasOpenRef.current === isOpen) return;
    wasOpenRef.current = isOpen;
    if (isOpen) {
      onFocus?.();
    } else {
      // `onBlur` receives the blur event on web; there is none here.
      onBlur?.(undefined);
    }
  }, [isOpen, onFocus, onBlur]);
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
    ...(isDisabled && { opacity: 0.6 }),
    ...views?.trigger,
    ...(shadow && shadow),
  };
  const colorGridStyles = {
    ...DefaultColorInputStyles.colorGrid,
    ...views?.colorGrid,
  };
  const recentColorsStyles = {
    ...DefaultColorInputStyles.recentColors,
    ...views?.recentColors,
  };
  const displayColor = selectedColor || 'color-gray-200';
  const sheetSize =
    size === 'xs' || size === 'sm' ? 'sm' : size === 'xl' ? 'lg' : 'md';

  return (
    <View {...containerStyles} {...(props as any)}>
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
        onPress={isDisabled || isReadOnly ? undefined : handleToggle}
        onClick={isDisabled || isReadOnly ? undefined : handleToggle}
        width={'fit-content'}
        gap={8}
        {...triggerStyles}
      >
        <View
          width="20px"
          height="20px"
          borderRadius="4px"
          backgroundColor={displayColor}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="color-gray-300"
        />
        <Text
          color={selectedColor ? 'color-gray-900' : 'color-gray-500'}
          fontSize="inherit"
          {...views?.text}
        >
          {selectedColor || placeholder}
        </Text>
        {!isReadOnly && !isDisabled && (
          <ChevronIcon
            widthHeight={16}
            color="color-gray-500"
            orientation={isOpen ? 'up' : 'down'}
          />
        )}
      </View>

      <ActionSheet
        isOpen={isOpen}
        onClose={handleClose}
        title={label || placeholder}
        size={sheetSize}
        views={{ sheet: views?.dropdown }}
      >
        <View ref={dropdownRef} paddingHorizontal={16}>
          <View {...colorGridStyles}>
            {predefinedColors.map((colorOption, index) => (
              <View
                key={index}
                width="36px"
                height="36px"
                borderRadius="8px"
                backgroundColor={colorOption.value}
                borderWidth="2px"
                borderStyle="solid"
                borderColor={
                  selectedColor === colorOption.value
                    ? 'theme-primary'
                    : 'transparent'
                }
                onPress={() => handleColorSelect(colorOption.value)}
                onClick={() => handleColorSelect(colorOption.value)}
                {...views?.colorSwatch}
              />
            ))}
          </View>

          {showRecentColors && recentColors.length > 0 && (
            <Vertical gap={8} marginTop="16px">
              <Text fontSize="12px" fontWeight="500" color="color-gray-600">
                Recent Colors
              </Text>
              <Horizontal gap={8} flexWrap="wrap" {...recentColorsStyles}>
                {recentColors.map((color, index) => (
                  <View
                    key={index}
                    width="24px"
                    height="24px"
                    borderRadius="8px"
                    backgroundColor={color}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor={
                      selectedColor === color
                        ? 'theme-primary'
                        : 'color-gray-300'
                    }
                    onPress={() => handleColorSelect(color)}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </Horizontal>
            </Vertical>
          )}

          {showCustomInput && (
            <Vertical gap={8} marginTop="16px">
              <Text fontSize="12px" fontWeight="500" color="color-gray-600">
                Custom Color
              </Text>
              <Horizontal gap={8}>
                <TextField
                  value={customColor}
                  onChange={handleCustomColorChange}
                  placeholder="#000000 or rgb(0,0,0)"
                  size="sm"
                  style={{ flex: 1 }}
                  views={views?.customInput}
                />
                <View
                  padding="8px 12px"
                  backgroundColor="theme-primary"
                  borderRadius="8px"
                  onPress={handleCustomColorSubmit}
                  onClick={handleCustomColorSubmit}
                >
                  <Text color="color-white" fontSize="12px" fontWeight="500">
                    Add
                  </Text>
                </View>
              </Horizontal>
            </Vertical>
          )}
        </View>
      </ActionSheet>

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
