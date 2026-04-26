import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { EmojiPickerProps } from './EmojiPicker.props';
import { Emoji, EmojiCategory } from './EmojiPicker.type';
import { DefaultEmojiData } from './EmojiPicker.style';
// This file defines the `useEmojiPickerState` custom hook, which encapsulates all local state management, derived states, and associated logic for the EmojiPicker component, including handling open/close, emoji selection, search, category management, recent emojis, and side effects like persistence and event listeners.
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
    customEmojis = [],
  } = props;
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);
  const [selectedEmoji, setSelectedEmoji] = useState(value ?? defaultValue);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] =
    useState<EmojiCategory>('smileys');
  const [recentEmojis, setRecentEmojis] = useState<Emoji[]>([]);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const allEmojis = useMemo(() => {
    return [...DefaultEmojiData, ...customEmojis];
  }, [customEmojis]);
  const filteredEmojis = useMemo(() => {
    let emojis = allEmojis;
    if (activeCategory !== 'recent') {
      emojis = emojis.filter((emoji) => emoji.category === activeCategory);
    } else {
      emojis = recentEmojis;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      emojis = emojis.filter(
        (emoji) =>
          emoji.name.toLowerCase().includes(query) ||
          emoji.keywords.some((keyword) =>
            keyword.toLowerCase().includes(query)
          )
      );
    }
    return emojis;
  }, [allEmojis, activeCategory, recentEmojis, searchQuery]);
  useEffect(() => {
    if (value !== undefined) {
      setSelectedEmoji(value);
    }
  }, [value]);
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);
  useEffect(() => {
    if (showRecentEmojis) {
      const stored = localStorage.getItem('emojiPicker-recentEmojis');
      if (stored) {
        try {
          setRecentEmojis(JSON.parse(stored));
        } catch (e) {}
      }
    }
  }, [showRecentEmojis]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        dropdownRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  const addToRecentEmojis = useCallback(
    (emoji: Emoji) => {
      if (!showRecentEmojis) return;
      setRecentEmojis((prev) => {
        const filtered = prev.filter((e) => e.emoji !== emoji.emoji);
        const newRecent = [emoji, ...filtered].slice(0, maxRecentEmojis);
        localStorage.setItem(
          'emojiPicker-recentEmojis',
          JSON.stringify(newRecent)
        );
        return newRecent;
      });
    },
    [showRecentEmojis, maxRecentEmojis]
  );
  const handleToggle = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen) {
      onOpen?.();
      setSearchQuery('');
      if (showRecentEmojis && recentEmojis.length > 0) {
        setActiveCategory('recent');
      } else {
        setActiveCategory('smileys');
      }
    } else {
      onClose?.();
    }
  }, [isOpen, onOpen, onClose, showRecentEmojis, recentEmojis.length]);
  const handleEmojiSelect = useCallback(
    (emoji: Emoji) => {
      setSelectedEmoji(emoji.emoji);
      addToRecentEmojis(emoji);
      onChange?.(emoji.emoji);
      onEmojiSelect?.(emoji);
      if (closeOnSelect) {
        setIsOpen(false);
        onClose?.();
      }
    },
    [onChange, onEmojiSelect, closeOnSelect, onClose, addToRecentEmojis]
  );
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query && activeCategory === 'recent') {
        setActiveCategory('smileys');
      }
    },
    [activeCategory]
  );
  const handleCategoryChange = useCallback((category: EmojiCategory) => {
    setActiveCategory(category);
    setSearchQuery('');
  }, []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);
  return {
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
  };
};
