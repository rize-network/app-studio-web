import { ViewProps } from 'app-studio';
import React from 'react';

export type ActionSheetSize = 'sm' | 'md' | 'lg';
export type ActionSheetValue = string | string[];
export type ActionSheetAnimation = 'none' | 'slide' | 'fade';

export interface ActionSheetItem {
  id?: string;
  value?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  destructive?: boolean;
  divider?: boolean;
  closeOnSelect?: boolean;
  onPress?: (item: ActionSheetItem) => void;
}

export type ActionSheetStyles = {
  overlay?: ViewProps;
  container?: ViewProps;
  sheet?: ViewProps;
  handle?: ViewProps;
  header?: ViewProps;
  title?: ViewProps;
  description?: ViewProps;
  content?: ViewProps;
  item?: ViewProps;
  itemIcon?: ViewProps;
  itemLabel?: ViewProps;
  itemDescription?: ViewProps;
  itemIndicator?: ViewProps;
  divider?: ViewProps;
  cancelButton?: ViewProps;
  cancelLabel?: ViewProps;
};
