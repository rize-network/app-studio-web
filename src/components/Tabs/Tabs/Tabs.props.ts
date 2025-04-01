import React from 'react';
import { TabsStyles, Tab } from './Tabs.type';

/**
 * Props for the main Tabs component (External API).
 */
export interface TabsProps {
  /** Array of tab objects to be displayed. Each tab needs a unique `value`. */
  tabs: Tab[];
  /** Optional value of the tab to be active initially. Defaults to the first tab if not provided or not found. */
  initialTabValue?: string | number;
  /** Optional callback function triggered when the active tab changes. Receives the newly active tab object. */
  onTabChange?: (activeTab: Tab) => void;
  /** Optional styles object to customize the appearance of the tabs container, headers, buttons, text, and content area. */
  styles?: TabsStyles;
  /**
   * Optional custom renderer for a single tab button/header.
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
}

/**
 * Props specifically for the TabsView component (Internal).
 * These props are derived or passed down from the main Tabs component.
 */
export interface TabsViewProps {
  /** The original array of tab objects. */
  tabs: Tab[];
  /** The currently active tab object, or undefined if none is active. */
  activeTab: Tab | undefined;
  /** Callback function to handle clicking on a tab header/button. */
  handleTabClick: (tab: Tab) => void;
  /** Optional styles object. */
  styles?: TabsStyles;
  /** Optional custom renderer for a tab button/header. */
  renderTab?: (
    tab: Tab,
    isActive: boolean,
    onClick: () => void
  ) => React.ReactNode;
  /** Optional custom renderer for the content area. */
  renderContent?: (activeTab: Tab) => React.ReactNode;
}
