import React from 'react';
import { View, Vertical, Horizontal, Text } from 'app-studio';
import { PlusIcon, MinusIcon, RefreshIcon, ChevronIcon } from '../../Icon/Icon';
import {
  FlowNode,
  FlowNodeProps,
  FlowEdgeProps,
  FlowControlsProps,
  FlowAddNodeButtonProps,
} from './Flow.type';
import {
  DefaultFlowStyles,
  FlowSizes,
  FlowVariants,
  FlowNodeStates,
} from './Flow.style';

// Flow Node component
export const FlowNodeView: React.FC<FlowNodeProps> = ({
  node,
  onSelect,
  isSelected,
  views,
  ...props
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(node.id);
    }
  };

  return (
    <View
      {...DefaultFlowStyles.node}
      {...(isSelected ? FlowNodeStates.selected : {})}
      onClick={handleClick}
      _hover={FlowNodeStates.hover}
      {...views?.container}
      {...props}
    >
      <Horizontal {...DefaultFlowStyles.nodeContent} {...views?.content}>
        {node.data?.icon && (
          <View {...DefaultFlowStyles.nodeIcon} {...views?.icon}>
            {node.data.icon}
          </View>
        )}
        <View display="flex" flexDirection="column" gap={2}>
          <Horizontal gap={4} alignItems="center">
            {node.data?.number && (
              <Text fontWeight="bold">{node.data.number}. </Text>
            )}
            <Text fontWeight="bold">{node.data?.label}</Text>
            <ChevronIcon orientation="down" size={16} />
          </Horizontal>
          {node.data?.subtitle && (
            <Text color="color.gray.500" fontSize="sm">
              {node.data.subtitle}
            </Text>
          )}
        </View>
      </Horizontal>
    </View>
  );
};

// Flow Edge component
export const FlowEdgeView: React.FC<FlowEdgeProps> = ({
  edge,
  views,
  ...props
}) => {
  // This is a simplified edge view - in a real implementation,
  // you would calculate the path based on the positions of the connected nodes
  return (
    <View
      as="svg"
      width="100%"
      height="100%"
      position="absolute"
      top={0}
      left={0}
      pointerEvents="none"
      {...props}
    >
      <View
        as="path"
        d="M0,0 L100,100"
        fill="none"
        {...DefaultFlowStyles.edge}
        {...views?.path}
      />
      {edge.label && (
        <View
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          {...DefaultFlowStyles.edgeLabel}
          {...views?.label}
        >
          {edge.label}
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
      position="absolute"
      bottom={16}
      right={16}
      display="flex"
      gap={8}
      zIndex={10}
      {...(views?.container || {})}
      {...props}
    >
      <View
        {...DefaultFlowStyles.controlButton}
        onClick={onZoomIn}
        {...views?.button}
      >
        <PlusIcon size={16} />
      </View>
      <View
        {...DefaultFlowStyles.controlButton}
        onClick={onZoomOut}
        {...views?.button}
      >
        <MinusIcon size={16} />
      </View>
      <View
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
  position = 'bottom',
  views,
  ...props
}) => {
  return (
    <View
      {...DefaultFlowStyles.addNodeButton}
      onClick={onClick}
      {...views?.container}
      {...props}
    >
      <PlusIcon size={16} {...views?.icon} />
    </View>
  );
};

// Main Flow View component
export const FlowView: React.FC<any> = ({
  nodes,
  edges,
  selectedNodeId,
  viewport,
  onNodeSelect,
  onAddNode,
  onZoomIn,
  onZoomOut,
  onReset,
  size = 'md',
  variant = 'default',
  direction = 'vertical',
  showControls = true,
  allowAddingNodes = true,
  views = {},
  baseId,
  ...props
}) => {
  // For a real implementation, you would use a library like react-flow or xyflow
  // to handle the rendering of nodes and edges with proper positioning

  // This is a simplified vertical flow layout
  return (
    <View
      id={baseId}
      role="application"
      aria-label="Flow diagram"
      {...DefaultFlowStyles.container}
      {...(views?.container || {})}
      {...props}
    >
      <Vertical
        gap={0}
        width="100%"
        alignItems="center"
        padding={20}
        transform={`scale(${viewport?.zoom || 1}) translate(${
          viewport?.x || 0
        }px, ${viewport?.y || 0}px)`}
        transformOrigin="center center"
        transition="transform 0.2s ease"
      >
        {nodes.map((node: FlowNode, index: number) => (
          <React.Fragment key={node.id}>
            {/* Node */}
            <FlowNodeView
              node={node}
              isSelected={selectedNodeId === node.id}
              onSelect={onNodeSelect}
              {...FlowSizes[size]}
              {...FlowVariants[variant]}
              views={views?.node || {}}
            />

            {/* Node Actions */}
            {allowAddingNodes && (
              <Horizontal
                width="100%"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                {/* Vertical connector with Add Button */}
                {index < nodes.length - 1 && (
                  <Vertical
                    alignItems="center"
                    height={40}
                    position="relative"
                    width="100%"
                  >
                    <View
                      width={2}
                      height="100%"
                      backgroundColor="color.gray.300"
                      position="absolute"
                      zIndex={0}
                    />
                    <FlowAddNodeButtonView
                      onClick={() => onAddNode && onAddNode(node.id, 'below')}
                      views={views?.addButton || {}}
                    />
                  </Vertical>
                )}

                {/* Left Add Button */}
                <View
                  position="absolute"
                  left={-20}
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={5}
                >
                  <FlowAddNodeButtonView
                    onClick={() => onAddNode && onAddNode(node.id, 'left')}
                    views={views?.addButton || {}}
                  />
                </View>

                {/* Right Add Button */}
                <View
                  position="absolute"
                  right={-20}
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={5}
                >
                  <FlowAddNodeButtonView
                    onClick={() => onAddNode && onAddNode(node.id, 'right')}
                    views={views?.addButton || {}}
                  />
                </View>
              </Horizontal>
            )}
          </React.Fragment>
        ))}

        {/* Final add buttons */}
        {allowAddingNodes && nodes.length > 0 && (
          <Horizontal
            width="100%"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {/* Vertical final add button */}
            <Vertical
              alignItems="center"
              height={40}
              position="relative"
              width="100%"
            >
              <View
                width={2}
                height="50%"
                backgroundColor="color.gray.300"
                position="absolute"
                top={0}
                zIndex={0}
              />
              <FlowAddNodeButtonView
                onClick={() =>
                  onAddNode && onAddNode(nodes[nodes.length - 1].id, 'below')
                }
                views={views?.addButton || {}}
              />
            </Vertical>

            {/* Left final add button */}
            <View
              position="absolute"
              left={-20}
              top="50%"
              transform="translateY(-50%)"
              zIndex={5}
            >
              <FlowAddNodeButtonView
                onClick={() =>
                  onAddNode && onAddNode(nodes[nodes.length - 1].id, 'left')
                }
                views={views?.addButton || {}}
              />
            </View>

            {/* Right final add button */}
            <View
              position="absolute"
              right={-20}
              top="50%"
              transform="translateY(-50%)"
              zIndex={5}
            >
              <FlowAddNodeButtonView
                onClick={() =>
                  onAddNode && onAddNode(nodes[nodes.length - 1].id, 'right')
                }
                views={views?.addButton || {}}
              />
            </View>
          </Horizontal>
        )}
      </Vertical>

      {showControls && (
        <FlowControlsView
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onReset={onReset}
          views={views?.controls || {}}
        />
      )}
    </View>
  );
};
