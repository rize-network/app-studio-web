import { ViewProps } from 'app-studio';
import React from 'react';
import {
  Orientation,
  HandlePosition,
  Size,
  Variant,
  ResizableStyles,
  ResizableStorage,
} from './Resizable.type';
export interface ResizableProps {
  // Defines the content to be rendered inside the Resizable component.
  children: React.ReactNode;
  // Specifies the orientation of the resizable panels (horizontal or vertical).
  orientation?: Orientation;
  // Sets a predefined size configuration for the resizable panels.
  size?: Size;
  // Determines the visual style or behavior variant of the resizable component.
  variant?: Variant;
  // Provides initial sizes for the panels when the component first renders.
  defaultSizes?: (number | string)[];
  // Callback function invoked when the sizes of the panels change.
  onSizesChange?: (sizes: number[]) => void;
  // Sets the minimum overall size allowed for the resizable container.
  minSize?: number;
  // Sets the maximum overall size allowed for the resizable container.
  maxSize?: number;
  // Enables or disables the ability for panels to be collapsed.
  collapsible?: boolean;
  // An ID used to automatically save and restore panel sizes.
  autoSaveId?: string;
  // Specifies the storage mechanism for saving and restoring panel states.
  storage?: ResizableStorage;
  // Defines the step size for resizing panels using keyboard input.
  keyboardResizeBy?: number;
  // Allows custom styling for different parts of the Resizable component.
  views?: ResizableStyles;
  [key: string]: any;
}
export interface ResizablePanelProps {
  // Defines the content to be rendered inside the ResizablePanel component.
  children: React.ReactNode;
  // A unique identifier for the resizable panel.
  id: string;
  // Sets the initial size for this specific panel.
  defaultSize?: number | string;
  // Sets the minimum size allowed for this panel.
  minSize?: number;
  // Sets the maximum size allowed for this panel.
  maxSize?: number;
  // Enables or disables the ability for this panel to be collapsed.
  collapsible?: boolean;
  // Specifies if the panel should be collapsed by default on initial render.
  defaultCollapsed?: boolean;
  // Callback function invoked when the collapsed state of the panel changes.
  onCollapseChange?: (collapsed: boolean) => void;
  // Allows custom styling for the panel and its collapsed state.
  views?: {
    panel?: ViewProps;
    collapsedPanel?: ViewProps;
  };
  [key: string]: any;
}
export interface ResizableHandleProps {
  // A unique identifier for the resizable handle.
  id: string;
  // Specifies the position of the handle relative to the panel it controls.
  position?: HandlePosition;
  // Disables the handle, preventing interaction and resizing.
  disabled?: boolean;
  // Determines if the handle should display a visual indicator during resize.
  withVisualIndicator?: boolean;
  // Enables or disables the collapse button on the handle.
  withCollapseButton?: boolean;
  // Specifies which panel this handle should collapse when its button is pressed.
  collapseTarget?: string;
  // Allows custom styling for the handle, its icon, and the collapse icon.
  views?: {
    handle?: ViewProps;
    handleIcon?: ViewProps;
    collapseIcon?: ViewProps;
  };
  [key: string]: any;
}
export interface ResizableType extends React.FC<ResizableProps> {
  Panel: React.FC<ResizablePanelProps>;
  Handle: React.FC<ResizableHandleProps>;
}
