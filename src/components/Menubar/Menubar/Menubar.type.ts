import { ViewProps } from 'app-studio';
import React from 'react';

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'filled' | 'outline';
export type Orientation = 'horizontal' | 'vertical';

export interface MenubarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  items?: MenubarItem[];
  disabled?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

export interface MenubarContextType {
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  isMenuOpen: (id: string) => boolean;
  toggleMenu: (id: string) => void;
  orientation: Orientation;
  size: Size;
  variant: Variant;
  triggerRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

export interface MenubarStyles {
  container?: ViewProps;
  menu?: ViewProps;
  trigger?: ViewProps;
  content?: ViewProps;
  item?: ViewProps;
  activeItem?: ViewProps;
  separator?: ViewProps;
  icon?: ViewProps;
}
