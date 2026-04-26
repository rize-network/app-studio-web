import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { IconPickerProps } from './IconPicker.props';
import { ICON_LIST } from './IconPicker.constants';
import { IconName } from '../../Icon/Icon';
// This file defines the `useIconPickerState` custom hook, which encapsulates all the state management and core logic for the `IconPicker` component, including opening/closing, icon selection, search functionality, and handling external interactions.
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
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);
  const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>(
    value ?? defaultValue
  );
  const [searchQuery, setSearchQuery] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (value !== undefined) {
      setSelectedIcon(value);
    }
  }, [value]);
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);
  const filteredIcons = useMemo(() => {
    if (!searchQuery) return ICON_LIST.slice(0, 100);
    return ICON_LIST.filter((icon) =>
      icon.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 100);
  }, [searchQuery]);
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
