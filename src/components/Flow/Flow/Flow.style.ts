import { ViewProps } from 'app-studio';
import { Size, Variant } from './Flow.type';

/**
 * Default styles for the Flow component
 */
export const DefaultFlowStyles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'color.gray.50',
  },
  node: {
    backgroundColor: 'white',
    borderRadius: 8,
    border: '1px solid',
    borderColor: 'color.gray.200',
    padding: 16,
    minWidth: 200,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  selectedNode: {
    borderColor: 'color.blue.400',
    boxShadow: '0 0 0 2px color.blue.100',
  },
  edge: {
    stroke: 'color.gray.300',
    strokeWidth: 2,
  },
  edgeLabel: {
    backgroundColor: 'white',
    padding: '2px 6px',
    borderRadius: 4,
    fontSize: 12,
    border: '1px solid',
    borderColor: 'color.gray.200',
  },
  controls: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    display: 'flex',
    gap: 8,
    zIndex: 10,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
  },
  addNodeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
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
  },
  nodeContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  nodeIcon: {
    width: 32,
    height: 32,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
};

/**
 * Size variations for the Flow component
 */
export const FlowSizes: Record<Size, ViewProps> = {
  sm: {
    fontSize: 12,
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
 * Variant styles for the Flow component
 */
export const FlowVariants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'white',
    borderColor: 'color.gray.200',
  },
  outline: {
    backgroundColor: 'white',
    borderColor: 'color.gray.300',
    borderWidth: 2,
  },
  filled: {
    backgroundColor: 'color.gray.50',
    borderColor: 'color.gray.200',
  },
};

/**
 * Node states
 */
export const FlowNodeStates = {
  default: {
    backgroundColor: 'white',
    borderColor: 'color.gray.200',
  },
  selected: {
    borderColor: 'color.blue.400',
    boxShadow: '0 0 0 2px color.blue.100',
  },
  hover: {
    borderColor: 'color.gray.300',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
};
