import React from 'react';
import { View, Horizontal, Text } from 'app-studio';
import { IconPickerViewProps } from './IconPicker.props';
import {
  DefaultIconPickerStyles,
  Sizes,
  Shapes,
  Variants,
} from './IconPicker.style';
import { TextField } from '../../Form/TextField/TextField';
import { Icon, ChevronIcon } from '../../Icon/Icon';
import { ActionSheet } from '../../ActionSheet/ActionSheet';

const nativeNoInitialFocusProps = { focusable: false } as any;

// React Native IconPicker: the trigger stays inline, but the picker panel opens
// as a bottom sheet (ActionSheet) — the default native overlay behaviour shared
// with Select / DropdownMenu / ContextMenu / Menubar — instead of an
// absolutely-positioned dropdown that renders inline on RN.
const IconPickerView: React.FC<IconPickerViewProps> = ({
  label,
  placeholder = 'Select an icon',
  helperText,
  views = {},
  size = 'md',
  shape = 'default',
  variant = 'default',
  error = false,
  isDisabled = false,
  isReadOnly = false,
  showSearch = true,
  isOpen,
  selectedIcon,
  searchQuery,
  filteredIcons,
  handleToggle,
  handleIconSelect,
  handleSearchChange,
  triggerRef,
  dropdownRef,
  handleClose,
  onChange,
  value,
  defaultValue,
  onOpen,
  onClose,
  closeOnSelect,
  ...props
}) => {
  const containerStyles = {
    ...DefaultIconPickerStyles.container,
    ...views?.container,
  };
  const triggerStyles = {
    ...DefaultIconPickerStyles.trigger,
    ...Sizes[size],
    ...Shapes[shape],
    ...Variants[variant],
    ...(error && { borderColor: 'color-red-500' }),
    ...(isDisabled && { opacity: 0.6 }),
    ...views?.trigger,
  };
  const iconGridStyles = {
    ...DefaultIconPickerStyles.iconGrid,
    ...views?.iconGrid,
  };
  return (
    <View {...containerStyles} {...props}>
      {label && (
        <Text
          fontSize={size === 'xs' ? '12px' : size === 'sm' ? '14px' : '16px'}
          fontWeight="500"
          color="color-gray-700"
          marginBottom="4px"
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
        <Horizontal alignItems="center" gap={8} width="100%">
          {selectedIcon ? (
            <Horizontal alignItems="center" gap={8} flex={1}>
              <Icon name={selectedIcon} widthHeight={16} />
              <Text color="color-gray-800" fontSize="inherit">
                {selectedIcon}
              </Text>
            </Horizontal>
          ) : (
            <Text color="color-gray-500" fontSize="inherit">
              {placeholder}
            </Text>
          )}
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
        title={typeof label === 'string' ? label : 'Select an icon'}
        size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
        views={{ sheet: views?.dropdown }}
      >
        {showSearch && (
          <View
            paddingHorizontal={16}
            paddingBottom={8}
            {...views?.searchInput}
          >
            <TextField
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(v: any) =>
                handleSearchChange(
                  typeof v === 'string' ? v : v?.target?.value ?? ''
                )
              }
              size="sm"
              isAutoFocus={false}
              autoFocus={false}
            />
          </View>
        )}
        <View ref={dropdownRef} {...iconGridStyles}>
          {filteredIcons.length > 0 ? (
            filteredIcons.map((iconName) => (
              <View
                key={iconName}
                {...DefaultIconPickerStyles.iconItem}
                onPress={() => handleIconSelect(iconName)}
                onClick={() => handleIconSelect(iconName)}
                backgroundColor={
                  selectedIcon === iconName ? '#EFF6FF' : 'transparent'
                }
                borderWidth={selectedIcon === iconName ? '1px' : '0px'}
                borderStyle="solid"
                borderColor={
                  selectedIcon === iconName ? '#BFDBFE' : 'transparent'
                }
                {...views?.iconItem}
              >
                <Icon name={iconName} widthHeight={20} />
              </View>
            ))
          ) : (
            <View padding="20px" alignItems="center" width="100%">
              <Text fontSize="14px" color="color-gray-500">
                No icons found
              </Text>
            </View>
          )}
        </View>
      </ActionSheet>

      {helperText && (
        <Text
          color={error ? 'color-red-500' : 'color-gray-600'}
          marginTop="4px"
          {...views?.helperText}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};
export default IconPickerView;
