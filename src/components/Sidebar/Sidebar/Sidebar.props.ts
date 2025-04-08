import { ViewProps } from 'app-studio';
import React from 'react';
import {
  Position,
  Size,
  Variant,
  BreakpointBehavior,
  SidebarStyles,
} from './Sidebar.type';

export interface SidebarProps {
  /**
   * The content of the sidebar
   */
  children: React.ReactNode;

  /**
   * The position of the sidebar
   */
  position?: Position;

  /**
   * The size of the sidebar
   */
  size?: Size;

  /**
   * The visual style variant of the sidebar
   */
  variant?: Variant;

  /**
   * Whether the sidebar is initially expanded
   */
  defaultExpanded?: boolean;

  /**
   * Whether the sidebar is expanded (controlled)
   */
  expanded?: boolean;

  /**
   * Callback when the expanded state changes
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * Whether the sidebar is fixed (always visible) or floating
   */
  fixed?: boolean;

  /**
   * Whether to show a backdrop when the sidebar is expanded in mobile view
   */
  hasBackdrop?: boolean;

  /**
   * Whether to show a toggle button
   */
  showToggleButton?: boolean;

  /**
   * The width of the sidebar when expanded
   */
  expandedWidth?: string | number;

  /**
   * The width of the sidebar when collapsed
   */
  collapsedWidth?: string | number;

  /**
   * The breakpoint at which the sidebar changes behavior
   */
  breakpoint?: number;

  /**
   * The behavior of the sidebar at the breakpoint
   */
  breakpointBehavior?: BreakpointBehavior;

  /**
   * Custom styles for different parts of the sidebar
   */
  views?: SidebarStyles;

  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface SidebarHeaderProps {
  /**
   * The content of the sidebar header
   */
  children: React.ReactNode;

  /**
   * Whether to show the toggle button in the header
   */
  showToggleButton?: boolean;

  /**
   * Custom styles for the header
   */
  views?: {
    header?: ViewProps;
    toggleButton?: ViewProps;
    toggleButtonIcon?: ViewProps;
  };

  /**
   * Additional props to be spread to the header element
   */
  [key: string]: any;
}

export interface SidebarContentProps {
  /**
   * The content of the sidebar content area
   */
  children: React.ReactNode;

  /**
   * Custom styles for the content area
   */
  views?: {
    content?: ViewProps;
  };

  /**
   * Additional props to be spread to the content element
   */
  [key: string]: any;
}

export interface SidebarFooterProps {
  /**
   * The content of the sidebar footer
   */
  children: React.ReactNode;

  /**
   * Custom styles for the footer
   */
  views?: {
    footer?: ViewProps;
  };

  /**
   * Additional props to be spread to the footer element
   */
  [key: string]: any;
}

export interface SidebarType extends React.FC<SidebarProps> {
  /**
   * The header component for the sidebar
   */
  Header: React.FC<SidebarHeaderProps>;

  /**
   * The content component for the sidebar
   */
  Content: React.FC<SidebarContentProps>;

  /**
   * The footer component for the sidebar
   */
  Footer: React.FC<SidebarFooterProps>;
}
