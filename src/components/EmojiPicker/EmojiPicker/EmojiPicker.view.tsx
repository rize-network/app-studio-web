import React from 'react';
import { View, Horizontal, Text, useTheme } from 'app-studio';
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

const EmojiPickerView: React.FC<EmojiPickerViewProps> = ({
  // Basic props
  id,
  name,
  label,
  placeholder = 'Select an emoji',
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

  // Emoji options
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

  // State from hook
  isOpen,
  selectedEmoji,
  recentEmojis,
  searchQuery,
  activeCategory,
  filteredEmojis,

  // Handlers from hook
  handleToggle,
  handleEmojiSelect,
  handleSearchChange,
  handleCategoryChange,

  // Refs
  triggerRef,
  dropdownRef,

  // Other props
  ...props
}) => {
  const { getColor } = useTheme();

  // Combine styles
  const containerStyles = {
    ...DefaultEmojiPickerStyles.container,
    ...views?.container,
  };

  const triggerStyles = {
    ...DefaultEmojiPickerStyles.trigger,
    ...Sizes[size],
    ...Shapes[shape],
    ...Variants[variant],
    ...(error && { borderColor: 'color.red.500' }),
    ...(isDisabled && { opacity: 0.6, cursor: 'not-allowed' }),
    ...views?.trigger,
  };

  const dropdownStyles = {
    ...DefaultEmojiPickerStyles.dropdown,
    ...views?.dropdown,
  };

  const categoryTabsStyles = {
    ...DefaultEmojiPickerStyles.categoryTabs,
    ...views?.categoryTabs,
  };

  const emojiGridStyles = {
    ...DefaultEmojiPickerStyles.emojiGrid,
    ...views?.emojiGrid,
  };

  // Filter enabled categories
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
          <Text
            color={selectedEmoji ? 'color.gray.800' : 'color.gray.500'}
            fontSize="inherit"
          >
            {selectedEmoji || placeholder}
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
          {/* Search input */}
          {showSearch && (
            <View
              {...DefaultEmojiPickerStyles.searchInput}
              {...views?.searchInput}
            >
              <TextField
                placeholder="Search emojis..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                size="sm"
              />
            </View>
          )}

          {/* Category tabs */}
          {showCategories && (
            <View {...categoryTabsStyles}>
              {availableCategories.map((category) => (
                <View
                  key={category}
                  {...DefaultEmojiPickerStyles.categoryTab}
                  {...(activeCategory === category && {
                    borderBottomColor: 'color.blue.500',
                    color: 'color.blue.600',
                  })}
                  onClick={() => handleCategoryChange(category)}
                  title={category.charAt(0).toUpperCase() + category.slice(1)}
                  {...views?.categoryTab}
                >
                  {CategoryLabels[category]}
                </View>
              ))}
            </View>
          )}

          {/* Emoji grid */}
          <View {...emojiGridStyles}>
            {filteredEmojis.length > 0 ? (
              filteredEmojis.map((emoji, index) => (
                <View
                  key={`${emoji.emoji}-${index}`}
                  {...DefaultEmojiPickerStyles.emoji}
                  onClick={() => handleEmojiSelect(emoji)}
                  title={emoji.name}
                  _hover={{
                    backgroundColor: 'color.gray.100',
                  }}
                  color="color.gray.800"
                  {...views?.emoji}
                >
                  {emoji.emoji}
                </View>
              ))
            ) : (
              <View
                gridColumn="1 / -1"
                padding="20px"
                textAlign="center"
                color="color.gray.500"
              >
                <Text fontSize="14px">
                  {searchQuery
                    ? 'No emojis found'
                    : 'No emojis in this category'}
                </Text>
              </View>
            )}
          </View>
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

export default EmojiPickerView;
