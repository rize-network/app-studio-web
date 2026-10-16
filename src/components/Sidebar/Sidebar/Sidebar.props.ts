import { ViewProps } from 'app-studio';
import React from 'react';
import {
  Position,
  Size,
  Variant,
  BreakpointBehavior,
  SidebarStyles,
  Elevation,
  TransitionPreset,
  SidebarContextType,
} from './Sidebar.type';
export interface SidebarProps {
  // Content to be rendered inside the Sidebar component.
  children: React.ReactNode;
  // Defines the placement of the sidebar relative to its parent container (e.g., 'left', 'right').
  position?: Position;
  // Specifies the predefined size of the sidebar, which can affect its width or height.
  size?: Size;
  // Determines the visual style or behavior of the sidebar, such as 'temporary', 'permanent', or 'persistent'.
  variant?: Variant;
  // Initial expansion state of the sidebar when it is first rendered (uncontrolled mode).
  defaultExpanded?: boolean;
  // Controls the expansion state of the sidebar (controlled mode). If provided, it overrides `defaultExpanded`.
  expanded?: boolean;
  // Callback function triggered when the sidebar's expanded state changes, providing the new state.
  onExpandedChange?: (expanded: boolean) => void;
  // If true, the sidebar will be fixed in position, not scrolling with the content.
  fixed?: boolean;
  // If true, a backdrop will be displayed behind the sidebar when it's open, typically used for temporary variants.
  hasBackdrop?: boolean;
  // Controls the visibility of the expand/collapse toggle button in the sidebar header.
  showToggleButton?: boolean;
  // Specifies the width of the sidebar when it is in the expanded state.
  expandedWidth?: string | number;
  // Specifies the width of the sidebar when it is in the collapsed state.
  collapsedWidth?: string | number;
  // A numerical value (e.g., screen width) at which the sidebar's behavior or layout might change.
  breakpoint?: number;
  // Defines how the sidebar behaves when the screen size crosses the specified `breakpoint`.
  breakpointBehavior?: BreakpointBehavior;
  // Applies a shadow effect to the sidebar, indicating its depth or layering relative to other elements.
  elevation?: Elevation;
  // Determines the animation preset to use when the sidebar transitions between states (e.g., expanding/collapsing).
  transitionPreset?: TransitionPreset;
  // Provides an accessible label for the sidebar, improving usability for screen reader users.
  ariaLabel?: string;
  // Allows for custom styling or overriding default styles for various parts of the sidebar.
  views?: SidebarStyles;
  // Allows for additional, arbitrary props to be passed to the sidebar component.
  [key: string]: any;
}
export interface SidebarHeaderProps {
  // Content to be rendered inside the Sidebar header.
  children: React.ReactNode;
  // Controls the visibility of the expand/collapse toggle button within the header.
  showToggleButton?: boolean;
  // Allows for custom styling or overriding default styles for the header and its sub-elements.
  views?: {
    // Custom view properties for the header container.
    header?: ViewProps;
    // Custom view properties for the toggle button itself.
    toggleButton?: ViewProps;
    // Custom view properties for the icon inside the toggle button.
    toggleButtonIcon?: ViewProps;
  };
  // Allows for additional, arbitrary props to be passed to the sidebar header component.
  [key: string]: any;
}
export interface SidebarContentProps {
  // Content to be rendered inside the Sidebar's main content area.
  children: React.ReactNode;
  // Allows for custom styling or overriding default styles for the content area.
  views?: {
    // Custom view properties for the content container.
    content?: ViewProps;
  };
  // Allows for additional, arbitrary props to be passed to the sidebar content component.
  [key: string]: any;
}
export interface SidebarFooterProps {
  // Content to be rendered inside the Sidebar footer.
  children: React.ReactNode;
  // Allows for custom styling or overriding default styles for the footer area.
  views?: {
    // Custom view properties for the footer container.
    footer?: ViewProps;
  };
  // Allows for additional, arbitrary props to be passed to the sidebar footer component.
  [key: string]: any;
}
export interface SidebarType extends React.FC<SidebarProps> {
  // Represents the Sidebar Header sub-component, used to display top content or controls.
  Header: React.FC<SidebarHeaderProps>;
  // Represents the Sidebar Content sub-component, where the main content of the sidebar resides.
  Content: React.FC<SidebarContentProps>;
  // Represents the Sidebar Footer sub-component, used for bottom content like actions or information.
  Footer: React.FC<SidebarFooterProps>;
  // A hook to access the current Sidebar context, providing state and methods related to the sidebar's behavior.
  useContext: () => SidebarContextType;
}
