import { ViewProps } from 'app-studio';
import {
  Size,
  Variant,
  FlowNode,
  NodeConnection,
  FlowComponentType,
  FlowViewport,
  NodePosition,
} from './Flow.type';

/**
 * Props for the Flow component
 */
export interface FlowProps extends Omit<ViewProps, 'position'> {
  /**
   * Child elements for compound component pattern
   * Note: Flow component primarily uses `nodes` and `edges` props for data.
   * Children could be used for custom overlays or context providers if needed.
   */
  children?: React.ReactNode;

  /**
   * Array of nodes in the flow
   */
  nodes?: FlowNode[];

  /**
   * Array of edges/connections between nodes
   */
  edges?: NodeConnection[];

  /**
   * Size of the flow nodes
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the flow nodes (affects node appearance)
   * @default 'default'
   */
  variant?: Variant;

  /**
   * Direction of the flow layout (influences default new node placement)
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * Whether to show the controls (zoom, etc.)
   * @default true
   */
  showControls?: boolean;

  /**
   * Whether to allow adding nodes
   * @default true
   */
  allowAddingNodes?: boolean;

  /**
   * Whether to allow deleting nodes (functionality not fully implemented in this simplified version)
   * @default true
   */
  allowDeletingNodes?: boolean;

  /**
   * Whether to allow connecting nodes (functionality not fully implemented in this simplified version)
   * @default true
   */
  allowConnectingNodes?: boolean;

  /**
   * Whether to allow dragging nodes to reposition them
   * @default true
   */
  allowDraggingNodes?: boolean;

  /**
   * Callback when nodes change (e.g., added, position changed)
   */
  onNodesChange?: (nodes: FlowNode[]) => void;

  /**
   * Callback when edges change (e.g., added)
   */
  onEdgesChange?: (edges: NodeConnection[]) => void;

  /**
   * Callback when a node is selected
   */
  onNodeSelect?: (nodeId: string) => void;

  /**
   * Callback when a node is added by user interaction
   * The `newNode` passed will have an ID and default data, but its position
   * will be determined by the `addNodeAfter` logic in `useFlowState`.
   */
  onNodeAdd?: (newNode: FlowNode) => void;

  /**
   * Callback when a node is deleted
   */
  onNodeDelete?: (nodeId: string) => void;

  /**
   * Callback when a connection is created
   */
  onConnect?: (connection: NodeConnection) => void;

  /**
   * Callback when a node drag starts
   */
  onNodeDragStart?: (
    nodeId: string,
    event: React.MouseEvent | React.TouchEvent
  ) => void;

  /**
   * Callback when a node is being dragged
   */
  onNodeDrag?: (
    nodeId: string,
    position: NodePosition,
    event: MouseEvent | TouchEvent
  ) => void;

  /**
   * Callback when a node drag ends
   */
  onNodeDragEnd?: (nodeId: string, position: NodePosition) => void;

  /**
   * ID of the selected node (controlled mode)
   */
  selectedNodeId?: string;

  /**
   * Initial viewport state (zoom, pan)
   */
  initialViewport?: FlowViewport;

  /**
   * Controlled viewport state
   */
  viewport?: FlowViewport;

  /**
   * Callback when viewport changes
   */
  onViewportChange?: (viewport: FlowViewport) => void;

  /**
   * Custom views for styling different parts of the component
   */
  views?: {
    container?: ViewProps; // Styles for the main flow container
    node?: {
      // Styles for FlowNodeView
      container?: ViewProps; // Styles for the node's root View
      content?: ViewProps; // Styles for the Horizontal content wrapper inside the node
      icon?: ViewProps; // Styles for the node's icon View
    };
    edge?: {
      // Styles for FlowEdgeView (placeholder)
      path?: ViewProps; // Styles for the SVG path
      label?: ViewProps; // Styles for the edge label
    };
    controls?: {
      // Styles for FlowControlsView
      container?: ViewProps; // Styles for the controls container
      button?: ViewProps; // Styles for individual control buttons
    };
    addButton?: {
      // Styles for FlowAddNodeButtonView
      container?: ViewProps; // Styles for the add button itself
      icon?: ViewProps; // Styles for the plus icon inside the button
    };
    fixedControlsContainer?: ViewProps; // Styles for the fixed controls container
  };
}

/**
 * Type for the Flow component with sub-components
 */
export type FlowType = FlowComponentType<FlowProps>;
