import { ViewProps } from 'app-studio';
import React from 'react';

export type Position = 'left' | 'right';
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'filled' | 'outline';
export type BreakpointBehavior = 'collapse' | 'overlay' | 'hide';

export interface SidebarContextType {
  isExpanded: boolean;
  toggleExpanded: () => void;
  expand: () => void;
  collapse: () => void;
  position: Position;
  size: Size;
  variant: Variant;
}

export interface SidebarStyles {
  container?: ViewProps;
  header?: ViewProps;
  content?: ViewProps;
  footer?: ViewProps;
  backdrop?: ViewProps;
  toggleButton?: ViewProps;
  toggleButtonIcon?: ViewProps;
}
