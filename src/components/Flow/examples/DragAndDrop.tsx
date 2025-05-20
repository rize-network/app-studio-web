import React, { useState } from 'react';
import { Flow } from '../Flow';
import { FlowNode, NodeConnection } from '../Flow/Flow.type';

export const FlowDragAndDrop = () => {
  // Initial nodes with positions
  const initialNodes: FlowNode[] = [
    {
      id: 'node-1',
      position: { x: 250, y: 100 },
      data: { label: 'Menu Item 1', subtitle: 'Drag to reorder' },
      draggable: true,
    },
    {
      id: 'node-2',
      position: { x: 250, y: 250 },
      data: { label: 'Menu Item 2', subtitle: 'Drag to reorder' },
      draggable: true,
    },
    {
      id: 'node-3',
      position: { x: 250, y: 400 },
      data: { label: 'Menu Item 3', subtitle: 'Drag to reorder' },
      draggable: true,
    },
    {
      id: 'node-4',
      position: { x: 500, y: 250 },
      data: { label: 'Submenu Item', subtitle: 'Child of Menu Item 2' },
      draggable: true,
    },
  ];

  // Initial edges connecting nodes
  const initialEdges: NodeConnection[] = [
    {
      id: 'edge-2-4',
      source: 'node-2',
      target: 'node-4',
      label: 'Child',
    },
  ];

  // State for nodes and edges
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [edges, setEdges] = useState<NodeConnection[]>(initialEdges);

  // Handle node changes
  const handleNodesChange = (newNodes: FlowNode[]) => {
    setNodes(newNodes);
  };

  // Handle node drag start
  const handleNodeDragStart = (nodeId: string) => {
    console.log(`Started dragging node: ${nodeId}`);
    
    // Update the node to show it's being dragged
    setNodes(
      nodes.map((node) =>
        node.id === nodeId ? { ...node, isDragging: true } : node
      )
    );
  };

  // Handle node drag end
  const handleNodeDragEnd = (nodeId: string, position: { x: number; y: number }) => {
    console.log(`Finished dragging node: ${nodeId} to position:`, position);
    
    // Update the node position and remove dragging state
    setNodes(
      nodes.map((node) =>
        node.id === nodeId
          ? { ...node, position, isDragging: false }
          : node
      )
    );
  };

  return (
    <div style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}>
      <Flow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onNodeDragStart={handleNodeDragStart}
        onNodeDragEnd={handleNodeDragEnd}
        allowDraggingNodes={true}
        showControls={true}
        direction="vertical"
      />
    </div>
  );
};
