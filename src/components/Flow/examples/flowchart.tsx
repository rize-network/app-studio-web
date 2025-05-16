import React, { useState } from 'react';
import { Flow } from '../Flow';
import { Text, View } from 'app-studio';
import { FlowNode, NodeConnection } from '../Flow/Flow.type';

export const FlowchartExample = () => {
  // Initial flowchart data
  const [nodes, setNodes] = useState<FlowNode[]>([
    {
      id: 'start',
      type: 'start',
      position: { x: 400, y: 100 },
      data: {
        label: 'Start',
      },
    },
    {
      id: 'node-1',
      position: { x: 400, y: 250 },
      data: {
        label: '',
      },
    },
    {
      id: 'node-2',
      position: { x: 250, y: 400 },
      data: {
        label: '',
      },
    },
    {
      id: 'node-3',
      position: { x: 550, y: 400 },
      data: {
        label: '',
      },
    },
    {
      id: 'node-4',
      position: { x: 250, y: 550 },
      data: {
        label: '',
      },
    },
    {
      id: 'node-5',
      position: { x: 550, y: 550 },
      data: {
        label: '',
      },
    },
  ]);

  const [edges, setEdges] = useState<NodeConnection[]>([
    { id: 'edge-start-1', source: 'start', target: 'node-1' },
    { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
    { id: 'edge-1-3', source: 'node-1', target: 'node-3' },
    { id: 'edge-2-4', source: 'node-2', target: 'node-4' },
    { id: 'edge-3-5', source: 'node-3', target: 'node-5' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(
    undefined
  );

  const [viewport, setViewport] = useState({ zoom: 1, x: 0, y: 0 });

  return (
    <View width="100%" height="600px" padding={20}>
      <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
        Flowchart Example
      </Text>
      <View
        height="500px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius={8}
        overflow="hidden"
      >
        <Flow
          nodes={nodes}
          edges={edges}
          onNodesChange={setNodes}
          onEdgesChange={setEdges}
          selectedNodeId={selectedNodeId}
          onNodeSelect={setSelectedNodeId}
          viewport={viewport}
          onViewportChange={setViewport}
          onNodeAdd={(newNode: FlowNode) => {
            console.log('Node added:', newNode);
            // The nodes are already updated by the Flow component
          }}
        />
      </View>
    </View>
  );
};
