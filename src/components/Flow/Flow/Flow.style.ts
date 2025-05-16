import { ViewProps } from 'app-studio';
import { Size, Variant } from './Flow.type';

/**
 * Default styles for the Flow component
 */
export const DefaultFlowStyles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative', // Required for absolute positioning of edges, controls
    overflow: 'auto', // Changed from hidden to auto to allow scrolling if content overflows
    backgroundColor: 'color.gray.50',
  } as ViewProps,
  node: {
    backgroundColor: 'white',
    borderRadius: 16,
    border: '2px solid',
    borderColor: 'color.gray.300',
    padding: 16, // Base padding, can be overridden by size
    minWidth: 200, // Base minWidth, can be overridden by size
    minHeight: 60, // Ensure minimum height for nodes
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // For proper positioning of connections
  } as ViewProps,
  startNode: {
    backgroundColor: 'color.blue.100',
    borderColor: 'color.blue.300',
    borderRadius: 32, // More rounded for start node
  } as ViewProps,
  selectedNode: {
    borderColor: 'color.blue.400',
    boxShadow: '0 0 0 2px var(--app-studio-colors-blue-100)', // Use CSS var for theme compatibility
  } as ViewProps,
  edge: {
    // Styles for the SVG path in FlowEdgeView
    stroke: 'var(--app-studio-colors-gray-300)',
    strokeWidth: 2,
    fill: 'none',
  } as ViewProps,
  edgeArrow: {
    // Styles for the arrow marker in FlowEdgeView
    fill: 'var(--app-studio-colors-gray-300)',
  } as ViewProps,
  edgeLabel: {
    // Styles for the label in FlowEdgeView
    backgroundColor: 'white',
    padding: '2px 6px',
    borderRadius: 4,
    fontSize: 12,
    border: '1px solid',
    borderColor: 'color.gray.200',
  } as ViewProps,
  controls: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    display: 'flex',
    gap: 8,
    zIndex: 10, // Ensure controls are above other elements
  } as ViewProps,
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16, // Makes it circular
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: 'color.gray.200',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    _hover: {
      backgroundColor: 'color.gray.100',
    },
  } as ViewProps,
  addNodeButton: {
    // For the small '+' buttons
    width: 28,
    height: 28,
    borderRadius: 14, // Makes it circular
    backgroundColor: 'color.blue.100',
    border: '1px solid',
    borderColor: 'color.blue.300',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    _hover: {
      backgroundColor: 'color.blue.200',
      transform: 'scale(1.1)',
    },
  } as ViewProps,
  nodeContent: {
    // Wrapper for icon and text inside a node
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  } as ViewProps,
  nodeIcon: {
    // Container for the icon in a node
    width: 32,
    height: 32,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0, // Prevent icon from shrinking
  } as ViewProps,
  nodeInfo: {
    // Container for label and subtitle
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flexGrow: 1, // Allow text to take available space
    overflow: 'hidden', // Prevent long text from breaking layout
  } as ViewProps,
};

/**
 * Size variations for the FlowNodeView component
 * These apply to the node's container.
 */
export const FlowNodeSizes: Record<Size, ViewProps> = {
  sm: {
    fontSize: 12, // Affects text if not overridden
    padding: 12,
    minWidth: 160,
  },
  md: {
    fontSize: 14,
    padding: 16,
    minWidth: 200,
  },
  lg: {
    fontSize: 16,
    padding: 20,
    minWidth: 240,
  },
};

/**
 * Variant styles for the FlowNodeView component
 * These apply to the node's container.
 */
export const FlowNodeVariants: Record<Variant, ViewProps> = {
  default: {
    // Base styles are in DefaultFlowStyles.node
    // This variant doesn't add much beyond default
  },
  outline: {
    borderWidth: 2,
    borderColor: 'color.gray.300', // Slightly stronger border
  },
  filled: {
    backgroundColor: 'color.gray.100', // Node itself is filled
    borderColor: 'color.gray.300',
  },
};

/**
 * Node states (applied to FlowNodeView container)
 */
export const FlowNodeStates = {
  // default state is inherent in DefaultFlowStyles.node
  selected: DefaultFlowStyles.selectedNode, // Reference the one defined above
  hover: {
    borderColor: 'color.gray.300', // Subtle hover effect
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Slightly more pronounced shadow
  },
};
