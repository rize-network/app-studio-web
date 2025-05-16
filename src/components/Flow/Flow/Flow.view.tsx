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

  return (
    <View
      {...DefaultFlowStyles.node}
      {...nodeSpecificStyles}
      {...nodeTypeStyles}
      {...(isSelected ? FlowNodeStates.selected : {})}
      onClick={handleClick}
      _hover={FlowNodeStates.hover} // Apply hover state styles
      {...node.style} // Apply per-node custom style
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
  ...props
}) => {
  // If we don't have both source and target nodes, we can't render the edge
  if (!sourceNode || !targetNode) {
    return null;
  }

  // Calculate the positions
  const sourceX = sourceNode.position.x;
  const sourceY = sourceNode.position.y;
  const targetX = targetNode.position.x;
  const targetY = targetNode.position.y;

  // Determine if the connection is horizontal or vertical
  const isHorizontal =
    Math.abs(targetX - sourceX) > Math.abs(targetY - sourceY);

  // Use a default color for the edge
  const lineColor = 'color.blue.500';
  const lineThickness = 1;

  // For horizontal connections
  if (isHorizontal) {
    const direction = targetX > sourceX ? 1 : -1; // Right or left
    const midX = (sourceX + targetX) / 2;

    return (
      <View position="absolute" pointerEvents="none">
        {/* Horizontal line from source to midpoint */}
        <View
          position="absolute"
          left={sourceX}
          top={sourceY}
          width={Math.abs(midX - sourceX)}
          height={lineThickness}
          backgroundColor={lineColor}
          style={{
            transform: `translateX(${direction > 0 ? 0 : -100}%)`,
          }}
        />

        {/* Vertical line at midpoint */}
        <View
          position="absolute"
          left={midX}
          top={Math.min(sourceY, targetY)}
          width={lineThickness}
          height={Math.abs(targetY - sourceY)}
          backgroundColor={lineColor}
        />

        {/* Horizontal line from midpoint to target */}
        <View
          position="absolute"
          left={midX}
          top={targetY}
          width={Math.abs(targetX - midX)}
          height={lineThickness}
          backgroundColor={lineColor}
          style={{
            transform: `translateX(${direction > 0 ? 0 : -100}%)`,
          }}
        />

        {/* Edge label if present */}
        {edge.label && (
          <View
            position="absolute"
            left={midX}
            top={targetY}
            transform="translate(-50%, -50%)"
            backgroundColor="white"
            padding={2}
            borderRadius={4}
            border="1px solid"
            borderColor="color.gray.200"
            zIndex={10}
          >
            <Text fontSize="xs" textAlign="center">
              {edge.label}
            </Text>
          </View>
        )}
      </View>
    );
  }
  // For vertical connections
  else {
    const direction = targetY > sourceY ? 1 : -1; // Down or up
    const midY = (sourceY + targetY) / 2;

    return (
      <View position="absolute" pointerEvents="none">
        {/* Vertical line from source to midpoint */}
        <View
          position="absolute"
          left={sourceX}
          top={sourceY}
          width={lineThickness}
          height={Math.abs(midY - sourceY)}
          backgroundColor={lineColor}
          style={{
            transform: `translateY(${direction > 0 ? 0 : -100}%)`,
          }}
        />

        {/* Horizontal line at midpoint */}
        <View
          position="absolute"
          left={Math.min(sourceX, targetX)}
          top={midY}
          width={Math.abs(targetX - sourceX)}
          height={lineThickness}
          backgroundColor={lineColor}
        />

        {/* Vertical line from midpoint to target */}
        <View
          position="absolute"
          left={targetX}
          top={midY}
          width={lineThickness}
          height={Math.abs(targetY - midY)}
          backgroundColor={lineColor}
          style={{
            transform: `translateY(${direction > 0 ? 0 : -100}%)`,
          }}
        />

        {/* Edge label if present */}
        {edge.label && (
          <View
            position="absolute"
            left={targetX}
            top={midY}
            transform="translate(-50%, -50%)"
            backgroundColor="white"
            padding={2}
            borderRadius={4}
            border="1px solid"
            borderColor="color.gray.200"
            zIndex={10}
          >
            <Text fontSize="xs" textAlign="center">
              {edge.label}
            </Text>
          </View>
        )}
      </View>
    );
  }
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
        | 'views'
      >
    > {
  nodes: FlowNodeType[];
  edges: NodeConnection[]; // Edges are passed but not rendered effectively by this simplified view
  selectedNodeId?: string;
  onNodeSelect: (nodeId: string) => void;
  onAddNode: (
    afterNodeId: string,
    position?: 'below' | 'right' | 'left'
  ) => void;
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
  onNodeSelect,
  onAddNode, // Callback to request adding a node
  size = 'md',
  variant = 'default',
  direction,
  // direction = 'vertical', // direction prop influences state logic, not directly this view's layout
  showControls = true,
  allowAddingNodes = true,
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
    pos: 'below' | 'left' | 'right'
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
              onSelect={onNodeSelect}
              size={size}
              variant={variant}
              views={views.node}
            />
            {allowAddingNodes && (
              <View width={'100%'} height={'100%'}>
                {/* Below Add Button */}
                <View
                  position="absolute"
                  bottom="-20%"
                  left="50%"
                  transform="translate(-50%, 0%)"
                  zIndex={5}
                >
                  <FlowAddNodeButtonView
                    onClick={() => handleAddNode(node.id, 'below')}
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
                  // The 'below' position is arbitrary here, could be omitted if
                  // the handler for the first node doesn't use it.
                  onAddNode(null as any, 'below'); // <<< MODIFIED
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
