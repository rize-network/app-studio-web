import { ViewProps } from 'app-studio';
import React from 'react';
import {
  ActionSheetAnimation,
  ActionSheetItem,
  ActionSheetSize,
  ActionSheetStyles,
  ActionSheetValue,
} from './ActionSheet.type';

export interface ActionSheetProps
  extends Omit<ViewProps, 'children' | 'onChange' | 'onSelect' | 'title'> {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onClose?: () => void;
  isClosePrevented?: boolean;
  dismissOnBackdropPress?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  items?: ActionSheetItem[];
  value?: ActionSheetValue;
  defaultValue?: ActionSheetValue;
  isMulti?: boolean;
  closeOnSelect?: boolean;
  onSelect?: (value: string, item: ActionSheetItem) => void;
  onChange?: (value: ActionSheetValue, item: ActionSheetItem) => void;
  showCancel?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
  showHandle?: boolean;
  size?: ActionSheetSize;
  maxHeight?: number | string;
  animationType?: ActionSheetAnimation;
  views?: ActionSheetStyles;
}

export interface ActionSheetViewProps extends ActionSheetProps {
  isSheetOpen: boolean;
  selectedValue: ActionSheetValue;
  setSelectedValue: (value: ActionSheetValue) => void;
  closeSheet: () => void;
}
