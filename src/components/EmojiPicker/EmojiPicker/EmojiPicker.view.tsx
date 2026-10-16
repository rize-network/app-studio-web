import React, {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
import { Portal } from '../../Portal/Portal';
import { Emoji } from './EmojiPicker.type';

const EmojiPickerView: React.FC<EmojiPickerViewProps> = ({
  id,
  name,
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
  const generatedId = useId();
  const panelId = `${id || generatedId}-panel`;
  const previousOpen = useRef(false);
  const setPanelRef = useCallback(
    (node: HTMLElement | null) => {
      dropdownRef.current = node;
      node
        ?.querySelector<HTMLElement>('input,button')
        ?.focus({ preventScroll: true });
    },
    [dropdownRef]
  );
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 320,
    maxHeight: 400,
  });
  const availableCategories = enabledCategories.filter(
    (category) =>
      category !== 'recent' || (showRecentEmojis && recentEmojis.length > 0)
  );
  useLayoutEffect(() => {
    if (!isOpen) {
      if (
        previousOpen.current &&
        (document.activeElement === document.body ||
          dropdownRef.current?.contains(document.activeElement))
      )
        triggerRef.current?.focus({ preventScroll: true });
      previousOpen.current = false;
      return;
    }
    const locate = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const viewport = window.visualViewport;
      const width = Math.min(320, (viewport?.width ?? window.innerWidth) - 16);
      const left = viewport?.offsetLeft ?? 0;
      const top = viewport?.offsetTop ?? 0;
      const bottom = top + (viewport?.height ?? window.innerHeight) - 8;
      if (rect.bottom < top || rect.top > bottom) {
        handleClose();
        return;
      }
      const height = expanded ? 400 : 64;
      const above = rect.top - top - 16;
      const below = bottom - rect.bottom - 8;
      const upward = below < height && above > below;
      const maxHeight = Math.min(height, Math.max(64, upward ? above : below));
      setPosition({
        width,
        maxHeight,
        left: Math.max(
          left + 8,
          Math.min(
            rect.left,
            left + (viewport?.width ?? window.innerWidth) - width - 8
          )
        ),
        top: upward
          ? Math.max(top + 8, rect.top - maxHeight - 8)
          : rect.bottom + 8,
      });
    };
    locate();
    if (!previousOpen.current)
      (
        dropdownRef.current?.querySelector('input,button') as HTMLElement | null
      )?.focus({ preventScroll: true });
    previousOpen.current = true;
    window.addEventListener('scroll', locate, true);
    window.addEventListener('resize', locate);
    window.visualViewport?.addEventListener('resize', locate);
    return () => {
      window.removeEventListener('scroll', locate, true);
      window.removeEventListener('resize', locate);
      window.visualViewport?.removeEventListener('resize', locate);
    };
  }, [isOpen, expanded]);
  const choose = (emoji: Emoji) => handleEmojiSelect(emoji);
  const emojiButton = (emoji: Emoji, quick = false) => (
    <View
      key={emoji.emoji}
      as="button"
      type="button"
      data-emoji-choice={emoji.emoji}
      aria-label={emoji.name}
      aria-pressed={
        mode === 'reaction'
          ? selectedEmojis.includes(emoji.emoji)
          : selectedEmoji === emoji.emoji
      }
      disabled={isDisabled || isReadOnly}
      {...DefaultEmojiPickerStyles.emoji}
      width={40}
      height={44}
      flex={quick ? 1 : undefined}
      borderWidth={0}
      backgroundColor={
        selectedEmojis.includes(emoji.emoji) ? 'color-blue-50' : 'transparent'
      }
      _hover={{ backgroundColor: 'color-gray-100' }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'theme-primary' }}
      {...views.emoji}
      onClick={() => choose(emoji)}
      title={emoji.name}
    >
      {emoji.emoji}
    </View>
  );
  return (
    <View
      id={id}
      {...DefaultEmojiPickerStyles.container}
      {...views.container}
      {...props}
    >
      {label && (
        <Text marginBottom={4} {...views.label}>
          {label}
        </Text>
      )}
      <View
        ref={triggerRef}
        as="button"
        type="button"
        name={name}
        disabled={isDisabled || isReadOnly}
        aria-label={
          props['aria-label'] ||
          label ||
          (mode === 'reaction' ? text.reaction : text.select)
        }
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        {...DefaultEmojiPickerStyles.trigger}
        {...Sizes[size]}
        {...Shapes[shape]}
        {...Variants[variant]}
        borderColor={error ? 'theme-error' : 'color-gray-200'}
        opacity={isDisabled ? 0.6 : 1}
        _focusVisible={{ outline: '2px solid', outlineColor: 'theme-primary' }}
        {...views.trigger}
        onClick={handleToggle}
      >
        {trigger ?? (
          <Horizontal gap={8}>
            <Text>
              {mode === 'reaction'
                ? '☺ +'
                : selectedEmoji || placeholder || text.select}
            </Text>
            {mode !== 'reaction' && (
              <Text aria-hidden="true">{isOpen ? '▴' : '▾'}</Text>
            )}
          </Horizontal>
        )}
      </View>
      {isOpen && (
        <Portal>
          <View
            ref={setPanelRef}
            id={panelId}
            role="dialog"
            aria-label={mode === 'reaction' ? text.reaction : text.select}
            {...DefaultEmojiPickerStyles.dropdown}
            {...views.dropdown}
            position="fixed"
            top={position.top}
            left={position.left}
            right="auto"
            width={position.width}
            minWidth={0}
            maxHeight={position.maxHeight}
            overflowY="auto"
            padding={mode === 'reaction' && !expanded ? 8 : 12}
            zIndex={1100}
            onKeyDown={(event: React.KeyboardEvent) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                handleClose();
                triggerRef.current?.focus();
                return;
              }
              const buttons = Array.from(
                dropdownRef.current?.querySelectorAll(
                  'button:not(:disabled)'
                ) || []
              ) as HTMLButtonElement[];
              const current = buttons.indexOf(
                document.activeElement as HTMLButtonElement
              );
              if (event.key === 'Tab') {
                if (
                  (event.shiftKey && current <= 0) ||
                  (!event.shiftKey && current === buttons.length - 1)
                )
                  handleClose();
                return;
              }
              if (
                ![
                  'ArrowLeft',
                  'ArrowRight',
                  'ArrowUp',
                  'ArrowDown',
                  'Home',
                  'End',
                ].includes(event.key) ||
                !buttons.length
              )
                return;
              if (
                (event.target as HTMLElement).tagName === 'INPUT' &&
                event.key !== 'ArrowDown'
              )
                return;
              event.preventDefault();
              const inGrid = (
                document.activeElement as HTMLElement | null
              )?.closest('[data-emoji-grid]');
              const step =
                ['ArrowUp', 'ArrowDown'].includes(event.key) && inGrid ? 8 : 1;
              const next =
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                  ? buttons.length - 1
                  : (current +
                      (['ArrowLeft', 'ArrowUp'].includes(event.key)
                        ? -step
                        : step) +
                      buttons.length) %
                    buttons.length;
              buttons[next]?.focus();
              buttons[next]?.scrollIntoView?.({ block: 'nearest' });
            }}
          >
            {mode === 'reaction' && (
              <Horizontal gap={2}>
                {quickEmojiData.map((emoji) => emojiButton(emoji, true))}
                <View
                  as="button"
                  type="button"
                  disabled={isDisabled || isReadOnly}
                  aria-label={text.more}
                  aria-expanded={expanded}
                  minWidth={40}
                  minHeight={44}
                  borderWidth={0}
                  borderRadius={8}
                  onClick={() => setExpanded(!expanded)}
                >
                  +
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
                      size="sm"
                    />
                  </View>
                )}
                {showCategories && (
                  <View
                    role="tablist"
                    aria-label={text.select}
                    {...DefaultEmojiPickerStyles.categoryTabs}
                    {...views.categoryTabs}
                  >
                    {availableCategories.map((category) => (
                      <View
                        key={category}
                        as="button"
                        type="button"
                        role="tab"
                        aria-label={text[category]}
                        aria-selected={category === activeCategory}
                        disabled={isDisabled || isReadOnly}
                        title={text[category]}
                        {...DefaultEmojiPickerStyles.categoryTab}
                        borderWidth={0}
                        minHeight={44}
                        padding={8}
                        backgroundColor={
                          category === activeCategory
                            ? 'color-blue-50'
                            : 'transparent'
                        }
                        {...views.categoryTab}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {CategoryLabels[category]}
                      </View>
                    ))}
                  </View>
                )}
                <View
                  data-emoji-grid="true"
                  role="group"
                  aria-label={text.select}
                  {...DefaultEmojiPickerStyles.emojiGrid}
                  gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                  {...views.emojiGrid}
                >
                  {filteredEmojis.map((emoji) => emojiButton(emoji))}
                  {!filteredEmojis.length && (
                    <Text gridColumn="1 / -1">
                      {searchQuery ? text.empty : text.categoryEmpty}
                    </Text>
                  )}
                </View>
              </>
            )}
          </View>
        </Portal>
      )}
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
