import React from 'react';
import { ScrollView } from 'react-native';
import { Horizontal, Text, View } from 'app-studio';
import { EmojiPickerViewProps } from './EmojiPicker.props';
import { Sizes, Shapes, Variants, CategoryLabels } from './EmojiPicker.style';
import { ActionSheet } from '../../ActionSheet/ActionSheet';
import { TextField } from '../../Form/TextField/TextField';
import { Emoji } from './EmojiPicker.type';

const EmojiPickerView: React.FC<EmojiPickerViewProps> = ({
  id,
  name: _name,
  label,
  placeholder,
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
  mode = 'picker',
  trigger,
  quickEmojis: _quick,
  selectedEmojis = [],
  expanded,
  setExpanded,
  quickEmojiData,
  text,
  labels: _labels,
  onChange: _change,
  onOpen: _open,
  onClose: _close,
  onEmojiSelect: _select,
  customEmojis: _custom,
  closeOnSelect: _closeOnSelect,
  maxRecentEmojis: _max,
  value: _value,
  defaultValue: _default,
  ...props
}) => {
  const emojiButton = (emoji: Emoji) => (
    <View
      key={emoji.emoji}
      accessibilityRole="button"
      accessibilityLabel={emoji.name}
      accessibilityState={{
        disabled: isDisabled || isReadOnly,
        selected: selectedEmojis.includes(emoji.emoji),
      }}
      minWidth={44}
      minHeight={44}
      borderRadius={8}
      alignItems="center"
      justifyContent="center"
      backgroundColor={
        selectedEmojis.includes(emoji.emoji) ? 'color-blue-50' : 'transparent'
      }
      {...views.emoji}
      onPress={
        isDisabled || isReadOnly ? undefined : () => handleEmojiSelect(emoji)
      }
    >
      <Text fontSize={24}>{emoji.emoji}</Text>
    </View>
  );
  return (
    <View id={id} {...views.container} {...props}>
      {label && (
        <Text marginBottom={4} {...views.label}>
          {label}
        </Text>
      )}
      <View
        ref={triggerRef}
        accessibilityRole="button"
        accessibilityLabel={
          props['aria-label'] ||
          label ||
          (mode === 'reaction' ? text.reaction : text.select)
        }
        accessibilityState={{
          disabled: isDisabled || isReadOnly,
          expanded: isOpen,
        }}
        minHeight={44}
        alignItems="center"
        justifyContent="center"
        {...Sizes[size]}
        {...Shapes[shape]}
        {...Variants[variant]}
        {...views.trigger}
        onPress={isDisabled || isReadOnly ? undefined : handleToggle}
      >
        {trigger !== undefined ? (
          typeof trigger === 'string' ? (
            <Text>{trigger}</Text>
          ) : (
            trigger
          )
        ) : (
          <Text>
            {mode === 'reaction'
              ? '☺ +'
              : selectedEmoji || placeholder || text.select}
          </Text>
        )}
      </View>
      <ActionSheet
        isOpen={isOpen}
        onClose={handleClose}
        title={label || (mode === 'reaction' ? text.reaction : text.select)}
        maxHeight="82%"
        showCancel
        views={{ sheet: views.dropdown }}
      >
        <View ref={dropdownRef} padding={12}>
          {mode === 'reaction' && (
            <Horizontal gap={2} flexWrap="wrap">
              {quickEmojiData.map(emojiButton)}
              <View
                accessibilityRole="button"
                accessibilityLabel={text.more}
                accessibilityState={{ disabled: isDisabled || isReadOnly }}
                minWidth={44}
                minHeight={44}
                onPress={
                  isDisabled || isReadOnly
                    ? undefined
                    : () => setExpanded(!expanded)
                }
              >
                <Text fontSize={24}>+</Text>
              </View>
            </Horizontal>
          )}
          {expanded && (
            <>
              {showSearch && (
                <View marginBottom={8} {...views.searchInput}>
                  <TextField
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={text.search}
                    aria-label={text.search}
                    isDisabled={isDisabled || isReadOnly}
                  />
                </View>
              )}
              {showCategories && (
                <ScrollView horizontal keyboardShouldPersistTaps="handled">
                  <Horizontal gap={4} {...views.categoryTabs}>
                    {enabledCategories
                      .filter(
                        (category) =>
                          category !== 'recent' ||
                          (showRecentEmojis && recentEmojis.length)
                      )
                      .map((category) => (
                        <View
                          key={category}
                          accessibilityRole="tab"
                          accessibilityLabel={text[category]}
                          accessibilityState={{
                            selected: category === activeCategory,
                          }}
                          minWidth={44}
                          minHeight={44}
                          alignItems="center"
                          justifyContent="center"
                          borderRadius={8}
                          backgroundColor={
                            category === activeCategory
                              ? 'color-blue-50'
                              : 'transparent'
                          }
                          {...views.categoryTab}
                          onPress={
                            isDisabled || isReadOnly
                              ? undefined
                              : () => handleCategoryChange(category)
                          }
                        >
                          <Text fontSize={20}>{CategoryLabels[category]}</Text>
                        </View>
                      ))}
                  </Horizontal>
                </ScrollView>
              )}
              <View
                flexDirection="row"
                flexWrap="wrap"
                gap={4}
                {...views.emojiGrid}
              >
                {filteredEmojis.map(emojiButton)}
                {!filteredEmojis.length && (
                  <Text>{searchQuery ? text.empty : text.categoryEmpty}</Text>
                )}
              </View>
            </>
          )}
        </View>
      </ActionSheet>
      {helperText && (
        <Text
          color={error ? 'theme-error' : 'theme-muted'}
          {...views.helperText}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};
export default EmojiPickerView;
