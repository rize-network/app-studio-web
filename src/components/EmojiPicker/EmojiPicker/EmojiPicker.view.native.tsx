import React from 'react';
import { ScrollView } from 'react-native';
import { View, Horizontal, Text } from 'app-studio';
import { EmojiPickerViewProps } from './EmojiPicker.props';
import {
  DefaultEmojiPickerStyles,
  Sizes,
  Shapes,
  Variants,
  CategoryLabels,
} from './EmojiPicker.style';
import { TextField } from '../../Form/TextField/TextField';
import { ChevronIcon } from '../../Icon/Icon';
import { ActionSheet } from '../../ActionSheet/ActionSheet';

const nativeNoInitialFocusProps = { focusable: false } as any;

// React Native EmojiPicker: trigger stays inline, the picker opens as a bottom
// sheet (ActionSheet) — the default native overlay behaviour. Category tabs are
// a horizontal scroller; the search handler tolerates a plain string.
const EmojiPickerView: React.FC<EmojiPickerViewProps> = ({
  id,
  name,
  label,
  placeholder = 'Select an emoji',
  helperText,
  views = {},
  size = 'md',
  shape = 'default',
  variant = 'default',
  error = false,
  isDisabled = false,
  isReadOnly = false,
  showSearch = true,
  showCategories = true,
  showRecentEmojis = true,
  enabledCategories = [
    'recent',
    'smileys',
    'people',
    'animals',
    'food',
    'activities',
    'travel',
    'objects',
    'symbols',
    'flags',
  ],
  isOpen,
  selectedEmoji,
  recentEmojis,
  searchQuery,
  activeCategory,
  filteredEmojis,
  handleToggle,
  handleEmojiSelect,
  handleSearchChange,
  handleCategoryChange,
  handleClose,
  triggerRef,
  dropdownRef,
  onChange,
  onOpen,
  onClose,
  onEmojiSelect,
  customEmojis,
  closeOnSelect,
  maxRecentEmojis,
  value,
  defaultValue,
  ...props
}) => {
  const containerStyles = {
    ...DefaultEmojiPickerStyles.container,
    ...views?.container,
  };
  const triggerStyles = {
    ...DefaultEmojiPickerStyles.trigger,
    ...Sizes[size],
    ...Shapes[shape],
    ...Variants[variant],
    ...(error && { borderColor: 'color-red-500' }),
    ...(isDisabled && { opacity: 0.6 }),
    ...views?.trigger,
  };
  const emojiGridStyles = {
    ...DefaultEmojiPickerStyles.emojiGrid,
    ...views?.emojiGrid,
  };
  const availableCategories = enabledCategories.filter((category) => {
    if (category === 'recent') {
      return showRecentEmojis && recentEmojis.length > 0;
    }
    return true;
  });
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
        <Horizontal alignItems="center" gap={8}>
          <Text
            color={selectedEmoji ? 'color-gray-800' : 'color-gray-500'}
            fontSize="inherit"
          >
            {selectedEmoji || placeholder}
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
        title={typeof label === 'string' ? label : 'Select an emoji'}
        size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
        views={{ sheet: views?.dropdown }}
      >
        <View ref={dropdownRef} paddingHorizontal={12}>
          {showSearch && (
            <View paddingBottom={8} {...views?.searchInput}>
              <TextField
                placeholder="Search emojis..."
                value={searchQuery}
                onChange={(e: any) =>
                  handleSearchChange(
                    typeof e === 'string' ? e : e?.target?.value ?? ''
                  )
                }
                size="sm"
                isAutoFocus={false}
                autoFocus={false}
              />
            </View>
          )}
          {showCategories && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Horizontal gap={4} paddingBottom={8} {...views?.categoryTabs}>
                {availableCategories.map((category) => (
                  <View
                    key={category}
                    paddingHorizontal={10}
                    paddingVertical={6}
                    borderRadius={8}
                    {...(activeCategory === category && {
                      backgroundColor: 'color-blue-50',
                    })}
                    onPress={() => handleCategoryChange(category)}
                    onClick={() => handleCategoryChange(category)}
                    {...views?.categoryTab}
                  >
                    <Text
                      color={
                        activeCategory === category
                          ? 'theme-primary'
                          : 'color-gray-600'
                      }
                    >
                      {CategoryLabels[category]}
                    </Text>
                  </View>
                ))}
              </Horizontal>
            </ScrollView>
          )}
          <View {...emojiGridStyles}>
            {filteredEmojis.length > 0 ? (
              filteredEmojis.map((emoji, index) => (
                <View
                  key={`${emoji.emoji}-${index}`}
                  {...DefaultEmojiPickerStyles.emoji}
                  onPress={() => handleEmojiSelect(emoji)}
                  onClick={() => handleEmojiSelect(emoji)}
                  {...views?.emoji}
                >
                  <Text fontSize={22} color="color-gray-800">
                    {emoji.emoji}
                  </Text>
                </View>
              ))
            ) : (
              <View padding="20px" alignItems="center" width="100%">
                <Text fontSize="14px" color="color-gray-500">
                  {searchQuery
                    ? 'No emojis found'
                    : 'No emojis in this category'}
                </Text>
              </View>
            )}
          </View>
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
export default EmojiPickerView;
