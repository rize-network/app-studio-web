import React from 'react';
import { View, Horizontal, Text, useTheme } from 'app-studio';
import { IconPickerViewProps } from './IconPicker.props';
import {
  DefaultIconPickerStyles,
  Sizes,
  Shapes,
  Variants,
} from './IconPicker.style';
import { TextField } from '../../Form/TextField/TextField';
import { Icon, ChevronIcon } from '../../Icon/Icon';

const IconPickerView: React.FC<IconPickerViewProps> = ({
  // Props
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

  // State
  isOpen,
  selectedIcon,
  searchQuery,
  filteredIcons,

  // Handlers
  handleToggle,
  handleIconSelect,
  handleSearchChange,

  // Refs
  triggerRef,
  dropdownRef,

  // Other
  handleClose,
  onChange,
  ...props
}) => {
  const { getColor } = useTheme();

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
    ...(isDisabled && { opacity: 0.6, cursor: 'not-allowed' }),
    ...views?.trigger,
  };

  const dropdownStyles = {
    ...DefaultIconPickerStyles.dropdown,
    ...views?.dropdown,
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
        onClick={isDisabled || isReadOnly ? undefined : handleToggle}
        {...triggerStyles}
      >
        <Horizontal alignItems="center" gap={8} width="100%">
          {selectedIcon ? (
            <Horizontal alignItems="center" gap={8} width="100%">
              <Icon name={selectedIcon} widthHeight={16} />
              <Text
                color="color-gray-800"
                fontSize="inherit"
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
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

      {isOpen && (
        <View ref={dropdownRef} {...dropdownStyles}>
          {showSearch && (
            <View
              {...DefaultIconPickerStyles.searchInput}
              {...views?.searchInput}
            >
              <TextField
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(value) => handleSearchChange(value)}
                size="sm"
                autoFocus
              />
            </View>
          )}

          <View {...iconGridStyles}>
            {filteredIcons.length > 0 ? (
              filteredIcons.map((iconName) => (
                <View
                  key={iconName}
                  {...DefaultIconPickerStyles.iconItem}
                  onClick={() => handleIconSelect(iconName)}
                  title={iconName}
                  _hover={{
                    backgroundColor: 'color-gray-100',
                  }}
                  backgroundColor={
                    selectedIcon === iconName ? 'color-blue-100' : 'transparent'
                  }
                  {...views?.iconItem}
                >
                  <Icon name={iconName} widthHeight={20} />
                </View>
              ))
            ) : (
              <View
                gridColumn="1 / -1"
                padding="20px"
                textAlign="center"
                color="color-gray-500"
              >
                <Text fontSize="14px">No icons found</Text>
              </View>
            )}
          </View>
        </View>
      )}

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
