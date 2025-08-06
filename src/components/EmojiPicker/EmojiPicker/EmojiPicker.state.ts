import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { EmojiPickerProps } from './EmojiPicker.props';
import { Emoji, EmojiCategory } from './EmojiPicker.type';
import { DefaultEmojiData } from './EmojiPicker.style';

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

  // State management
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);
  const [selectedEmoji, setSelectedEmoji] = useState(value ?? defaultValue);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] =
    useState<EmojiCategory>('smileys');
  const [recentEmojis, setRecentEmojis] = useState<Emoji[]>([]);

  // Refs
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Combine default emojis with custom emojis
  const allEmojis = useMemo(() => {
    return [...DefaultEmojiData, ...customEmojis];
  }, [customEmojis]);

  // Filter emojis based on search query and active category
  const filteredEmojis = useMemo(() => {
    let emojis = allEmojis;

    // Filter by category
    if (activeCategory !== 'recent') {
      emojis = emojis.filter((emoji) => emoji.category === activeCategory);
    } else {
      emojis = recentEmojis;
    }

    // Filter by search query
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

  // Sync with controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedEmoji(value);
    }
  }, [value]);

  // Sync with controlled isOpen
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  // Load recent emojis from localStorage
  useEffect(() => {
    if (showRecentEmojis) {
      const stored = localStorage.getItem('emojiPicker-recentEmojis');
      if (stored) {
        try {
          setRecentEmojis(JSON.parse(stored));
        } catch (e) {
          // Ignore invalid JSON
        }
      }
    }
  }, [showRecentEmojis]);

  // Handle outside click to close dropdown
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

  // Add emoji to recent emojis
  const addToRecentEmojis = useCallback(
    (emoji: Emoji) => {
      if (!showRecentEmojis) return;

      setRecentEmojis((prev) => {
        const filtered = prev.filter((e) => e.emoji !== emoji.emoji);
        const newRecent = [emoji, ...filtered].slice(0, maxRecentEmojis);

        // Save to localStorage
        localStorage.setItem(
          'emojiPicker-recentEmojis',
          JSON.stringify(newRecent)
        );

        return newRecent;
      });
    },
    [showRecentEmojis, maxRecentEmojis]
  );

  // Handlers
  const handleToggle = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      onOpen?.();
      // Reset search when opening
      setSearchQuery('');
      // Set active category to recent if we have recent emojis, otherwise smileys
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
      // When searching, show all categories
      if (query && activeCategory === 'recent') {
        setActiveCategory('smileys');
      }
    },
    [activeCategory]
  );

  const handleCategoryChange = useCallback((category: EmojiCategory) => {
    setActiveCategory(category);
    setSearchQuery(''); // Clear search when changing category
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  return {
    // State
    isOpen,
    selectedEmoji,
    recentEmojis,
    searchQuery,
    activeCategory,
    filteredEmojis,

    // Handlers
    handleToggle,
    handleEmojiSelect,
    handleSearchChange,
    handleCategoryChange,
    handleClose,

    // Refs
    triggerRef,
    dropdownRef,
  };
};
