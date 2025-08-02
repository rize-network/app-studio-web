import React from 'react';
import { TabsStyles, Tab } from './Tabs.type';
import { ViewProps } from 'app-studio';

/**
 * Props for the main Tabs component (External API).
 * Supports both data-driven approach (with tabs prop) and compound component pattern.
 */
export interface TabsProps {
  /** Array of tab objects to be displayed. Each tab needs a unique `value`. (Data-driven approach) */
  tabs?: Tab[];
  /** Optional value of the tab to be active initially. Defaults to the first tab if not provided or not found. */
  defaultValue?: string | number;
  /** Optional callback function triggered when the active tab changes. Receives the newly active tab object. */
  onTabChange?: (activeTab: Tab) => void;
  /** Optional styles object to customize the appearance of the tabs container, headers, text, and content area. */
  views?: TabsStyles;
  /** Optional position of the icon relative to the text in tab headers. */
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Optional custom renderer for a single tab header.
   * Receives the tab data, whether it's currently active, and an onClick handler to activate the tab.
   */
  renderTab?: (
    tab: Tab,
    isActive: boolean,
    onClick: () => void
  ) => React.ReactNode;
  /**
   * Optional custom renderer for the content area.
   * Receives the currently active tab object.
   * If not provided, the `content` property from the active tab object will be rendered.
   */
  renderContent?: (activeTab: Tab) => React.ReactNode;

  /** Current value for controlled compound component pattern */
  value?: string;
  /** Callback when tab value changes in compound component pattern */
  onValueChange?: (value: any) => void;
  /** Children for compound component pattern */
  children?: React.ReactNode;
}

/**
 * Props specifically for the TabsView component (Internal).
 * These props are derived or passed down from the main Tabs component.
 */
export interface TabsViewProps {
  iconPosition?: 'left' | 'right' | 'bottom' | 'top'; // Added iconPosition prop
  /** The original array of tab objects. */
  tabs: Tab[];
  /** The currently active tab object, or undefined if none is active. */
  activeTab: Tab | undefined;
  /** Callback function to handle clicking on a tab header/button. */
  handleTabClick: (tab: Tab) => void;
  /** Optional styles object. */
  views?: TabsStyles;
  /** Optional custom renderer for a tab button/header. */
  renderTab?: (
    tab: Tab,
    isActive: boolean,
    onClick: () => void
  ) => React.ReactNode;
  /** Optional custom renderer for the content area. */
  renderContent?: (activeTab: Tab) => React.ReactNode;
}

/**
 * Props for TabsList compound component
 */
export interface TabsListProps {
  /** Children (TabsTrigger components) */
  children: React.ReactNode;
  /** Custom styles for the list container */
  views?: {
    container?: ViewProps;
  };
}

/**
 * Props for TabsTrigger compound component
 */
export interface TabsTriggerProps {
  /** Unique value for this tab */
  value: string;
  /** Children content for the trigger */
  children: React.ReactNode;
  /** Whether this trigger is disabled */
  disabled?: boolean;
  /** Custom styles for the trigger */
  views?: {
    trigger?: ViewProps;
    activeState?: ViewProps;
  };
}

/**
 * Props for TabsContent compound component
 */
export interface TabsContentProps {
  /** Value that this content corresponds to */
  value: string;
  /** Children content to display when this tab is active */
  children: React.ReactNode;
  /** Custom styles for the content */
  views?: {
    content?: ViewProps;
  };
}
