import { ViewProps } from 'app-studio';
import React from 'react';

export type Orientation = 'horizontal' | 'vertical';
export type HandlePosition = 'start' | 'end' | 'both';
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'subtle' | 'prominent';

/**
 * Storage interface for persisting panel layouts
 */
export interface ResizableStorage {
  /**
   * Get stored panel sizes by ID
   */
  getItem: (id: string) => string | null;

  /**
   * Store panel sizes by ID
   */
  setItem: (id: string, value: string) => void;
}

/**
 * Panel information tracked by the Resizable component
 */
export interface PanelInfo {
  id: string;
  size: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface ResizableContextType {
  orientation: Orientation;
  size: Size;
  variant: Variant;
  isResizing: boolean;
  setIsResizing: (isResizing: boolean) => void;
  registerPanel: (
    id: string,
    initialSize: number,
    minSize?: number,
    maxSize?: number,
    collapsible?: boolean
  ) => void;
  unregisterPanel: (id: string) => void;
  getPanelSize: (id: string) => number;
  setPanelSize: (id: string, size: number) => void;
  isPanelCollapsed: (id: string) => boolean;
  togglePanelCollapse: (id: string) => void;
  startResize: (handleId: string, clientPosition: number) => void;
  onResize: (clientPosition: number) => void;
  endResize: () => void;
}

export interface ResizableStyles {
  container?: ViewProps;
  panel?: ViewProps;
  collapsedPanel?: ViewProps;
  handle?: ViewProps & { _hover?: ViewProps; _active?: ViewProps };
  handleIcon?: ViewProps;
  collapseIcon?: ViewProps;
}
