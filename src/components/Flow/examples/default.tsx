import React, { useState } from 'react';
import { Flow } from '../Flow';
import { Text, Vertical, View, Horizontal } from 'app-studio';
import { FlowNode, NodeConnection } from '../Flow/Flow.type';

export const DefaultFlow = () => {
  // Initial workflow data
  const [nodes, setNodes] = useState<FlowNode[]>([
    {
      id: 'node-1',
      position: { x: 50, y: 50 }, // Added initial positions for clarity
      data: {
        label: 'New Record',
        subtitle: 'Airtable',
        number: 1,
        icon: (
          <View
            width={32}
            height={32}
            backgroundColor="color.yellow.100"
            borderRadius={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="color.yellow.600">📊</Text>
          </View>
        ),
      },
    },
    {
      id: 'node-2',
      position: { x: 50, y: 200 }, // Added initial positions
      data: {
        label: 'Respond on UI',
        subtitle: 'Human Input',
        number: 2,
        icon: (
          <View
            width={32}
            height={32}
            backgroundColor="color.blue.100"
            borderRadius={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="color.blue.600">↩️</Text>
          </View>
        ),
      },
    },
    {
      id: 'node-3',
      position: { x: 50, y: 350 }, // Added initial positions
      data: {
        label: 'Wait for Approval',
        subtitle: 'Approval (Legacy)',
        number: 3,
        icon: (
          <View
            width={32}
            height={32}
            backgroundColor="color.green.100"
            borderRadius={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="color.green.600">✓</Text>
          </View>
        ),
      },
    },
  ]);

  const [edges, setEdges] = useState<NodeConnection[]>([
    { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
    { id: 'edge-2-3', source: 'node-2', target: 'node-3' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(
    undefined
  );

  return (
    <Vertical gap={20} width="100%" maxWidth={800}>
      <Text marginBottom={10} fontWeight="bold">
        Workflow Builder
      </Text>

      <Horizontal gap={20} alignItems="flex-start">
        <Vertical gap={10} flex={1}>
          <View
            height={400}
            border="1px solid"
            borderColor="color.gray.200"
            borderRadius={8}
          >
            <Flow
              nodes={nodes}
              edges={edges}
              onNodesChange={setNodes}
              onEdgesChange={setEdges}
              selectedNodeId={selectedNodeId}
              onNodeSelect={setSelectedNodeId}
              onNodeAdd={(newNode: FlowNode) => {
                console.log('Node added:', newNode);
                // Example of how to update nodes if onNodeAdd was to manage state here
                // setNodes((nds) => [...nds, newNode]);
              }}
              direction="vertical" // Note: 'vertical' direction with current FlowView only stacks vertically.
              // x/y positioning logic in useFlowState will calculate positions,
              // but FlowView's simple layout won't reflect complex x/y placements.
              views={{
                node: {
                  // Example: container style for each node in FlowView
                  // width: '90%', // This was present, FlowNodeView now has minWidth by default
                },
                // Example: content style within each node in FlowView
                // content: {
                //   width: '100%',
                // },
              }}
            />
          </View>

          {selectedNodeId && (
            <View
              padding={10}
              backgroundColor="color.gray.100"
              borderRadius={4}
            >
              <Text>Selected: {selectedNodeId}</Text>
              <Text>
                {nodes.find((node) => node.id === selectedNodeId)?.data?.label}
              </Text>
            </View>
          )}
        </Vertical>

        <Vertical gap={10} flex={1}>
          <Text fontWeight="bold">Features:</Text>
          <View padding={10} backgroundColor="color.gray.50" borderRadius={4}>
            <Vertical gap={10}>
              <Text>• Click on a node to select it</Text>
              <Text>
                • Use the + button below a node to add a new node vertically
              </Text>
              <Text>
                • Use the + button on the left side to add a node (position
                calculated for a full layout engine)
              </Text>
              <Text>
                • Use the + button on the right side to add a node (position
                calculated for a full layout engine)
              </Text>
              <Text>
                • If a node already has a connection in that direction, the new
                node will be added at the same level (logic in state, visual in
                full layout engine)
              </Text>
              <Text>
                • If a node doesnt have a connection in that direction, a new
                node will be created directly connected to it (logic in state,
                visual in full layout engine)
              </Text>
              <Text>
                • Nodes can be added in multiple directions (left, right, below)
              </Text>
              <Text>
                • Each node can have multiple children in different directions
              </Text>
              <Text fontWeight="bold" marginTop={10}>
                Note on current view:
              </Text>
              <Text>
                The current visual rendering is simplified and primarily stacks
                nodes vertically. Full left/right positioning requires a more
                complex layout engine (e.g., react-flow or xyflow).
              </Text>
            </Vertical>
          </View>
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
