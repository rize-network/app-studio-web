import { useState, useRef, useEffect, useCallback } from 'react';
import { ColorInputProps } from './ColorInput.props';
// This file defines the useColorInputState custom hook, centralizing all state management and core logic for the ColorInput component, including dropdown visibility, color selection, custom color input, recent color persistence via localStorage, and external event handling.
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(value ?? defaultValue);
  const [customColor, setCustomColor] = useState('');
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (value !== undefined) {
      setSelectedColor(value);
    }
  }, [value]);
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
  useEffect(() => {
    if (isAutoFocus && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isAutoFocus]);
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
  const addToRecentColors = useCallback(
    (color: string) => {
      if (!showRecentColors) return;
      setRecentColors((prev) => {
        const filtered = prev.filter((c) => c !== color);
        const newRecent = [color, ...filtered].slice(0, maxRecentColors);
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
    isOpen,
    selectedColor,
    recentColors,
    customColor,
    isFocused,
    isHovered,
    handleToggle,
    handleColorSelect,
    handleCustomColorChange,
    handleCustomColorSubmit,
    handleClose,
    setIsFocused,
    setIsHovered,
    setValue,
    triggerRef,
    dropdownRef,
  };
};
