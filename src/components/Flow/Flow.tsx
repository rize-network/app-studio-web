import React from 'react';
import { FlowProps, FlowType } from './Flow/Flow.props';
import { useFlowState } from './Flow/Flow.state';
import {
  FlowView,
  FlowNodeView,
  FlowEdgeView,
  FlowControlsView,
  FlowAddNodeButtonView,
} from './Flow/Flow.view';

/**
 * Flow component for creating workflow diagrams.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const nodes = [
 *   {
 *     id: 'node-1',
 *     data: { label: 'Node 1', subtitle: 'Description' },
 *   },
 *   {
 *     id: 'node-2',
 *     data: { label: 'Node 2', subtitle: 'Description' },
 *   },
 * ];
 *
 * const edges = [
 *   { id: 'edge-1', source: 'node-1', target: 'node-2' },
 * ];
 *
 * <Flow nodes={nodes} edges={edges} />
 * ```
 */
const FlowComponent: React.FC<FlowProps> = ({
  children,
  nodes: initialNodes = [],
  edges: initialEdges = [],
  size = 'md',
  variant = 'default',
  direction = 'vertical',
  showControls = true,
  allowAddingNodes = true,
  allowDeletingNodes = true,
  allowConnectingNodes = true,
  onNodesChange,
  onEdgesChange,
  onNodeSelect,
  onNodeAdd,
  onNodeDelete,
  onConnect,
  selectedNodeId,
  views,
  ...props
}) => {
  const flowState = useFlowState({
    initialNodes,
    initialEdges,
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange,
    onEdgesChange,
    onNodeSelect,
    selectedNodeId,
    direction,
  });

  // Handler for adding a node after another node
  const handleAddNode = (
    afterNodeId: string,
    position?: 'below' | 'right' | 'left'
  ) => {
    // Create a new node
    const newNodeId = `node-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      data: {
        label: 'New Step',
        subtitle: 'Select Action Type',
        number: flowState.nodes.length + 1,
      },
    };

    // Add the node after the specified node with the specified position
    flowState.addNodeAfter(afterNodeId, newNode, position);

    // Call the onNodeAdd callback if provided
    if (onNodeAdd) {
      onNodeAdd(newNode);
    }
  };

  // Use a simpler approach to render the flow view
  return React.createElement(FlowView as any, {
    nodes: flowState.nodes,
    edges: flowState.edges,
    selectedNodeId: flowState.selectedNodeId,
    viewport: flowState.viewport,
    onNodeSelect: flowState.selectNode,
    onAddNode: handleAddNode,
    onZoomIn: flowState.zoomIn,
    onZoomOut: flowState.zoomOut,
    onReset: flowState.resetView,
    size,
    variant,
    direction,
    showControls,
    allowAddingNodes,
    views,
    baseId: flowState.baseId,
    ...props,
  });
};

export const Flow = FlowComponent as FlowType;

// Assign the sub-components to the main component
Flow.Node = FlowNodeView;
Flow.Edge = FlowEdgeView;
Flow.Controls = FlowControlsView;
Flow.AddNodeButton = FlowAddNodeButtonView;
