import { ViewProps } from 'app-studio';
// Defines the possible positions for the Sidebar component.
export type Position = 'left' | 'right';
// Specifies the available size options for the Sidebar component.
export type Size = 'sm' | 'md' | 'lg' | 'xl';
// Describes the visual styling variants available for the Sidebar.
export type Variant = 'default' | 'filled' | 'outline' | 'subtle' | 'elevated';
// Determines how the Sidebar behaves at different screen breakpoints (e.g., collapse, overlay, hide).
export type BreakpointBehavior = 'collapse' | 'overlay' | 'hide';
// Defines the elevation levels for the Sidebar, influencing its shadow effect.
export type Elevation = 'none' | 'low' | 'medium' | 'high';
// Specifies the animation speed and style for Sidebar transitions.
export type TransitionPreset = 'fast' | 'normal' | 'slow' | 'bounce';
// Defines the structure of the context object for the Sidebar, providing shared state and functions.
export interface SidebarContextType {
  // Indicates whether the Sidebar is currently expanded or collapsed.
  isExpanded: boolean;
  // A function to switch the Sidebar's expanded state (toggle between expanded and collapsed).
  toggleExpanded: () => void;
  // A function to explicitly set the Sidebar to an expanded state.
  expand: () => void;
  // A function to explicitly set the Sidebar to a collapsed state.
  collapse: () => void;
  // The current position of the Sidebar (e.g., 'left' or 'right').
  position: Position;
  // The current size of the Sidebar (e.g., 'sm', 'md').
  size: Size;
  // The current visual variant applied to the Sidebar.
  variant: Variant;
  // Optional styles to customize different internal parts of the Sidebar component.
  views?: SidebarStyles;
}
// Defines the interface for customizing the styles of various internal components within the Sidebar.
export interface SidebarStyles {
  // Optional styles for the main container element of the Sidebar.
  container?: ViewProps;
  // Optional styles for the header section of the Sidebar.
  header?: ViewProps;
  // Optional styles for the main content area of the Sidebar.
  content?: ViewProps;
  // Optional styles for the footer section of the Sidebar.
  footer?: ViewProps;
  // Optional styles for the overlay backdrop when the Sidebar is open (e.g., in 'overlay' behavior).
  backdrop?: ViewProps;
  // Optional styles for the button used to expand or collapse the Sidebar.
  toggleButton?: ViewProps;
  // Optional styles for the icon displayed within the toggle button.
  toggleButtonIcon?: ViewProps;
  // Optional styles for any divider elements within the Sidebar.
  divider?: ViewProps;
  // Optional styles for a general navigation item within the Sidebar.
  navItem?: ViewProps;
  // Optional styles specifically for an active navigation item.
  navItemActive?: ViewProps;
  // Optional styles for the icon part of a navigation item.
  navItemIcon?: ViewProps;
  // Optional styles for the text label of a navigation item.
  navItemText?: ViewProps;
  // Optional styles for a badge associated with a navigation item.
  navItemBagde?: ViewProps;
}
