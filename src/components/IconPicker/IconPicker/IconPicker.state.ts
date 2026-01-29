import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { IconPickerProps } from './IconPicker.props';
import { ICON_LIST } from './IconPicker.constants';
import { IconName } from '../../Icon/Icon';

export const useIconPickerState = (props: IconPickerProps) => {
  const {
    value,
    defaultValue,
    onChange,
    isOpen: controlledIsOpen,
    onOpen,
    onClose,
    closeOnSelect = true,
  } = props;

  // State
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);
  const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>(
    value ?? defaultValue
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Refs
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedIcon(value);
    }
  }, [value]);

  // Sync with controlled isOpen
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  // Filter icons
  const filteredIcons = useMemo(() => {
    if (!searchQuery) return ICON_LIST.slice(0, 100);
    return ICON_LIST.filter((icon) =>
      icon.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 100);
  }, [searchQuery]);

  // Outside click
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

  const handleClose = useCallback(() => {
    if (controlledIsOpen === undefined) {
      setIsOpen(false);
    }
    if (onClose) onClose();
  }, [onClose, controlledIsOpen]);

  const handleToggle = useCallback(() => {
    const newIsOpen = !isOpen;

    if (controlledIsOpen === undefined) {
      setIsOpen(newIsOpen);
    }

    if (newIsOpen) {
      if (onOpen) onOpen();
      setSearchQuery('');
    } else {
      if (onClose) onClose();
    }
  }, [isOpen, onOpen, onClose, controlledIsOpen]);

  const handleIconSelect = useCallback(
    (iconName: IconName) => {
      if (value === undefined) {
        setSelectedIcon(iconName);
      }
      if (onChange) onChange(iconName);

      if (closeOnSelect) {
        handleClose();
      }
    },
    [onChange, closeOnSelect, handleClose, value]
  );

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    isOpen,
    selectedIcon,
    searchQuery,
    filteredIcons,
    handleToggle,
    handleIconSelect,
    handleSearchChange,
    handleClose,
    triggerRef,
    dropdownRef,
  };
};
