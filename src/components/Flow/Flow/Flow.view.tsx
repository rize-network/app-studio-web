import React from 'react';
import { View, Text, ViewProps, Horizontal } from 'app-studio';
import { PlusIcon, MinusIcon, RefreshIcon } from '../../Icon/Icon'; // Assuming Icon components are correctly pathed
import {
  FlowNode as FlowNodeType, // Renamed to avoid conflict with component name
  NodeConnection,
  FlowNodeProps,
  FlowEdgeProps,
  FlowControlsProps,
  FlowAddNodeButtonProps,
  FlowViewport,
  NodePosition,
} from './Flow.type';
import { FlowProps } from './Flow.props'; // For picking props for InternalFlowViewProps

import {
  DefaultFlowStyles,
  FlowNodeSizes,
  FlowNodeVariants,
  FlowNodeStates,
} from './Flow.style';

// Flow Node component
export const FlowNodeView: React.FC<FlowNodeProps> = ({
  node,
  onSelect,
  isSelected,
  isDragging,
  onDragStart,
  onDrag,
  onDragEnd,
  size = 'md',
  variant = 'default',
  views,
  ...props
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(node.id);
    }
  };

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    // Only start dragging with left mouse button
    if ('button' in event && event.button !== 0) return;

    // Prevent default to avoid text selection
    event.preventDefault();

    // If the node is not draggable, don't start dragging
    if (node.draggable === false) return;

    if (onDragStart) {
      onDragStart(node.id, event);
    }
  };

  const nodeSpecificStyles = {
    ...FlowNodeSizes[size],
    ...FlowNodeVariants[variant],
  };

  // Apply specific styles based on node type
  const nodeTypeStyles = (() => {
    switch (node.type) {
      case 'start':
        return DefaultFlowStyles.startNode;
      default:
        return {};
    }
  })();

  // Simplified content for flowchart-style nodes
  const renderNodeContent = () => {
    // If node has no data or label, render an empty node
    if (!node.data || !node.data.label) {
      return null;
    }

    return (
      <Horizontal {...DefaultFlowStyles.nodeContent} {...views?.content}>
        {node.data?.icon && (
          <View {...DefaultFlowStyles.nodeIcon} {...views?.icon}>
            {node.data.icon}
          </View>
        )}
        <View {...DefaultFlowStyles.nodeInfo}>
          <Horizontal gap={4} alignItems="center" justifyContent="center">
            {node.data?.number != null && ( // Check for null/undefined
              <Text fontWeight="bold">{node.data.number}. </Text>
            )}
            <Text fontWeight="bold" textAlign="center">
              {node.data?.label}
            </Text>
          </Horizontal>
          {node.data?.subtitle && (
            <Text color="color.gray.500" fontSize="sm" textAlign="center">
              {node.data.subtitle}
            </Text>
          )}
        </View>
      </Horizontal>
    );
  };

  // Determine cursor style based on draggability
  const cursorStyle = node.draggable === false ? 'default' : 'grab';

  // Apply dragging styles if the node is being dragged
  const draggingStyles =
    node.isDragging || isDragging
      ? {
          cursor: 'grabbing',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          zIndex: 100,
        }
      : {};

  return (
    <View
      {...DefaultFlowStyles.node}
      {...nodeSpecificStyles}
      {...nodeTypeStyles}
      {...(isSelected ? FlowNodeStates.selected : {})}
      onClick={handleClick}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      cursor={cursorStyle}
      _hover={FlowNodeStates.hover} // Apply hover state styles
      {...node.style} // Apply per-node custom style
      {...draggingStyles} // Apply dragging styles
      {...views?.container}
      {...props} // Allow overriding all styles via props
    >
      {renderNodeContent()}
    </View>
  );
};

// Flow Edge component
export const FlowEdgeView: React.FC<FlowEdgeProps> = ({
  edge,
  sourceNode,
  targetNode,
  views,
  nodeSize = 'md',
  // ...props // props are not used in the new implementation directly on the main View
}) => {
  if (!sourceNode || !targetNode) {
    return null;
  }

  const nodeStyle = FlowNodeSizes[nodeSize] || FlowNodeSizes.md;
  // Ensure minWidth and minHeight are numbers, falling back to defaults from DefaultFlowStyles
  // Ensure nodeWidth is explicitly a number
  const nodeWidth: any =
    typeof nodeStyle.minWidth === 'number'
      ? nodeStyle.minWidth
      : typeof DefaultFlowStyles.node.minWidth === 'number'
      ? DefaultFlowStyles.node.minWidth
      : 200; // Fallback if somehow not a number
  // Ensure nodeHeight is explicitly a number
  const nodeHeight: any =
    typeof DefaultFlowStyles.node.minHeight === 'number'
      ? DefaultFlowStyles.node.minHeight
      : 60; // Fallback

  const sX = sourceNode.position.x;
  const sY = sourceNode.position.y;
  const tX = targetNode.position.x;
  const tY = targetNode.position.y;

  const sHalfWidth = nodeWidth / 2;
  const sHalfHeight = nodeHeight / 2;
  const tHalfWidth = nodeWidth / 2; // Assuming target is same size for simplicity
  const tHalfHeight = nodeHeight / 2;

  const deltaX = tX - sX;
  const deltaY = tY - sY;

  const lineColor = views?.path?.backgroundColor || 'color.blue.500';
  const lineThickness = views?.path?.height || views?.path?.width || 1; // Use height or width for thickness

  const segments: JSX.Element[] = [];
  let labelPosition = { x: (sX + tX) / 2, y: (sY + tY) / 2 }; // Default label position

  // Helper to render a line segment
  const renderLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    key: string
  ) => {
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    return (
      <View
        key={key}
        position="absolute"
        left={x1}
        top={y1}
        width={length}
        height={lineThickness}
        backgroundColor={lineColor}
        transformOrigin="0 0"
        style={{ transform: `rotate(${angle}deg)` }}
        {...views?.path} // Allow overriding styles
      />
    );
  };

  // Simplified Manhattan-style routing (elbow connectors)
  // This is a basic version and can be significantly improved for complex layouts
  // For tree structures, we often want lines to come out straight from a side then turn.

  // Define point interface to avoid 'any' type
  interface Point {
    x: number;
    y: number;
  }

  let p1: Point, p2: Point, p3: Point, p4: Point;

  // Determine primary direction for cleaner tree-like connections
  // This logic assumes that if nodes are roughly aligned vertically, it's a vertical connection, etc.
  // It also considers the typical tree flow (e.g. parent above children)

  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    // Primarily vertical
    const midY = sY + deltaY / 2;
    p1 = { x: sX, y: sY + (deltaY > 0 ? sHalfHeight : -sHalfHeight) }; // Exit from top/bottom center
    p2 = { x: sX, y: midY };
    p3 = { x: tX, y: midY };
    p4 = { x: tX, y: tY + (deltaY > 0 ? -tHalfHeight : tHalfHeight) }; // Enter from top/bottom center

    segments.push(renderLine(p1.x, p1.y, p2.x, p2.y, `${edge.id}-s1`));
    segments.push(renderLine(p2.x, p2.y, p3.x, p3.y, `${edge.id}-s2`));
    segments.push(renderLine(p3.x, p3.y, p4.x, p4.y, `${edge.id}-s3`));
    labelPosition = { x: (p2.x + p3.x) / 2, y: p2.y };
  } else {
    // Primarily horizontal
    const midX = sX + deltaX / 2;
    p1 = { x: sX + (deltaX > 0 ? sHalfWidth : -sHalfWidth), y: sY }; // Exit from left/right center
    p2 = { x: midX, y: sY };
    p3 = { x: midX, y: tY };
    p4 = { x: tX + (deltaX > 0 ? -tHalfWidth : tHalfWidth), y: tY }; // Enter from left/right center

    segments.push(renderLine(p1.x, p1.y, p2.x, p2.y, `${edge.id}-s1`));
    segments.push(renderLine(p2.x, p2.y, p3.x, p3.y, `${edge.id}-s2`));
    segments.push(renderLine(p3.x, p3.y, p4.x, p4.y, `${edge.id}-s3`));
    labelPosition = { x: p2.x, y: (p2.y + p3.y) / 2 };
  }

  return (
    <View
      position="absolute"
      top={0}
      left={0}
      pointerEvents="none"
      width="100%"
      height="100%"
    >
      {segments}
      {edge.label && (
        <View
          position="absolute"
          left={labelPosition.x}
          top={labelPosition.y}
          transform="translate(-50%, -50%)" // Center the label
          backgroundColor={views?.label?.backgroundColor || 'white'}
          padding={views?.label?.padding || 2}
          borderRadius={views?.label?.borderRadius || 4}
          borderWidth={views?.label?.borderWidth || '1px'}
          borderStyle={views?.label?.borderStyle || 'solid'}
          borderColor={views?.label?.borderColor || 'color.gray.200'}
          zIndex={10} // Ensure label is above lines
          {...views?.label}
        >
          <Text fontSize="xs" textAlign="center">
            {edge.label}
          </Text>
        </View>
      )}
    </View>
  );
};

// Flow Controls component
export const FlowControlsView: React.FC<FlowControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  views,
  ...props
}) => {
  return (
    <View
      {...DefaultFlowStyles.controls} // Base styles for the container
      {...views?.container} // Custom styles for the container
      {...props} // Allow overriding all styles via props
    >
      <View
        as="button" // Make it a button for accessibility
        aria-label="Zoom In"
        {...DefaultFlowStyles.controlButton}
        onClick={onZoomIn}
        {...views?.button} // Custom styles for individual buttons
      >
        <PlusIcon size={16} />
      </View>
      <View
        as="button"
        aria-label="Zoom Out"
        {...DefaultFlowStyles.controlButton}
        onClick={onZoomOut}
        {...views?.button}
      >
        <MinusIcon size={16} />
      </View>
      <View
        as="button"
        aria-label="Reset View"
        {...DefaultFlowStyles.controlButton}
        onClick={onReset}
        {...views?.button}
      >
        <RefreshIcon size={16} />
      </View>
    </View>
  );
};

// Flow Add Node Button component
export const FlowAddNodeButtonView: React.FC<FlowAddNodeButtonProps> = ({
  onClick,
  // attachmentPosition = 'bottom', // This prop is for styling hints, not direct layout
  views,
  ...props
}) => {
  return (
    <View
      as="button" // Make it a button for accessibility
      aria-label="Add Node"
      {...DefaultFlowStyles.addNodeButton}
      onClick={onClick}
      {...views?.container}
      {...props} // Allow overriding all styles via props
    >
      <PlusIcon size={16} color="color.blue.600" {...views?.icon} />
    </View>
  );
};

// Define props for the main FlowView component
interface InternalFlowViewProps
  extends Pick<
      FlowProps,
      | 'size'
      | 'variant'
      | 'direction'
      | 'showControls'
      | 'allowAddingNodes'
      | 'allowDraggingNodes'
      | 'views'
    >,
    Omit<
      ViewProps,
      keyof Pick<
        FlowProps,
        | 'size'
        | 'variant'
        | 'direction'
        | 'showControls'
        | 'allowAddingNodes'
        | 'allowDraggingNodes'
        | 'views'
      >
    > {
  nodes: FlowNodeType[];
  edges: NodeConnection[]; // Edges are passed but not rendered effectively by this simplified view
  selectedNodeId?: string;
  draggedNodeId?: string | null;
  onNodeSelect: (nodeId: string) => void;
  onAddNode: (
    afterNodeId: string,
    position?: 'top' | 'bottom' | 'right' | 'left'
  ) => void;
  onNodeDragStart?: (
    nodeId: string,
    event: React.MouseEvent | React.TouchEvent
  ) => void;
  onNodeDrag?: (
    nodeId: string,
    position: NodePosition,
    event: MouseEvent | TouchEvent
  ) => void;
  onNodeDragEnd?: (nodeId: string, position: NodePosition) => void;
  baseId: string;
  viewport?: FlowViewport;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  onViewportChange?: (viewport: FlowViewport) => void;
}

// Main Flow View component
export const FlowView: React.FC<InternalFlowViewProps> = ({
  nodes = [], // Default to empty array
  edges = [], // Default to empty array, not visually used much in this simplified view
  selectedNodeId,
  draggedNodeId,
  onNodeSelect,
  onAddNode, // Callback to request adding a node
  onNodeDragStart,
  onNodeDrag,
  onNodeDragEnd,
  size = 'md',
  variant = 'default',
  direction,
  // direction = 'vertical', // direction prop influences state logic, not directly this view's layout
  showControls = true,
  allowAddingNodes = true,
  allowDraggingNodes = true,
  views = {},
  baseId,
  viewport = { zoom: 1, x: 0, y: 0 },
  onZoomIn,
  onZoomOut,
  onReset,
  onViewportChange,
  ...props
}) => {
  // NOTE: This is a simplified layout. For 'left'/'right' node additions to be visually accurate,
  // and for edges to render correctly, a proper layout engine (like react-flow/xyflow)
  // that respects node.position and calculates edge paths is needed.
  // The current view primarily stacks nodes vertically. Node positions (x,y) from state are not used for rendering here.

  // State for tracking mouse drag
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [viewportAtDragStart, setViewportAtDragStart] = React.useState({
    x: 0,
    y: 0,
  });

  // Reference to the container element for keyboard focus
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Add global event listeners for node dragging
  React.useEffect(() => {
    if (!allowDraggingNodes) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (draggedNodeId && onNodeDrag) {
        onNodeDrag(draggedNodeId, { x: e.clientX, y: e.clientY }, e);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (draggedNodeId && onNodeDrag && e.touches.length > 0) {
        onNodeDrag(
          draggedNodeId,
          { x: e.touches[0].clientX, y: e.touches[0].clientY },
          e
        );
      }
    };

    const handleGlobalMouseUp = () => {
      if (draggedNodeId && onNodeDragEnd) {
        // Find the node to get its current position
        const node = nodes.find((n) => n.id === draggedNodeId);
        if (node) {
          onNodeDragEnd(draggedNodeId, node.position);
        }
      }
    };

    // Add event listeners if a node is being dragged
    if (draggedNodeId) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('touchmove', handleGlobalTouchMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      // Clean up event listeners
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [draggedNodeId, onNodeDrag, onNodeDragEnd, nodes, allowDraggingNodes]);

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only enable dragging with middle mouse button or when holding space key
    if (e.button === 1 || e.altKey) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setViewportAtDragStart({ x: viewport.x, y: viewport.y });
      e.preventDefault();
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = (e.clientX - dragStart.x) / viewport.zoom;
      const dy = (e.clientY - dragStart.y) / viewport.zoom;

      // Update viewport position
      const newViewport = {
        ...viewport,
        x: viewportAtDragStart.x + dx,
        y: viewportAtDragStart.y + dy,
      };

      // Call the viewport update function
      handleViewportChange(newViewport);

      e.preventDefault();
    }
  };

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Handle mouse wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();

      // Determine zoom direction
      const zoomFactor = e.deltaY < 0 ? 0.1 : -0.1;
      const newZoom = Math.max(0.1, Math.min(2, viewport.zoom + zoomFactor));

      // Update viewport zoom
      const newViewport = {
        ...viewport,
        zoom: newZoom,
      };

      // Call the viewport update function
      handleViewportChange(newViewport);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const panStep = 20 / viewport.zoom; // Adjust step size based on zoom level
    let newX = viewport.x;
    let newY = viewport.y;

    switch (e.key) {
      case 'ArrowUp':
        newY += panStep;
        break;
      case 'ArrowDown':
        newY -= panStep;
        break;
      case 'ArrowLeft':
        newX += panStep;
        break;
      case 'ArrowRight':
        newX -= panStep;
        break;
      case '0': // Reset view with '0' key
        if (onReset) {
          onReset();
          return;
        }
        break;
      case '+': // Zoom in with '+' key
        if (onZoomIn) {
          onZoomIn();
          return;
        }
        break;
      case '-': // Zoom out with '-' key
        if (onZoomOut) {
          onZoomOut();
          return;
        }
        break;
      default:
        return; // Exit if not a navigation key
    }

    // Update viewport position
    const newViewport = {
      ...viewport,
      x: newX,
      y: newY,
    };

    // Call the viewport update function
    handleViewportChange(newViewport);
    e.preventDefault();
  };

  // Function to handle viewport changes
  const handleViewportChange = (newViewport: FlowViewport) => {
    // We need to pass this to the parent component
    if (onViewportChange) {
      onViewportChange(newViewport);
    }
    // else {
    //   // If no onViewportChange is provided, we can try to use the zoom functions
    //   if (onZoomIn && onZoomOut && onReset) {
    //     const currentZoom = viewport.zoom;

    //     if (newViewport.zoom > currentZoom) {
    //       onZoomIn();
    //     } else if (newViewport.zoom < currentZoom) {
    //       onZoomOut();
    //     } else if (
    //       newViewport.x !== viewport.x ||
    //       newViewport.y !== viewport.y
    //     ) {
    //       // This is a pan operation, but we don't have direct access to updateViewport
    //       // We'll just use the zoom functions to approximate the behavior
    //       onReset(); // This is not ideal, but it's the best we can do without updateViewport
    //     }
    //   }
    // }
  };

  const handleAddNode = (
    sourceNodeId: string,
    pos: 'top' | 'bottom' | 'left' | 'right'
  ) => {
    if (onAddNode) {
      onAddNode(sourceNodeId, pos);
    }
  };

  return (
    <View
      id={baseId}
      role="application"
      aria-label="Flow diagram"
      ref={containerRef}
      tabIndex={0} // Make the container focusable for keyboard navigation
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Also stop dragging if mouse leaves the container
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      cursor={isDragging ? 'grabbing' : 'default'}
      {...DefaultFlowStyles.container}
      {...views.container}
      {...props}
    >
      {/* SVG layer for edges */}
      <View
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={1}
        transform={`scale(${viewport.zoom}) translate(${viewport.x}px, ${viewport.y}px)`}
        transformOrigin="center"
        transition="transform 0.2s ease"
        style={{ pointerEvents: 'none' }} // Don't intercept pointer events
      >
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);

          if (sourceNode && targetNode) {
            return (
              <FlowEdgeView
                key={edge.id}
                edge={edge}
                sourceNode={sourceNode}
                targetNode={targetNode}
                views={views.edge}
                nodeSize={size} // <<< PASS global node size to FlowEdgeView
              />
            );
          }
          return null;
        })}
      </View>

      {/* Nodes layer */}
      <View
        position="relative"
        width="100%"
        height="100%"
        zIndex={2}
        transform={`scale(${viewport.zoom}) translate(${viewport.x}px, ${viewport.y}px)`}
        transformOrigin="center"
        transition="transform 0.2s ease"
      >
        {nodes.map((node) => (
          <View
            key={node.id}
            position="absolute"
            top={node.position.y}
            left={node.position.x}
            transform="translate(-50%, -50%)" // Center the node on its position
          >
            {/* Node */}
            <FlowNodeView
              node={node}
              isSelected={selectedNodeId === node.id}
              isDragging={draggedNodeId === node.id}
              onSelect={onNodeSelect}
              onDragStart={allowDraggingNodes ? onNodeDragStart : undefined}
              onDrag={allowDraggingNodes ? onNodeDrag : undefined}
              onDragEnd={allowDraggingNodes ? onNodeDragEnd : undefined}
              size={size}
              variant={variant}
              views={views.node}
            />
            {allowAddingNodes && (
              <View width={'100%'} height={'100%'}>
                {/* Top Add Button */}
                <View
                  position="absolute"
                  top="-20%"
                  left="50%"
                  transform="translate(-50%, 0%)"
                  zIndex={5}
                >
                  <FlowAddNodeButtonView
                    onClick={() => handleAddNode(node.id, 'top')}
                    views={views.addButton}
                    aria-label={`Add node above ${node.data?.label || node.id}`}
                  />
                </View>

                {/* Bottom Add Button */}
                <View
                  position="absolute"
                  bottom="-20%"
                  left="50%"
                  transform="translate(-50%, 0%)"
                  zIndex={5}
                >
                  <FlowAddNodeButtonView
                    onClick={() => handleAddNode(node.id, 'bottom')}
                    views={views.addButton}
                    aria-label={`Add node below ${node.data?.label || node.id}`}
                  />
                </View>

                {/* Left Add Button */}
                <View
                  position="absolute"
                  left="0%"
                  top="50%"
                  transform="translate(-50%, -50%)"
                  zIndex={5}
                >
                  <FlowAddNodeButtonView
                    onClick={() => handleAddNode(node.id, 'left')}
                    views={views.addButton}
                    aria-label={`Add node left of ${
                      node.data?.label || node.id
                    }`}
                  />
                </View>

                {/* Right Add Button */}
                <View
                  position="absolute"
                  right="0%"
                  top="50%"
                  transform="translate(50%, -50%)"
                  zIndex={5}
                >
                  <FlowAddNodeButtonView
                    onClick={() => handleAddNode(node.id, 'right')}
                    views={views.addButton}
                    aria-label={`Add node right of ${
                      node.data?.label || node.id
                    }`}
                  />
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Add first node button if no nodes exist */}
        {allowAddingNodes && nodes.length === 0 && (
          <View
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <FlowAddNodeButtonView
              onClick={() => {
                if (onAddNode) {
                  // Pass null or a special ID to indicate adding the first node.
                  // The 'bottom' position is arbitrary here, could be omitted if
                  // the handler for the first node doesn't use it.
                  onAddNode(null as any, 'bottom');
                }
              }}
              views={views.addButton}
              aria-label="Add first node"
            />
          </View>
        )}
      </View>

      {/* Fixed Controls - Always visible regardless of viewport position */}
      {showControls && (
        <View
          position="absolute"
          top={40}
          right={40}
          zIndex={1000}
          display="flex"
          flexDirection="column"
          gap={8}
          backgroundColor="white"
          padding={4}
          borderRadius={8}
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.15)"
          border="1px solid"
          borderColor="color.gray.200"
          pointerEvents="auto" // Ensure controls are clickable
          {...views?.fixedControlsContainer}
        >
          <FlowControlsView
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onReset={onReset}
            views={views.controls}
          />
        </View>
      )}

      {/* Display current zoom level */}
      <View
        position="absolute"
        bottom={16}
        left={16}
        backgroundColor="white"
        padding={2}
        borderRadius={4}
        fontSize="xs"
        border="1px solid"
        borderColor="color.gray.200"
        zIndex={1000}
        pointerEvents="none" // Don't intercept pointer events
      >
        <Text fontSize="xs">Zoom: {Math.round(viewport.zoom * 100)}%</Text>
      </View>
    </View>
  );
};
