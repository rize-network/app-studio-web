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
// Defines the presentational component for the EmojiPicker, responsible for rendering the UI based on provided props and state. It handles the layout and visual aspects without managing internal state or complex logic.
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
  triggerRef,
  dropdownRef,
  onChange,
  ...props
}) => {
  // Utilizes the `useTheme` hook to retrieve the `getColor` utility, allowing access to theme-defined color values for consistent styling.
  const { getColor } = useTheme();
  // Calculates the final styles for the main container by merging default container styles with any custom styles provided through the `views.container` prop.
  const containerStyles = {
    ...DefaultEmojiPickerStyles.container,
    ...views?.container,
  };
  // Calculates the final styles for the emoji picker's trigger element, incorporating default styles, size, shape, variant, and dynamic adjustments based on `error` or `isDisabled` states, along with custom `views.trigger` styles.
  const triggerStyles = {
    ...DefaultEmojiPickerStyles.trigger,
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
  // Calculates the final styles for the dropdown panel by merging default dropdown styles with any custom styles provided through the `views.dropdown` prop.
  const dropdownStyles = {
    ...DefaultEmojiPickerStyles.dropdown,
    ...views?.dropdown,
  };
  // Calculates the final styles for the category tabs container by merging default styles with any custom styles provided through the `views.categoryTabs` prop.
  const categoryTabsStyles = {
    ...DefaultEmojiPickerStyles.categoryTabs,
    ...views?.categoryTabs,
  };
  // Calculates the final styles for the emoji grid container by merging default styles with any custom styles provided through the `views.emojiGrid` prop.
  const emojiGridStyles = {
    ...DefaultEmojiPickerStyles.emojiGrid,
    ...views?.emojiGrid,
  };
  // Filters the `enabledCategories` to determine which categories should actually be displayed. The 'recent' category is only included if `showRecentEmojis` is true and there are recent emojis available.
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
        onClick={isDisabled || isReadOnly ? undefined : handleToggle}
        {...triggerStyles}
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
      {isOpen && (
        <View ref={dropdownRef} {...dropdownStyles}>
          {}
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
          {}
          {showCategories && (
            <View {...categoryTabsStyles}>
              {availableCategories.map((category) => (
                <View
                  key={category}
                  {...DefaultEmojiPickerStyles.categoryTab}
                  {...(activeCategory === category && {
                    borderBottomColor: 'theme-primary',
                    color: 'theme-primary',
                    backgroundColor: '#EFF6FF',
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
          {}
          <View {...emojiGridStyles}>
            {filteredEmojis.length > 0 ? (
              filteredEmojis.map((emoji, index) => (
                <View
                  key={`${emoji.emoji}-${index}`}
                  {...DefaultEmojiPickerStyles.emoji}
                  onClick={() => handleEmojiSelect(emoji)}
                  title={emoji.name}
                  _hover={{
                    backgroundColor: '#F8FAFC',
                    transform: 'scale(1.05)',
                  }}
                  color="color-gray-800"
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
                color="color-gray-500"
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
