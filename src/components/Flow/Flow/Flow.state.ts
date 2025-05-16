import { useState, useCallback, useMemo } from 'react';
import { FlowNode, NodeConnection, FlowViewport } from './Flow.type';

interface UseFlowStateProps {
  /**
   * Initial nodes
   */
  initialNodes?: FlowNode[];

  /**
   * Initial edges/connections
   */
  initialEdges?: NodeConnection[];

  /**
   * Controlled nodes
   */
  nodes?: FlowNode[];

  /**
   * Controlled edges/connections
   */
  edges?: NodeConnection[];

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
   * Controlled selected node ID
   */
  selectedNodeId?: string;

  /**
   * Direction of the flow
   */
  direction?: 'vertical' | 'horizontal';

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
}

/**
 * Custom hook for managing Flow component state
 */
export const useFlowState = ({
  initialNodes = [],
  initialEdges = [],
  nodes: controlledNodes,
  edges: controlledEdges,
  onNodesChange,
  onEdgesChange,
  onNodeSelect,
  selectedNodeId: controlledSelectedNodeId,
  direction = 'vertical',
  initialViewport = { zoom: 1, x: 0, y: 0 },
  viewport: controlledViewport,
  onViewportChange,
}: UseFlowStateProps) => {
  // Generate a unique ID for accessibility.
  // For production, consider using React.useId() if available and appropriate for your React version.
  const baseId = useMemo(
    () => `flow-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  // State for nodes (uncontrolled mode)
  const [uncontrolledNodes, setUncontrolledNodes] =
    useState<FlowNode[]>(initialNodes);

  // State for edges (uncontrolled mode)
  const [uncontrolledEdges, setUncontrolledEdges] =
    useState<NodeConnection[]>(initialEdges);

  // State for selected node (uncontrolled mode)
  const [uncontrolledSelectedNodeId, setUncontrolledSelectedNodeId] = useState<
    string | undefined
  >(undefined);

  // State for viewport (uncontrolled mode)
  const [uncontrolledViewport, setUncontrolledViewport] =
    useState<FlowViewport>(initialViewport);

  // Determine if we're in controlled or uncontrolled mode for nodes
  const isNodesControlled = controlledNodes !== undefined;
  const currentNodes = isNodesControlled ? controlledNodes : uncontrolledNodes;

  // Determine if we're in controlled or uncontrolled mode for edges
  const isEdgesControlled = controlledEdges !== undefined;
  const currentEdges = isEdgesControlled ? controlledEdges : uncontrolledEdges;

  // Determine if we're in controlled or uncontrolled mode for selected node
  const isSelectedNodeControlled = controlledSelectedNodeId !== undefined;
  const currentSelectedNodeId = isSelectedNodeControlled
    ? controlledSelectedNodeId
    : uncontrolledSelectedNodeId;

  // Determine if we're in controlled or uncontrolled mode for viewport
  const isViewportControlled = controlledViewport !== undefined;
  const currentViewport = isViewportControlled
    ? controlledViewport
    : uncontrolledViewport;

  // Function to update nodes
  const updateNodes = useCallback(
    (newNodes: FlowNode[]) => {
      if (!isNodesControlled) {
        setUncontrolledNodes(newNodes);
      }
      if (onNodesChange) {
        onNodesChange(newNodes);
      }
    },
    [isNodesControlled, onNodesChange]
  );

  // Function to update edges
  const updateEdges = useCallback(
    (newEdges: NodeConnection[]) => {
      if (!isEdgesControlled) {
        setUncontrolledEdges(newEdges);
      }
      if (onEdgesChange) {
        onEdgesChange(newEdges);
      }
    },
    [isEdgesControlled, onEdgesChange]
  );

  // Function to select a node
  const selectNode = useCallback(
    (nodeId: string) => {
      if (!isSelectedNodeControlled) {
        setUncontrolledSelectedNodeId(nodeId);
      }
      if (onNodeSelect) {
        onNodeSelect(nodeId);
      }
    },
    [isSelectedNodeControlled, onNodeSelect]
  );

  // Function to add a node (simple append, not typically used directly by UI)
  const addNode = useCallback(
    (node: FlowNode) => {
      const newNodes = [...currentNodes, node];
      updateNodes(newNodes);
      // Note: This simpler addNode doesn't create edges.
      // onNodeAdd prop from FlowProps is typically called with node from addNodeAfter.
    },
    [currentNodes, updateNodes]
  );

  // Function to add a node relative to a specific node
  const addNodeAfter = useCallback(
    (
      afterNodeId: string,
      newNodeData: Omit<FlowNode, 'position'>, // newNodeData now doesn't include position
      position?: 'below' | 'right' | 'left'
    ): FlowNode => {
      // Return the fully formed new node
      const afterNode = currentNodes.find((node) => node.id === afterNodeId);
      if (!afterNode) {
        // Fallback or error handling if afterNode is not found
        console.warn(
          `addNodeAfter: Could not find node with id ${afterNodeId}`
        );
        const positionedNewNode = {
          ...newNodeData,
          position: { x: 0, y: 0 },
        } as FlowNode;
        updateNodes([...currentNodes, positionedNewNode]);
        return positionedNewNode;
      }

      const newPosition = {
        x: afterNode.position?.x || 0,
        y: afterNode.position?.y || 0,
      };

      const placementPosition =
        position || (direction === 'vertical' ? 'below' : 'right');

      const hasConnectionInDirection = (
        dir: 'below' | 'right' | 'left'
      ): boolean => {
        if (dir === 'below') {
          return currentEdges.some((edge) => {
            const targetNode = currentNodes.find((n) => n.id === edge.target);
            const targetY = targetNode?.position?.y || 0;
            const sourceY = afterNode.position?.y || 0;
            return edge.source === afterNodeId && targetY > sourceY;
          });
        } else if (dir === 'right') {
          return currentEdges.some((edge) => {
            const targetNode = currentNodes.find((n) => n.id === edge.target);
            const targetX = targetNode?.position?.x || 0;
            const sourceX = afterNode.position?.x || 0;
            return edge.source === afterNodeId && targetX > sourceX;
          });
        } else if (dir === 'left') {
          return currentEdges.some((edge) => {
            const targetNode = currentNodes.find((n) => n.id === edge.target);
            const targetX = targetNode?.position?.x || 0;
            const sourceX = afterNode.position?.x || 0;
            return edge.source === afterNodeId && targetX < sourceX;
          });
        }
        return false;
      };

      const getFurthestNodePosition = (
        dir: 'below' | 'right' | 'left'
      ): { x: number; y: number } => {
        let furthestNode = afterNode;
        // This logic finds a "furthest" child for positioning, assuming a simple branching structure.
        // More complex layouts might need more sophisticated calculations.
        if (dir === 'below') {
          currentEdges.forEach((edge) => {
            if (edge.source === afterNodeId) {
              const targetNode = currentNodes.find((n) => n.id === edge.target);
              if (
                targetNode &&
                (targetNode.position?.y || 0) >
                  (furthestNode.position?.y || 0) &&
                (targetNode.position?.x || 0) === (afterNode.position?.x || 0) // Only consider direct children below
              ) {
                furthestNode = targetNode;
              }
            }
          });
        } else if (dir === 'right') {
          currentEdges.forEach((edge) => {
            if (edge.source === afterNodeId) {
              const targetNode = currentNodes.find((n) => n.id === edge.target);
              if (
                targetNode &&
                (targetNode.position?.x || 0) >
                  (furthestNode.position?.x || 0) &&
                (targetNode.position?.y || 0) === (afterNode.position?.y || 0) // Only direct children to the right
              ) {
                furthestNode = targetNode;
              }
            }
          });
        } else if (dir === 'left') {
          currentEdges.forEach((edge) => {
            if (edge.source === afterNodeId) {
              const targetNode = currentNodes.find((n) => n.id === edge.target);
              if (
                targetNode &&
                (targetNode.position?.x || 0) <
                  (furthestNode.position?.x || 0) &&
                (targetNode.position?.y || 0) === (afterNode.position?.y || 0) // Only direct children to the left
              ) {
                furthestNode = targetNode;
              }
            }
          });
        }
        return {
          x: furthestNode.position?.x || 0,
          y: furthestNode.position?.y || 0,
        };
      };

      if (hasConnectionInDirection(placementPosition)) {
        const furthestPosition = getFurthestNodePosition(placementPosition);
        if (placementPosition === 'below') {
          newPosition.x = afterNode.position?.x || 0; // Align x with parent
          newPosition.y = furthestPosition.y + 150; // Place below the furthest child
        } else if (placementPosition === 'right') {
          newPosition.x = furthestPosition.x + 250; // Place right of the furthest child
          newPosition.y = afterNode.position?.y || 0; // Align y with parent
        } else if (placementPosition === 'left') {
          newPosition.x = furthestPosition.x - 250; // Place left of the furthest child
          newPosition.y = afterNode.position?.y || 0; // Align y with parent
        }
      } else {
        if (placementPosition === 'below') {
          newPosition.y += 150;
        } else if (placementPosition === 'right') {
          newPosition.x += 250;
        } else if (placementPosition === 'left') {
          newPosition.x -= 250;
        }
      }

      const nodeWithPosition: FlowNode = {
        ...newNodeData,
        position: newPosition,
      };

      const newNodes = [...currentNodes, nodeWithPosition];
      updateNodes(newNodes);

      const newEdge: NodeConnection = {
        id: `edge-${afterNodeId}-${nodeWithPosition.id}`,
        source: afterNodeId,
        target: nodeWithPosition.id,
      };
      const newEdges = [...currentEdges, newEdge];
      updateEdges(newEdges);
      return nodeWithPosition; // Return the created node
    },
    [currentNodes, currentEdges, updateNodes, updateEdges, direction]
  );

  // Function to delete a node
  const deleteNode = useCallback(
    (nodeId: string) => {
      const newNodes = currentNodes.filter((node) => node.id !== nodeId);
      updateNodes(newNodes);

      const newEdges = currentEdges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      updateEdges(newEdges);

      if (currentSelectedNodeId === nodeId && !isSelectedNodeControlled) {
        setUncontrolledSelectedNodeId(undefined);
      }
    },
    [
      currentNodes,
      currentEdges,
      updateNodes,
      updateEdges,
      currentSelectedNodeId,
      isSelectedNodeControlled,
    ]
  );

  // Function to connect two nodes
  const connectNodes = useCallback(
    (connection: NodeConnection) => {
      const newEdges = [...currentEdges, connection];
      updateEdges(newEdges);
    },
    [currentEdges, updateEdges]
  );

  // Function to update viewport
  const updateViewport = useCallback(
    (newViewport: FlowViewport) => {
      if (!isViewportControlled) {
        setUncontrolledViewport(newViewport);
      }
      if (onViewportChange) {
        onViewportChange(newViewport);
      }
    },
    [isViewportControlled, onViewportChange]
  );

  // Function to zoom in
  const zoomIn = useCallback(() => {
    const newZoom = Math.min(currentViewport.zoom + 0.1, 2); // Limit max zoom to 2x
    updateViewport({
      ...currentViewport,
      zoom: newZoom,
    });
  }, [currentViewport, updateViewport]);

  // Function to zoom out
  const zoomOut = useCallback(() => {
    const newZoom = Math.max(currentViewport.zoom - 0.1, 0.5); // Limit min zoom to 0.5x
    updateViewport({
      ...currentViewport,
      zoom: newZoom,
    });
  }, [currentViewport, updateViewport]);

  // Function to reset viewport
  const resetViewport = useCallback(() => {
    updateViewport({ zoom: 1, x: 0, y: 0 });
  }, [updateViewport]);

  return {
    baseId,
    nodes: currentNodes,
    edges: currentEdges,
    selectedNodeId: currentSelectedNodeId,
    viewport: currentViewport,
    updateNodes, // Exposing for potential direct manipulation if needed, though usually through actions
    updateEdges, // Exposing for potential direct manipulation
    updateViewport, // Exposing for potential direct manipulation
    selectNode,
    addNode,
    addNodeAfter,
    deleteNode,
    connectNodes,
    zoomIn,
    zoomOut,
    resetViewport,
  };
};
