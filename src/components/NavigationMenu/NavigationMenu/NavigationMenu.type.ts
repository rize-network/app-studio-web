import { ViewProps } from 'app-studio';
import React from 'react';

export type Orientation = 'horizontal' | 'vertical';
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'filled' | 'outline';

export interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  items?: NavigationItem[];
  disabled?: boolean;
}

export interface NavigationMenuContextType {
  activeItemId: string | null;
  setActiveItemId: (id: string | null) => void;
  expandedItemIds: string[];
  toggleExpandedItem: (id: string) => void;
  isItemExpanded: (id: string) => boolean;
  onItemActivate?: (itemId: string) => void;
  orientation: Orientation;
  size: Size;
  variant: Variant;
}

export interface NavigationMenuStyles {
  container?: ViewProps;
  list?: ViewProps;
  item?: ViewProps;
  activeItem?: ViewProps;
  content?: ViewProps;
  trigger?: ViewProps;
  icon?: ViewProps;
  indicator?: ViewProps;
}
