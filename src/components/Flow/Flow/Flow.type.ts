import { ViewProps } from 'app-studio';

/**
 * Size options for the Flow component
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Variant options for the Flow component
 */
export type Variant = 'default' | 'outline' | 'filled';

/**
 * Position of a node in the flow
 */
export interface NodePosition {
  x: number;
  y: number;
}

/**
 * Connection between nodes
 */
export interface NodeConnection {
  /**
   * Source node ID
   */
  source: string;

  /**
   * Target node ID
   */
  target: string;

  /**
   * Optional label for the connection
   */
  label?: string;

  /**
   * Optional ID for the connection
   */
  id?: string;

  /**
   * Optional custom styling for the connection
   */
  style?: ViewProps;
}

/**
 * Flow node data structure
 */
export interface FlowNode {
  /**
   * Unique identifier for the node
   */
  id: string;

  /**
   * Node type (used for rendering different node types)
   */
  type?: string;

  /**
   * Position of the node
   */
  position?: NodePosition;

  /**
   * Data associated with the node
   */
  data?: {
    /**
     * Label text for the node
     */
    label?: string;

    /**
     * Subtitle text for the node
     */
    subtitle?: string;

    /**
     * Optional icon to display
     */
    icon?: React.ReactNode;

    /**
     * Optional number/index for the node
     */
    number?: number;

    /**
     * Any additional data
     */
    [key: string]: any;
  };

  /**
   * Whether the node is selected
   */
  selected?: boolean;

  /**
   * Custom styling for the node
   */
  style?: ViewProps;
}

/**
 * Flow viewport state
 */
export interface FlowViewport {
  /**
   * Zoom level (scale)
   */
  zoom: number;

  /**
   * X position offset
   */
  x: number;

  /**
   * Y position offset
   */
  y: number;
}

/**
 * Flow component type with sub-components
 */
export interface FlowComponentType extends React.FC<any> {
  Node: React.FC<FlowNodeProps>;
  Edge: React.FC<FlowEdgeProps>;
  Controls: React.FC<FlowControlsProps>;
  AddNodeButton: React.FC<FlowAddNodeButtonProps>;
}

/**
 * Props for the FlowNode component
 */
export interface FlowNodeProps extends ViewProps {
  /**
   * Node data
   */
  node: FlowNode;

  /**
   * Callback when node is selected
   */
  onSelect?: (nodeId: string) => void;

  /**
   * Whether the node is selected
   */
  isSelected?: boolean;

  /**
   * Custom views for styling
   */
  views?: {
    container?: ViewProps;
    content?: ViewProps;
    icon?: ViewProps;
  };
}

/**
 * Props for the FlowEdge component
 */
export interface FlowEdgeProps extends ViewProps {
  /**
   * Edge/connection data
   */
  edge: NodeConnection;

  /**
   * Custom views for styling
   */
  views?: {
    path?: ViewProps;
    label?: ViewProps;
  };
}

/**
 * Props for the FlowControls component
 */
export interface FlowControlsProps extends ViewProps {
  /**
   * Callback to zoom in
   */
  onZoomIn?: () => void;

  /**
   * Callback to zoom out
   */
  onZoomOut?: () => void;

  /**
   * Callback to reset view
   */
  onReset?: () => void;

  /**
   * Custom views for styling
   */
  views?: {
    container?: ViewProps;
    button?: ViewProps;
    controls?: ViewProps;
  };
}

/**
 * Props for the FlowAddNodeButton component
 */
export interface FlowAddNodeButtonProps extends Omit<ViewProps, 'position'> {
  /**
   * Callback when button is clicked
   */
  onClick?: () => void;

  /**
   * Position of the button
   */
  position?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Custom views for styling
   */
  views?: {
    container?: ViewProps;
    icon?: ViewProps;
  };
}
