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
}: UseFlowStateProps) => {
  // Generate a unique ID for accessibility
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

  // State for viewport (zoom and pan)
  const [viewport, setViewport] = useState<FlowViewport>({
    zoom: 1,
    x: 0,
    y: 0,
  });

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

  // Function to add a node
  const addNode = useCallback(
    (node: FlowNode) => {
      const newNodes = [...currentNodes, node];
      updateNodes(newNodes);
    },
    [currentNodes, updateNodes]
  );

  // Function to add a node relative to a specific node
  const addNodeAfter = useCallback(
    (
      afterNodeId: string,
      newNode: FlowNode,
      position?: 'below' | 'right' | 'left'
    ) => {
      // Find the node to add after
      const afterNode = currentNodes.find((node) => node.id === afterNodeId);

      if (!afterNode) return;

      // Calculate position for the new node
      const newPosition = {
        x: afterNode.position?.x || 0,
        y: afterNode.position?.y || 0,
      };

      // Determine position based on parameter or default to direction
      const placementPosition =
        position || (direction === 'vertical' ? 'below' : 'right');

      // Check if there's already a connection in the requested direction
      const hasConnectionInDirection = (
        direction: 'below' | 'right' | 'left'
      ): boolean => {
        if (direction === 'below') {
          return currentEdges.some((edge) => {
            const targetNode = currentNodes.find((n) => n.id === edge.target);
            const targetY = targetNode?.position?.y || 0;
            const sourceY = afterNode.position?.y || 0;
            return edge.source === afterNodeId && targetY > sourceY;
          });
        } else if (direction === 'right') {
          return currentEdges.some((edge) => {
            const targetNode = currentNodes.find((n) => n.id === edge.target);
            const targetX = targetNode?.position?.x || 0;
            const sourceX = afterNode.position?.x || 0;
            return edge.source === afterNodeId && targetX > sourceX;
          });
        } else if (direction === 'left') {
          return currentEdges.some((edge) => {
            const targetNode = currentNodes.find((n) => n.id === edge.target);
            const targetX = targetNode?.position?.x || 0;
            const sourceX = afterNode.position?.x || 0;
            return edge.source === afterNodeId && targetX < sourceX;
          });
        }
        return false;
      };

      // Find the furthest node in the requested direction
      const getFurthestNodePosition = (
        direction: 'below' | 'right' | 'left'
      ): { x: number; y: number } => {
        let furthestNode = afterNode;

        if (direction === 'below') {
          currentEdges.forEach((edge) => {
            if (edge.source === afterNodeId) {
              const targetNode = currentNodes.find((n) => n.id === edge.target);
              if (
                targetNode &&
                (targetNode.position?.y || 0) > (furthestNode.position?.y || 0)
              ) {
                furthestNode = targetNode;
              }
            }
          });
        } else if (direction === 'right') {
          currentEdges.forEach((edge) => {
            if (edge.source === afterNodeId) {
              const targetNode = currentNodes.find((n) => n.id === edge.target);
              if (
                targetNode &&
                (targetNode.position?.x || 0) > (furthestNode.position?.x || 0)
              ) {
                furthestNode = targetNode;
              }
            }
          });
        } else if (direction === 'left') {
          currentEdges.forEach((edge) => {
            if (edge.source === afterNodeId) {
              const targetNode = currentNodes.find((n) => n.id === edge.target);
              if (
                targetNode &&
                (targetNode.position?.x || 0) < (furthestNode.position?.x || 0)
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

      // If there's already a connection in this direction, add at the same level
      if (hasConnectionInDirection(placementPosition)) {
        const furthestPosition = getFurthestNodePosition(placementPosition);

        if (placementPosition === 'below') {
          newPosition.x = afterNode.position?.x || 0;
          newPosition.y = furthestPosition.y + 150;
        } else if (placementPosition === 'right') {
          newPosition.x = furthestPosition.x + 250;
          newPosition.y = afterNode.position?.y || 0;
        } else if (placementPosition === 'left') {
          newPosition.x = furthestPosition.x - 250;
          newPosition.y = afterNode.position?.y || 0;
        }
      } else {
        // No existing connection, add in the requested direction
        if (placementPosition === 'below') {
          newPosition.y += 150; // Add some vertical spacing
        } else if (placementPosition === 'right') {
          newPosition.x += 250; // Add some horizontal spacing
        } else if (placementPosition === 'left') {
          newPosition.x -= 250; // Add some horizontal spacing to the left
        }
      }

      // Create the new node with the calculated position
      const nodeWithPosition = {
        ...newNode,
        position: newPosition,
      };

      // Add the node
      const newNodes = [...currentNodes, nodeWithPosition] as FlowNode[];
      updateNodes(newNodes);

      // Create a connection from the after node to the new node
      const newEdge: NodeConnection = {
        id: `${afterNodeId}-${newNode.id}`,
        source: afterNodeId,
        target: newNode.id,
      };

      const newEdges = [...currentEdges, newEdge];
      updateEdges(newEdges);
    },
    [currentNodes, currentEdges, updateNodes, updateEdges, direction]
  );

  // Function to delete a node
  const deleteNode = useCallback(
    (nodeId: string) => {
      // Remove the node
      const newNodes = currentNodes.filter((node) => node.id !== nodeId);
      updateNodes(newNodes);

      // Remove any edges connected to the node
      const newEdges = currentEdges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      updateEdges(newEdges);

      // Clear selection if the deleted node was selected
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

  // Function to zoom in
  const zoomIn = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      zoom: Math.min(prev.zoom + 0.1, 2), // Limit max zoom to 2x
    }));
  }, []);

  // Function to zoom out
  const zoomOut = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      zoom: Math.max(prev.zoom - 0.1, 0.5), // Limit min zoom to 0.5x
    }));
  }, []);

  // Function to reset zoom and pan
  const resetView = useCallback(() => {
    setViewport({
      zoom: 1,
      x: 0,
      y: 0,
    });
  }, []);

  return {
    baseId,
    nodes: currentNodes,
    edges: currentEdges,
    selectedNodeId: currentSelectedNodeId,
    viewport,
    updateNodes,
    updateEdges,
    selectNode,
    addNode,
    addNodeAfter,
    deleteNode,
    connectNodes,
    zoomIn,
    zoomOut,
    resetView,
  };
};
