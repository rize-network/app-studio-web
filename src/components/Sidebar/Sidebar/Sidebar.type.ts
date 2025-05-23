import { ViewProps } from 'app-studio';

export type Position = 'left' | 'right';
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'default' | 'filled' | 'outline' | 'subtle' | 'elevated';
export type BreakpointBehavior = 'collapse' | 'overlay' | 'hide';
export type Elevation = 'none' | 'low' | 'medium' | 'high';
export type TransitionPreset = 'fast' | 'normal' | 'slow' | 'bounce';

export interface SidebarContextType {
  isExpanded: boolean;
  toggleExpanded: () => void;
  expand: () => void;
  collapse: () => void;
  position: Position;
  size: Size;
  variant: Variant;
  views?: SidebarStyles;
}

export interface SidebarStyles {
  container?: ViewProps;
  header?: ViewProps;
  content?: ViewProps;
  footer?: ViewProps;
  backdrop?: ViewProps;
  toggleButton?: ViewProps;
  toggleButtonIcon?: ViewProps;
  divider?: ViewProps;
  navItem?: ViewProps;
  navItemActive?: ViewProps;
  navItemIcon?: ViewProps;
  navItemText?: ViewProps;
  navItemBagde?: ViewProps;
}
