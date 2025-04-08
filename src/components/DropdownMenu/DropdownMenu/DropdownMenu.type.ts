import { ViewProps } from 'app-studio';
import React from 'react';

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'filled' | 'outline';
export type Position = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  items?: DropdownMenuItem[]; // For submenu items
  divider?: boolean;
}

export interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeSubmenuId: string | null;
  setActiveSubmenuId: (id: string | null) => void;
  size: Size;
  variant: Variant;
}

export interface DropdownMenuStyles {
  container?: ViewProps;
  trigger?: ViewProps;
  menu?: ViewProps;
  item?: ViewProps;
  activeItem?: ViewProps;
  divider?: ViewProps;
  icon?: ViewProps;
  submenuIndicator?: ViewProps;
  submenu?: ViewProps;
}
