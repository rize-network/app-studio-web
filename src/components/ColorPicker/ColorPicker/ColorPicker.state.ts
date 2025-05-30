import { useState, useRef, useEffect, useCallback } from 'react';
import { ColorPickerProps } from './ColorPicker.props';

export const useColorPickerState = (props: ColorPickerProps) => {
  const {
    value,
    defaultValue = '',
    onChange,
    onChangeComplete,
    isOpen: controlledIsOpen,
    onOpen,
    onClose,
    closeOnSelect = true,
    maxRecentColors = 8,
    showRecentColors = true,
  } = props;

  // State management
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);
  const [selectedColor, setSelectedColor] = useState(value ?? defaultValue);
  const [customColor, setCustomColor] = useState('');
  const [recentColors, setRecentColors] = useState<string[]>([]);

  // Refs
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedColor(value);
    }
  }, [value]);

  // Sync with controlled isOpen
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  // Load recent colors from localStorage
  useEffect(() => {
    if (showRecentColors) {
      const stored = localStorage.getItem('colorPicker-recentColors');
      if (stored) {
        try {
          setRecentColors(JSON.parse(stored));
        } catch (e) {
          // Ignore invalid JSON
        }
      }
    }
  }, [showRecentColors]);

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

  // Add color to recent colors
  const addToRecentColors = useCallback(
    (color: string) => {
      if (!showRecentColors) return;

      setRecentColors((prev) => {
        const filtered = prev.filter((c) => c !== color);
        const newRecent = [color, ...filtered].slice(0, maxRecentColors);

        // Save to localStorage
        localStorage.setItem(
          'colorPicker-recentColors',
          JSON.stringify(newRecent)
        );

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

  return {
    // State
    isOpen,
    selectedColor,
    recentColors,
    customColor,

    // Handlers
    handleToggle,
    handleColorSelect,
    handleCustomColorChange,
    handleCustomColorSubmit,
    handleClose,

    // Refs
    triggerRef,
    dropdownRef,
  };
};
