import React from 'react';
import { ActionSheetProps } from './ActionSheet.props';
import { ActionSheetValue } from './ActionSheet.type';

export const useActionSheetState = ({
  isOpen,
  defaultOpen = false,
  value,
  defaultValue,
  isMulti = false,
  onOpenChange,
  onClose,
}: ActionSheetProps) => {
  const isOpenControlled = typeof isOpen === 'boolean';
  const isValueControlled = value !== undefined;
  const initialValue = defaultValue ?? (isMulti ? [] : '');

  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [internalValue, setInternalValue] =
    React.useState<ActionSheetValue>(initialValue);

  const isSheetOpen = isOpenControlled ? !!isOpen : internalOpen;
  const selectedValue = isValueControlled
    ? (value as ActionSheetValue)
    : internalValue;

  const setSheetOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
      if (!nextOpen) onClose?.();
    },
    [isOpenControlled, onClose, onOpenChange]
  );

  const closeSheet = React.useCallback(() => {
    setSheetOpen(false);
  }, [setSheetOpen]);

  const setSelectedValue = React.useCallback(
    (nextValue: ActionSheetValue) => {
      if (!isValueControlled) setInternalValue(nextValue);
    },
    [isValueControlled]
  );

  return {
    isSheetOpen,
    selectedValue,
    setSelectedValue,
    closeSheet,
  };
};
