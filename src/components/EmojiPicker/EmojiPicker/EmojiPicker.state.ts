import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  defaultEmojiPickerLabels,
  EmojiPickerProps,
} from './EmojiPicker.props';
import { Emoji, EmojiCategory } from './EmojiPicker.type';
import { DefaultEmojiData, QuickReactionEmojis } from './EmojiPicker.data';

const categories: EmojiCategory[] = [
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
];
const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
const validEmoji = (value: any): value is Emoji =>
  value &&
  typeof value.emoji === 'string' &&
  typeof value.name === 'string' &&
  categories.includes(value.category) &&
  Array.isArray(value.keywords) &&
  value.keywords.every((word: unknown) => typeof word === 'string');

export const useEmojiPickerState = (props: EmojiPickerProps) => {
  const {
    value,
    defaultValue = '',
    onChange,
    onEmojiSelect,
    isOpen: controlledIsOpen,
    onOpen,
    onClose,
    closeOnSelect = true,
    maxRecentEmojis = 16,
    mode = 'picker',
    showRecentEmojis = mode !== 'reaction',
    enabledCategories = categories,
    customEmojis = [],
    isDisabled,
    isReadOnly,
  } = props;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalOpen;
  const [internalEmoji, setInternalEmoji] = useState(defaultValue);
  const selectedEmoji = value ?? internalEmoji;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<EmojiCategory>(
    enabledCategories.find((category) => category !== 'recent') || 'recent'
  );
  const [recentEmojis, setRecentEmojis] = useState<Emoji[]>([]);
  const [expanded, setExpanded] = useState(mode !== 'reaction');
  const triggerRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);
  const text = { ...defaultEmojiPickerLabels, ...props.labels };
  const allEmojis = useMemo(
    () =>
      Array.from(
        new Map(
          [...DefaultEmojiData, ...customEmojis].map((emoji) => [
            emoji.emoji,
            emoji,
          ])
        ).values()
      ),
    [customEmojis]
  );
  const quickEmojiData = useMemo(
    () =>
      (props.quickEmojis ?? QuickReactionEmojis).map(
        (symbol) =>
          allEmojis.find((emoji) => emoji.emoji === symbol) ?? {
            emoji: symbol,
            name: symbol,
            category: 'symbols' as const,
            keywords: [],
          }
      ),
    [allEmojis, props.quickEmojis]
  );
  const filteredEmojis = useMemo(() => {
    const eligible = allEmojis.filter((emoji) =>
      enabledCategories.includes(emoji.category)
    );
    if (searchQuery.trim()) {
      const query = normalize(searchQuery.trim());
      return eligible.filter((emoji) =>
        normalize(
          `${emoji.emoji} ${emoji.name} ${emoji.keywords.join(' ')}`
        ).includes(query)
      );
    }
    return activeCategory === 'recent'
      ? recentEmojis.filter((emoji) =>
          enabledCategories.includes(emoji.category)
        )
      : eligible.filter((emoji) => emoji.category === activeCategory);
  }, [allEmojis, activeCategory, recentEmojis, searchQuery, enabledCategories]);
  useEffect(() => {
    if (!showRecentEmojis || typeof localStorage === 'undefined') return;
    try {
      const stored: unknown = JSON.parse(
        localStorage.getItem('emojiPicker-recentEmojis') || '[]'
      );
      if (Array.isArray(stored))
        setRecentEmojis(stored.filter(validEmoji).slice(0, maxRecentEmojis));
    } catch {
      /* Storage may be disabled; selection remains usable. */
    }
  }, [showRecentEmojis, maxRecentEmojis]);
  useEffect(() => {
    if (!enabledCategories.includes(activeCategory))
      setActiveCategory(
        enabledCategories.find((category) => category !== 'recent') || 'recent'
      );
  }, [enabledCategories, activeCategory]);
  const handleClose = useCallback(() => {
    setInternalOpen(false);
    onClose?.();
  }, [onClose]);
  const handleToggle = useCallback(() => {
    if (isDisabled || isReadOnly) return;
    if (isOpen) {
      handleClose();
      return;
    }
    setInternalOpen(true);
    setSearchQuery('');
    setExpanded(mode !== 'reaction');
    setActiveCategory(
      showRecentEmojis &&
        recentEmojis.length &&
        enabledCategories.includes('recent')
        ? 'recent'
        : enabledCategories.find((category) => category !== 'recent') ||
            'recent'
    );
    onOpen?.();
  }, [
    isOpen,
    isDisabled,
    isReadOnly,
    handleClose,
    mode,
    showRecentEmojis,
    recentEmojis.length,
    enabledCategories,
    onOpen,
  ]);
  const handleEmojiSelect = useCallback(
    (emoji: Emoji) => {
      if (isDisabled || isReadOnly) return;
      setInternalEmoji(emoji.emoji);
      if (showRecentEmojis) {
        const recent = [
          emoji,
          ...recentEmojis.filter((item) => item.emoji !== emoji.emoji),
        ].slice(0, Math.max(0, maxRecentEmojis));
        setRecentEmojis(recent);
        if (typeof localStorage !== 'undefined') {
          try {
            localStorage.setItem(
              'emojiPicker-recentEmojis',
              JSON.stringify(recent)
            );
          } catch {
            /* Optional persistence. */
          }
        }
      }
      onChange?.(emoji.emoji);
      onEmojiSelect?.(emoji);
      if (closeOnSelect) handleClose();
    },
    [
      isDisabled,
      isReadOnly,
      showRecentEmojis,
      recentEmojis,
      maxRecentEmojis,
      onChange,
      onEmojiSelect,
      closeOnSelect,
      handleClose,
    ]
  );
  useEffect(() => {
    if (
      !isOpen ||
      typeof document === 'undefined' ||
      typeof document.addEventListener !== 'function'
    )
      return;
    const outside = (event: MouseEvent) => {
      if (
        dropdownRef.current?.contains &&
        triggerRef.current?.contains &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      )
        handleClose();
    };
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, [isOpen, handleClose]);
  return {
    isOpen,
    selectedEmoji,
    recentEmojis,
    searchQuery,
    activeCategory,
    filteredEmojis,
    handleToggle,
    handleEmojiSelect,
    handleSearchChange: setSearchQuery,
    handleCategoryChange: (category: EmojiCategory) => {
      setActiveCategory(category);
      setSearchQuery('');
    },
    handleClose,
    triggerRef,
    dropdownRef,
    expanded,
    setExpanded,
    quickEmojiData,
    text,
  };
};
