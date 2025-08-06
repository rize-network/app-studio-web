import { useState, useCallback, useMemo, useRef } from 'react';
import {
  FlowNode,
  NodeConnection,
  FlowViewport,
  NodePosition,
} from './Flow.type';

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

  /**
   * Whether to allow dragging nodes
   */
  allowDraggingNodes?: boolean;

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
  allowDraggingNodes = true,
  onNodeDragStart,
  onNodeDrag,
  onNodeDragEnd,
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

  // State for drag and drop
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const dragStartPositionRef = useRef<NodePosition | null>(null);
  const nodePositionRef = useRef<NodePosition | null>(null);

  // Determine if we're in controlled or uncontrolled mode for nodes
  const isNodesControlled = controlledNodes !== undefined;
  const currentNodes: FlowNode[] = isNodesControlled
    ? (controlledNodes as FlowNode[])
    : (uncontrolledNodes as FlowNode[]);

  // Determine if we're in controlled or uncontrolled mode for edges
  const isEdgesControlled = controlledEdges !== undefined;
  const currentEdges: NodeConnection[] = isEdgesControlled
    ? (controlledEdges as NodeConnection[])
    : (uncontrolledEdges as NodeConnection[]);

  // Determine if we're in controlled or uncontrolled mode for selected node
  const isSelectedNodeControlled = controlledSelectedNodeId !== undefined;
  const currentSelectedNodeId = isSelectedNodeControlled
    ? controlledSelectedNodeId
    : uncontrolledSelectedNodeId;

  // Determine if we're in controlled or uncontrolled mode for viewport
  const isViewportControlled = controlledViewport !== undefined;
  const currentViewport: any = isViewportControlled
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
      const newNodes = [...(currentNodes as FlowNode[]), node];
      updateNodes(newNodes);
      // Note: This simpler addNode doesn't create edges.
      // onNodeAdd prop from FlowProps is typically called with node from addNodeAfter.
    },
    [currentNodes, updateNodes]
  );

  const addNodeAfter = useCallback(
    (
      afterNodeId: string | null, // <<< MODIFIED: Allow null for first node
      newNodeData: Omit<FlowNode, 'position'>,
      position?: 'top' | 'bottom' | 'right' | 'left'
    ): FlowNode => {
      // Handle adding the first node if afterNodeId is null or a specific marker
      if (afterNodeId === null || afterNodeId === '') {
        // Determine a default position for the first node
        // This could be improved to be center of viewport or configurable
        const firstNodePosition = { x: 150, y: 100 }; // Example default position

        const positionedNewNode: FlowNode = {
          ...newNodeData,
          position: firstNodePosition,
        };
        updateNodes([...(currentNodes as FlowNode[]), positionedNewNode]);
        // No edge is created for the first node by default
        return positionedNewNode;
      }

      const afterNode = currentNodes?.find((node) => node.id === afterNodeId);
      if (!afterNode) {
        console.warn(
          `addNodeAfter: Could not find node with id ${afterNodeId}. Adding node at default position.`
        );
        // Fallback: add node at a default position if afterNode is not found
        const fallbackPosition = { x: 100, y: currentNodes.length * 100 + 100 };
        const positionedNewNode = {
          ...newNodeData,
          position: fallbackPosition,
        } as FlowNode;
        updateNodes([...currentNodes, positionedNewNode]);
        return positionedNewNode;
      }

      // Existing logic for positioning relative to afterNode
      const newPosition = {
        x: afterNode.position?.x || 0,
        y: afterNode.position?.y || 0,
      };

      const placementPosition =
        position || (direction === 'vertical' ? 'bottom' : 'right');

      // ... (rest of the existing addNodeAfter logic for relative positioning)
      // Ensure this logic correctly uses newPosition, placementPosition, etc.
      // The existing logic for hasConnectionInDirection, getFurthestNodePosition,
      // and calculating newPosition based on placementPosition seems reasonable.

      // New logic for tree-like branching
      const HORIZONTAL_SPACING_PARENT_CHILD = 275;
      const VERTICAL_SPACING_PARENT_CHILD = 220; // Further Increased
      const SIBLING_HORIZONTAL_SPACING = 350; // Further Increased
      const SIBLING_VERTICAL_SPACING = 120;
      const COLUMN_ROW_TOLERANCE = 50; // Tolerance for considering nodes in the same column/row

      if (placementPosition === 'left' || placementPosition === 'right') {
        // Adding a child to the left or right of the parent.
        // These children will be stacked vertically in a column.
        newPosition.x =
          (afterNode.position?.x || 0) +
          (placementPosition === 'right'
            ? HORIZONTAL_SPACING_PARENT_CHILD
            : -HORIZONTAL_SPACING_PARENT_CHILD);

        // Find existing direct children of afterNode that are already in this target "side column"
        const sideColumnSiblings = currentNodes.filter((node) =>
          currentEdges.some(
            (edge) =>
              edge.source === afterNodeId &&
              edge.target === node.id &&
              Math.abs(node.position.x - newPosition.x) < COLUMN_ROW_TOLERANCE
          )
        );

        if (sideColumnSiblings.length > 0) {
          const bottomMostSibling = sideColumnSiblings.reduce((prev, curr) =>
            curr.position.y > prev.position.y ? curr : prev
          );
          newPosition.y =
            bottomMostSibling.position.y + SIBLING_VERTICAL_SPACING;
        } else {
          // First child in this side column. Position it relative to the parent's Y.
          newPosition.y = afterNode.position?.y || 0;
        }
      } else if (
        placementPosition === 'top' ||
        placementPosition === 'bottom'
      ) {
        // Adding a child above or below the parent.
        // These children will be arranged horizontally in a row.
        newPosition.y =
          (afterNode.position?.y || 0) +
          (placementPosition === 'bottom'
            ? VERTICAL_SPACING_PARENT_CHILD
            : -VERTICAL_SPACING_PARENT_CHILD);

        const horizontalRowSiblings = currentNodes.filter((node) =>
          currentEdges.some(
            (edge) =>
              edge.source === afterNodeId &&
              edge.target === node.id &&
              Math.abs(node.position.y - newPosition.y) < COLUMN_ROW_TOLERANCE // Check they are in the same horizontal row
          )
        );

        if (horizontalRowSiblings.length > 0) {
          // Find the rightmost sibling in that row to stack the new node next to it
          const rightMostSibling = horizontalRowSiblings.reduce((prev, curr) =>
            curr.position.x > prev.position.x ? curr : prev
          );
          newPosition.x =
            rightMostSibling.position.x + SIBLING_HORIZONTAL_SPACING;
        } else {
          // First child in this horizontal row. Position it relative to the parent's X.
          newPosition.x = afterNode.position?.x || 0;
        }
      } else {
        // Fallback for other unhandled positions or default behavior
        // This could revert to a simpler placement if needed.
        // For now, we assume 'left', 'right', 'top', 'bottom' are the primary concern.
        // Default to placing bottom if position is unrecognized.
        newPosition.y =
          (afterNode.position?.y || 0) + VERTICAL_SPACING_PARENT_CHILD;
        newPosition.x = afterNode.position?.x || 0;
      }

      const nodeWithPosition: FlowNode = {
        ...newNodeData,
        position: newPosition,
      };

      const newNodes = [...currentNodes, nodeWithPosition];
      updateNodes(newNodes);

      const newEdge: NodeConnection = {
        id: `edge-${afterNodeId}-${nodeWithPosition.id}`, // afterNodeId will be valid here
        source: afterNodeId,
        target: nodeWithPosition.id,
      };
      const newEdges = [...currentEdges, newEdge];
      updateEdges(newEdges);
      return nodeWithPosition;
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

  // Function to start dragging a node
  const startNodeDrag = useCallback(
    (nodeId: string, event: React.MouseEvent | React.TouchEvent) => {
      if (!allowDraggingNodes) return;

      setDraggedNodeId(nodeId);

      const node = currentNodes.find((n) => n.id === nodeId);
      if (!node) return;

      // Store the initial node position
      dragStartPositionRef.current = { ...node.position };

      // Get the cursor position
      const clientX =
        'touches' in event
          ? event.touches[0].clientX
          : (event as React.MouseEvent).clientX;
      const clientY =
        'touches' in event
          ? event.touches[0].clientY
          : (event as React.MouseEvent).clientY;

      nodePositionRef.current = { x: clientX, y: clientY };

      // Call the external callback if provided
      if (onNodeDragStart) {
        onNodeDragStart(nodeId, event);
      }
    },
    [allowDraggingNodes, currentNodes, onNodeDragStart]
  );

  // Function to update node position during drag
  const updateNodeDrag = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (
        !draggedNodeId ||
        !dragStartPositionRef.current ||
        !nodePositionRef.current
      )
        return;

      // Get the current cursor position
      const clientX =
        'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY =
        'touches' in event ? event.touches[0].clientY : event.clientY;

      // Calculate the offset from the drag start position
      const offsetX = clientX - nodePositionRef.current.x;
      const offsetY = clientY - nodePositionRef.current.y;

      // Calculate the new node position
      const newPosition: NodePosition = {
        x: dragStartPositionRef.current.x + offsetX / currentViewport.zoom,
        y: dragStartPositionRef.current.y + offsetY / currentViewport.zoom,
      };

      // Update the node position in the state
      const newNodes = currentNodes.map((node) => {
        if (node.id === draggedNodeId) {
          return {
            ...node,
            position: newPosition,
            isDragging: true,
          };
        }
        return node;
      });

      updateNodes(newNodes);

      // Call the external callback if provided
      if (onNodeDrag) {
        onNodeDrag(draggedNodeId, newPosition, event);
      }
    },
    [draggedNodeId, currentNodes, updateNodes, onNodeDrag, currentViewport.zoom]
  );

  // Function to end node dragging
  const endNodeDrag = useCallback(() => {
    if (!draggedNodeId) return;

    // Update the node to remove the dragging state
    const newNodes = currentNodes.map((node) => {
      if (node.id === draggedNodeId) {
        return {
          ...node,
          isDragging: false,
        };
      }
      return node;
    });

    updateNodes(newNodes);

    // Get the final position of the node
    const node = newNodes.find((n) => n.id === draggedNodeId);
    if (node && onNodeDragEnd) {
      onNodeDragEnd(draggedNodeId, node.position);
    }

    // Reset drag state
    setDraggedNodeId(null);
    dragStartPositionRef.current = null;
    nodePositionRef.current = null;
  }, [draggedNodeId, currentNodes, updateNodes, onNodeDragEnd]);

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
    // Drag and drop functions
    draggedNodeId,
    startNodeDrag,
    updateNodeDrag,
    endNodeDrag,
    allowDraggingNodes,
  };
};
