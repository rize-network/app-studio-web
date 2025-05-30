import { useState, useRef, useEffect, useCallback } from 'react';
import { ColorInputProps } from './ColorInput.props';

export const useColorInputState = (props: ColorInputProps) => {
  const {
    value,
    defaultValue = '',
    onChange,
    onChangeComplete,
    onOpen,
    onClose,
    closeOnSelect = true,
    maxRecentColors = 8,
    showRecentColors = true,
    isAutoFocus = false,
  } = props;

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(value ?? defaultValue);
  const [customColor, setCustomColor] = useState('');
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Refs
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedColor(value);
    }
  }, [value]);

  // Load recent colors from localStorage on mount
  useEffect(() => {
    if (showRecentColors) {
      try {
        const saved = localStorage.getItem('colorInput-recentColors');
        if (saved) {
          setRecentColors(JSON.parse(saved));
        }
      } catch (error) {
        console.warn('Failed to load recent colors from localStorage:', error);
      }
    }
  }, [showRecentColors]);

  // Auto focus
  useEffect(() => {
    if (isAutoFocus && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isAutoFocus]);

  // Click outside to close
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

  // Add color to recent colors
  const addToRecentColors = useCallback(
    (color: string) => {
      if (!showRecentColors) return;

      setRecentColors((prev) => {
        const filtered = prev.filter((c) => c !== color);
        const newRecent = [color, ...filtered].slice(0, maxRecentColors);

        // Save to localStorage
        try {
          localStorage.setItem(
            'colorInput-recentColors',
            JSON.stringify(newRecent)
          );
        } catch (error) {
          console.warn('Failed to save recent colors to localStorage:', error);
        }

        return newRecent;
      });
    },
    [showRecentColors, maxRecentColors]
  );

  // Handlers
  const handleToggle = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen, onOpen, onClose]);

  const handleColorSelect = useCallback(
    (color: string) => {
      setSelectedColor(color);
      addToRecentColors(color);

      onChange?.(color);
      onChangeComplete?.(color);

      if (closeOnSelect) {
        setIsOpen(false);
        onClose?.();
      }
    },
    [onChange, onChangeComplete, closeOnSelect, onClose, addToRecentColors]
  );

  const handleCustomColorChange = useCallback((color: string) => {
    setCustomColor(color);
  }, []);

  const handleCustomColorSubmit = useCallback(() => {
    if (customColor) {
      handleColorSelect(customColor);
      setCustomColor('');
    }
  }, [customColor, handleColorSelect]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const setValue = useCallback(
    (newValue: string) => {
      setSelectedColor(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  return {
    // State
    isOpen,
    selectedColor,
    recentColors,
    customColor,
    isFocused,
    isHovered,

    // Handlers
    handleToggle,
    handleColorSelect,
    handleCustomColorChange,
    handleCustomColorSubmit,
    handleClose,
    setIsFocused,
    setIsHovered,
    setValue,

    // Refs
    triggerRef,
    dropdownRef,
  };
};
