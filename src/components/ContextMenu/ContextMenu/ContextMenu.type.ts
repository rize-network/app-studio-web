import { ViewProps } from 'app-studio';
import React from 'react';

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'filled' | 'outline';
export type Position = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  items?: ContextMenuItem[]; // For submenu items
  divider?: boolean;
}

export interface ContextMenuContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
  activeSubmenuId: string | null;
  setActiveSubmenuId: (id: string | null) => void;
  size: Size;
  variant: Variant;
}

export interface ContextMenuStyles {
  container?: ViewProps;
  menu?: ViewProps;
  item?: ViewProps;
  activeItem?: ViewProps;
  divider?: ViewProps;
  icon?: ViewProps;
  submenuIndicator?: ViewProps;
  submenu?: ViewProps;
}
