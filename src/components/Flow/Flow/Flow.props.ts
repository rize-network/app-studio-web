import { ViewProps } from 'app-studio';
import {
  Size,
  Variant,
  FlowNode,
  NodeConnection,
  FlowComponentType,
} from './Flow.type';

/**
 * Props for the Flow component
 */
export interface FlowProps extends Omit<ViewProps, 'position'> {
  /**
   * Child elements for compound component pattern
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
   * Visual variant of the flow
   * @default 'default'
   */
  variant?: Variant;

  /**
   * Direction of the flow
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
   * Whether to allow deleting nodes
   * @default true
   */
  allowDeletingNodes?: boolean;

  /**
   * Whether to allow connecting nodes
   * @default true
   */
  allowConnectingNodes?: boolean;

  /**
   * Callback when nodes change
   */
  onNodesChange?: (nodes: FlowNode[]) => void;

  /**
   * Callback when edges change
   */
  onEdgesChange?: (edges: NodeConnection[]) => void;

  /**
   * Callback when a node is selected
   */
  onNodeSelect?: (nodeId: string) => void;

  /**
   * Callback when a node is added
   */
  onNodeAdd?: (node: FlowNode) => void;

  /**
   * Callback when a node is deleted
   */
  onNodeDelete?: (nodeId: string) => void;

  /**
   * Callback when a connection is created
   */
  onConnect?: (connection: NodeConnection) => void;

  /**
   * ID of the selected node
   */
  selectedNodeId?: string;

  /**
   * Custom views for styling different parts of the component
   */
  views?: {
    container?: ViewProps;
    node?: ViewProps;
    edge?: ViewProps;
    controls?: ViewProps;
    addButton?: ViewProps;
  };
}

/**
 * Type for the Flow component with sub-components
 */
export type FlowType = FlowComponentType;
