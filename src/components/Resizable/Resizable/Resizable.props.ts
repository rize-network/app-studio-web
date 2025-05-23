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
  /**
   * The content of the resizable container
   */
  children: React.ReactNode;

  /**
   * The orientation of the resizable container
   */
  orientation?: Orientation;

  /**
   * The size of the resize handles
   */
  size?: Size;

  /**
   * The visual style variant of the resize handles
   */
  variant?: Variant;

  /**
   * The default sizes of the panels in pixels or percentages
   * If not provided, panels will have equal sizes
   */
  defaultSizes?: (number | string)[];

  /**
   * Callback when panel sizes change
   */
  onSizesChange?: (sizes: number[]) => void;

  /**
   * Minimum size of any panel in pixels
   */
  minSize?: number;

  /**
   * Maximum size of any panel in pixels
   */
  maxSize?: number;

  /**
   * Whether to collapse panels when they reach minSize
   */
  collapsible?: boolean;

  /**
   * Unique ID for persisting panel sizes in storage
   */
  autoSaveId?: string;

  /**
   * Storage mechanism for persisting panel sizes
   * Defaults to localStorage if not provided
   */
  storage?: ResizableStorage;

  /**
   * Amount to resize by when using keyboard navigation (in pixels)
   * Defaults to 10px
   */
  keyboardResizeBy?: number;

  /**
   * Custom styles for different parts of the resizable component
   */
  views?: ResizableStyles;

  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}

export interface ResizablePanelProps {
  /**
   * The content of the panel
   */
  children: React.ReactNode;

  /**
   * The id of the panel
   */
  id: string;

  /**
   * The default size of the panel in pixels or percentage
   */
  defaultSize?: number | string;

  /**
   * The minimum size of the panel in pixels
   */
  minSize?: number;

  /**
   * The maximum size of the panel in pixels
   */
  maxSize?: number;

  /**
   * Whether the panel can be collapsed
   */
  collapsible?: boolean;

  /**
   * Whether the panel is initially collapsed
   * Only works if collapsible is true
   */
  defaultCollapsed?: boolean;

  /**
   * Callback when panel collapse state changes
   */
  onCollapseChange?: (collapsed: boolean) => void;

  /**
   * Custom styles for the panel
   */
  views?: {
    panel?: ViewProps;
    collapsedPanel?: ViewProps;
  };

  /**
   * Additional props to be spread to the panel element
   */
  [key: string]: any;
}

export interface ResizableHandleProps {
  /**
   * The id of the handle
   */
  id: string;

  /**
   * The position of the handle
   */
  position?: HandlePosition;

  /**
   * Whether the handle is disabled
   */
  disabled?: boolean;

  /**
   * Whether to show a visual indicator when hovering over the handle
   */
  withVisualIndicator?: boolean;

  /**
   * Whether to show a collapse button for adjacent panels
   * Only works if the adjacent panel has collapsible=true
   */
  withCollapseButton?: boolean;

  /**
   * The panel ID to collapse when clicking the collapse button
   * If not provided, will collapse the panel before this handle
   */
  collapseTarget?: string;

  /**
   * Custom styles for the handle
   */
  views?: {
    handle?: ViewProps;
    handleIcon?: ViewProps;
    collapseIcon?: ViewProps;
  };

  /**
   * Additional props to be spread to the handle element
   */
  [key: string]: any;
}

export interface ResizableType extends React.FC<ResizableProps> {
  /**
   * The panel component for the resizable container
   */
  Panel: React.FC<ResizablePanelProps>;

  /**
   * The handle component for resizing panels
   */
  Handle: React.FC<ResizableHandleProps>;
}
