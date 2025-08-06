import { ViewProps } from 'app-studio';
// Forward declaration for FlowProps to break circular dependency
// The actual FlowProps is defined in Flow.props.ts
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FlowPropsPlaceholder {}

/**
 * Size options for FlowNodeView
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Variant options for FlowNodeView
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
   * Unique ID for the connection (edge)
   * Recommended to be `edge-${sourceNodeId}-${targetNodeId}` or similar
   */
  id: string;

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
   * Optional custom styling for the connection (applied to FlowEdgeView path)
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
  type?: 'default' | 'start' | 'end' | 'decision' | 'process' | string;

  /**
   * Position of the node. Essential for layout in a full flow library.
   */
  position: NodePosition; // Made position mandatory for clarity in a flow context

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
   * Whether the node is selected (typically managed by state, not set directly on node data)
   * This field can be used if nodes are passed with pre-selected state, but `selectedNodeId` prop is preferred.
   */
  selected?: boolean;

  /**
   * Whether the node is currently being dragged
   */
  isDragging?: boolean;

  /**
   * Whether the node can be dragged
   */
  draggable?: boolean;

  /**
   * Custom styling for the node (applied to FlowNodeView container)
   */
  style?: ViewProps;
}

/**
 * Flow viewport state (relevant for pan and zoom, not used in simplified view)
 */
export interface FlowViewport {
  zoom: number;
  x: number;
  y: number;
}

/**
 * Props for the FlowNodeView component (individual node)
 */
export interface FlowNodeProps extends ViewProps {
  node: FlowNode;
  onSelect?: (nodeId: string) => void;
  isSelected?: boolean;
  isDragging?: boolean;
  onDragStart?: (
    nodeId: string,
    event: React.MouseEvent | React.TouchEvent
  ) => void;
  onDrag?: (
    nodeId: string,
    position: NodePosition,
    event: MouseEvent | TouchEvent
  ) => void;
  onDragEnd?: (nodeId: string, position: NodePosition) => void;
  size?: Size; // Size prop for individual node styling
  variant?: Variant; // Variant prop for individual node styling
  views?: {
    // Custom views for sub-parts of the node
    container?: ViewProps; // Styles for the node's root View
    content?: ViewProps; // Styles for the Horizontal content wrapper
    icon?: ViewProps; // Styles for the icon View
  };
}

/**
 * Props for the FlowEdgeView component (connection line)
 */
export interface FlowEdgeProps extends ViewProps {
  edge: NodeConnection;
  sourceNode?: FlowNode; // Optional: pass source/target nodes for advanced path calculation
  targetNode?: FlowNode; // Optional
  views?: {
    path?: ViewProps;
    label?: ViewProps;
  };
  nodeSize?: Size; // <<< ADDED: To help calculate node dimensions for edge connection
}

/**
 * Props for the FlowControlsView component (zoom/pan buttons)
 */
export interface FlowControlsProps extends ViewProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  views?: {
    container?: ViewProps;
    button?: ViewProps;
    // controls?: ViewProps; // This seems redundant if 'container' is for the whole controls group
  };
}

/**
 * Props for the FlowAddNodeButtonView component (the small '+' button)
 */
export interface FlowAddNodeButtonProps extends Omit<ViewProps, 'position'> {
  // HTML position attribute
  onClick?: () => void;
  /**
   * Visual position relative to the element it's attached to (for styling hints, not layout)
   */
  attachmentPosition?: 'top' | 'right' | 'bottom' | 'left';
  views?: {
    container?: ViewProps;
    icon?: ViewProps;
  };
}

/**
 * Flow component type with sub-components.
 * P represents the props of the main Flow component (e.g., FlowProps).
 */
export interface FlowComponentType<P = FlowPropsPlaceholder>
  extends React.FC<P> {
  Node: React.FC<FlowNodeProps>;
  Edge: React.FC<FlowEdgeProps>; // Placeholder, not fully implemented
  Controls: React.FC<FlowControlsProps>;
  AddNodeButton: React.FC<FlowAddNodeButtonProps>;
}
