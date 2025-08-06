import React from 'react';
import { FlowProps, FlowType } from './Flow/Flow.props';
import { useFlowState } from './Flow/Flow.state';
import { FlowNode, NodeConnection, NodePosition } from './Flow/Flow.type';
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
 * const initialNodes = [
 *   {
 *     id: 'node-1',
 *     position: { x: 50, y: 50 },
 *     data: { label: 'Node 1', subtitle: 'Description' },
 *   },
 *   {
 *     id: 'node-2',
 *     position: { x: 50, y: 200 },
 *     data: { label: 'Node 2', subtitle: 'Description' },
 *   },
 * ];
 *
 * const initialEdges = [
 *   { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
 * ];
 *
 * <Flow nodes={initialNodes} edges={initialEdges} />
 * ```
 */
const FlowComponent: React.FC<FlowProps> = ({
  children, // Not typically used for rendering nodes/edges, but available
  nodes: controlledNodes, // Renamed from initialNodes to reflect potential controlled nature
  edges: controlledEdges, // Renamed from initialEdges
  size = 'md',
  variant = 'default',
  direction = 'vertical',
  showControls = true,
  allowAddingNodes = true,
  // allowDeletingNodes = true, // Prop exists, but delete functionality not fully wired in UI
  // allowConnectingNodes = true, // Prop exists, but connecting functionality not fully wired in UI
  allowDraggingNodes = true,
  onNodesChange,
  onEdgesChange,
  onNodeSelect,
  onNodeAdd,
  // onNodeDelete,
  // onConnect,
  onNodeDragStart,
  onNodeDrag,
  onNodeDragEnd,
  selectedNodeId,
  initialViewport,
  viewport: controlledViewport,
  onViewportChange,
  views,
  ...props
}) => {
  const flowState = useFlowState({
    initialNodes: controlledNodes, // Pass controlledNodes as initial if they exist
    initialEdges: controlledEdges, // Pass controlledEdges as initial
    nodes: controlledNodes, // For controlled mode
    edges: controlledEdges, // For controlled mode
    onNodesChange,
    onEdgesChange,
    onNodeSelect,
    selectedNodeId,
    direction,
    initialViewport,
    viewport: controlledViewport,
    onViewportChange,
    allowDraggingNodes,
    onNodeDragStart,
    onNodeDrag,
    onNodeDragEnd,
  });

  // Handler for adding a node after another node, invoked by FlowView
  const handleAddNode = (
    afterNodeId: string,
    position?: 'top' | 'bottom' | 'right' | 'left'
  ) => {
    // Create a unique ID for the new node.
    // Consider a more robust UUID generator for production.
    const newNodeId = `node-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 6)}`;
    const newNodeData: Omit<FlowNode, 'position'> = {
      // Data for the new node, position determined by addNodeAfter
      id: newNodeId,
      data: {
        label: 'New Step',
        subtitle: 'Select Action Type',
        // Numbering might need recalculation based on all nodes or context
        number: ((flowState?.nodes?.length || 0) + 1) as number,
      },
    };

    // Add the node using state logic, which returns the fully formed node including position
    const addedNode = flowState.addNodeAfter(
      afterNodeId,
      newNodeData,
      position
    );

    // Call the onNodeAdd callback if provided by the parent component
    if (onNodeAdd) {
      onNodeAdd(addedNode); // Pass the full new node, including its calculated position
    }
  };

  // Create wrapper functions for drag and drop handlers to match expected signatures
  const handleNodeDrag = (
    nodeId: string,
    position: NodePosition,
    event: MouseEvent | TouchEvent
  ) => {
    // We need to adapt the signature since flowState.updateNodeDrag expects only the event
    flowState.updateNodeDrag(event);
  };

  // Wrapper for node drag end to ensure type compatibility
  const handleNodeDragEnd = (nodeId: string, position: NodePosition) => {
    // Call the original handler
    flowState.endNodeDrag();
  };

  // The FlowView component expects specific props from the state and handlers.
  return React.createElement(FlowView, {
    nodes: flowState.nodes as FlowNode[],
    edges: flowState.edges as NodeConnection[],
    selectedNodeId: flowState.selectedNodeId,
    draggedNodeId: flowState.draggedNodeId,
    onNodeSelect: flowState.selectNode,
    onAddNode: handleAddNode, // Pass the refined handler
    baseId: flowState.baseId,
    viewport: flowState.viewport,
    onZoomIn: flowState.zoomIn,
    onZoomOut: flowState.zoomOut,
    onReset: flowState.resetViewport,
    onViewportChange: flowState.updateViewport, // Pass the updateViewport function
    // Drag and drop handlers
    onNodeDragStart: flowState.startNodeDrag,
    onNodeDrag: handleNodeDrag, // Use the wrapper function
    onNodeDragEnd: flowState.endNodeDrag,
    // Pass through other relevant props
    size,
    variant,
    direction,
    showControls,
    allowAddingNodes,
    allowDraggingNodes: flowState.allowDraggingNodes,
    views,
    ...props, // Spread remaining ViewProps
  });
};

export const Flow = FlowComponent as FlowType;

// Assign the sub-components to the main component for compound usage (if any)
// These are primarily for potential direct use or a more componentized future version.
// The current FlowView renders these internally or has placeholders.
Flow.Node = FlowNodeView;
Flow.Edge = FlowEdgeView; // Note: FlowEdgeView is a simplified placeholder
Flow.Controls = FlowControlsView;
Flow.AddNodeButton = FlowAddNodeButtonView;
