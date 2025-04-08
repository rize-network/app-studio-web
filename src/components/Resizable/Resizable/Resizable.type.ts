import { ViewProps } from 'app-studio';
import React from 'react';

export type Orientation = 'horizontal' | 'vertical';
export type HandlePosition = 'start' | 'end' | 'both';
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'subtle' | 'prominent';

export interface ResizableContextType {
  orientation: Orientation;
  size: Size;
  variant: Variant;
  isResizing: boolean;
  setIsResizing: (isResizing: boolean) => void;
  registerPanel: (id: string, initialSize: number, minSize?: number, maxSize?: number) => void;
  unregisterPanel: (id: string) => void;
  getPanelSize: (id: string) => number;
  setPanelSize: (id: string, size: number) => void;
  startResize: (handleId: string, clientPosition: number) => void;
  onResize: (clientPosition: number) => void;
  endResize: () => void;
}

export interface ResizableStyles {
  container?: ViewProps;
  panel?: ViewProps;
  handle?: ViewProps;
  handleIcon?: ViewProps;
}
