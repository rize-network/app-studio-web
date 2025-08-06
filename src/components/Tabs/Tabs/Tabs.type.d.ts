import { ViewProps } from 'app-studio';
import React from 'react';

/**
 * Defines the structure for a single tab.
 */
export type Tab = {
  /** The text displayed on the tab header/button. */
  title: string;
  /** Optional icon element to display next to the title. */
  icon?: React.ReactNode; // Use React.ReactNode instead of any
  /** The content to display when this tab is active. Can be any renderable React node. */
  content?: React.ReactNode; // Use React.ReactNode instead of any
};

/**
 * Context type for managing tab state in compound components
 */
export interface TabsContextType {
  /** Currently active tab value */
  activeValue: string | number | null;
  /** Function to set the active tab */
  setActiveValue: (value: string | number) => void;
  /** Default value for initial tab */
  defaultValue?: string | number;
  /** Callback when tab changes */
  onValueChange?: (value: string | number) => void;
}

/**
 * Defines the structure for applying custom styles to various parts of the Tabs component.
 * Allows using either direct CSSProperties or passing props compatible with underlying Button/Text components.
 */
export type TabsStyles = {
  /** Styles for the main container wrapping the tabs and content. */
  container?: ViewProps;
  /** Styles applied specifically to the active tab header. Merged with `tab` views. */
  activeTab?: ViewProps;
  /** Styles applied specifically to the text within the active tab header. Merged with `title` views. */
  activeText?: ViewProps;
  /** Styles applied to each tab header (both active and inactive). */
  tab?: ViewProps;
  /** Styles applied to the content area displaying the active tab's content. */
  content?: ViewProps;
  /** Styles applied to the text within each tab header (both active and inactive). */
  title?: ViewProps;
  /** Styles applied to the container element that wraps the tab buttons/headers. */
  headerTabs?: ViewProps;
};
