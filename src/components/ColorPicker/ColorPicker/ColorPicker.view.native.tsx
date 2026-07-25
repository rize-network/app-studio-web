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
import { ActionSheet } from '../../ActionSheet/ActionSheet';

const nativeNoInitialFocusProps = { focusable: false } as any;

// React Native ColorPicker: trigger stays inline, the palette opens as a bottom
// sheet (ActionSheet) — the default native overlay behaviour — instead of an
// absolutely-positioned dropdown. The web-only `<input type="color">` is omitted;
// the hex TextField covers custom entry on native.
const ColorPickerView: React.FC<ColorPickerViewProps> = ({
  id,
  name,
  label,
  placeholder = 'Select a color',
  helperText,
  views = {},
  size = 'md',
  shape = 'default',
  variant = 'default',
  error = false,
  isDisabled = false,
  isReadOnly = false,
  predefinedColors = DefaultColorPalette,
  showCustomInput = true,
  showRecentColors = true,
  isOpen,
  selectedColor,
  recentColors,
  customColor,
  handleToggle,
  handleColorSelect,
  handleCustomColorChange,
  handleCustomColorSubmit,
  handleClose,
  triggerRef,
  dropdownRef,
  onChange,
  onChangeComplete,
  onOpen,
  onClose,
  colorFormat,
  maxRecentColors,
  closeOnSelect,
  defaultValue,
  value,
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
    ...(isDisabled && { opacity: 0.6 }),
    ...views?.trigger,
  };
  const colorGridStyles = {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'flex-start' as const,
    gap: 12,
    paddingBottom: 16,
    ...views?.colorGrid,
  };
  const recentColorsStyles = {
    borderTopWidth: 1,
    borderStyle: 'solid' as const,
    borderTopColor: 'color-gray-100',
    paddingTop: 12,
    ...views?.recentColors,
  };
  const displayColor = selectedColor || 'color-gray-200';
  const sheetHeader = showCustomInput ? (
    <View
      paddingHorizontal={16}
      paddingBottom={12}
      {...DefaultColorPickerStyles.customInput}
      {...views?.customInput}
    >
      <Horizontal gap={8} alignItems="center" marginBottom="10px">
        <Text fontSize="12px" lineHeight="16px" color="color-gray-500">
          HEX
        </Text>
      </Horizontal>
      <TextField
        placeholder="#1D4ED8"
        value={customColor}
        onChange={(e: any) =>
          handleCustomColorChange(
            typeof e === 'string' ? e : e?.target?.value ?? ''
          )
        }
        size="sm"
        isAutoFocus={false}
        autoFocus={false}
        right={
          customColor ? (
            <View
              width="18px"
              height="18px"
              borderRadius="6px"
              backgroundColor={customColor}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="color-gray-200"
              onPress={handleCustomColorSubmit}
              onClick={handleCustomColorSubmit}
            />
          ) : undefined
        }
      />
    </View>
  ) : undefined;
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
        onPress={isDisabled || isReadOnly ? undefined : handleToggle}
        onClick={isDisabled || isReadOnly ? undefined : handleToggle}
        {...triggerStyles}
        {...nativeNoInitialFocusProps}
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

      <ActionSheet
        isOpen={isOpen}
        onClose={handleClose}
        title={typeof label === 'string' ? label : 'Select a color'}
        size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
        maxHeight="82%"
        showCancel
        header={sheetHeader}
        views={{ sheet: views?.dropdown }}
      >
        <View ref={dropdownRef} paddingHorizontal={16} paddingBottom={12}>
          <View {...colorGridStyles}>
            {predefinedColors.map((colorOption, index) => (
              <View
                key={index}
                width="44px"
                height="44px"
                borderRadius="14px"
                backgroundColor={colorOption.value}
                borderWidth={
                  selectedColor === colorOption.value ? '2px' : '1px'
                }
                borderStyle="solid"
                borderColor={
                  selectedColor === colorOption.value
                    ? 'theme-primary'
                    : 'color-gray-200'
                }
                onPress={() => handleColorSelect(colorOption.value)}
                onClick={() => handleColorSelect(colorOption.value)}
                {...views?.colorSwatch}
              />
            ))}
          </View>
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
                    width="32px"
                    height="32px"
                    borderRadius="10px"
                    backgroundColor={color}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="color-gray-200"
                    onPress={() => handleColorSelect(color)}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </Horizontal>
            </View>
          )}
        </View>
      </ActionSheet>

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
