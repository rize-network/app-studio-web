import React, { useState } from 'react';
import { Flow } from '../Flow';
import { Text, Vertical, View, Horizontal } from 'app-studio';
import { FlowNode, NodeConnection } from '../Flow/Flow.type';

export const DefaultFlow = () => {
  // Initial workflow data
  const [nodes, setNodes] = useState<FlowNode[]>([
    {
      id: 'node-1',
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
      <Text marginBottom={10} fontSize="lg" fontWeight="bold">
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
              onNodeAdd={(node: FlowNode) => console.log('Node added:', node)}
              direction="vertical"
              views={{
                node: {
                  container: {
                    width: '90%',
                  },
                  content: {
                    width: '100%',
                  },
                },
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
          <Text fontSize="md" fontWeight="bold">
            Features:
          </Text>
          <View padding={10} backgroundColor="color.gray.50" borderRadius={4}>
            <Vertical gap={10}>
              <Text>• Click on a node to select it</Text>
              <Text>
                • Use the + button below a node to add a new node vertically
              </Text>
              <Text>
                • Use the + button on the left side to add a node to the left
              </Text>
              <Text>
                • Use the + button on the right side to add a node to the right
              </Text>
              <Text>
                • If a node already has a connection in that direction, the new
                node will be added at the same level
              </Text>
              <Text>
                • If a node doesnt have a connection in that direction, a new
                node will be created directly connected to it
              </Text>
              <Text>
                • Nodes can be added in multiple directions (left, right, below)
              </Text>
              <Text>
                • Each node can have multiple children in different directions
              </Text>
              <Text fontWeight="bold" marginTop={4}>
                Zoom Controls:
              </Text>
              <Text>• Use the + button in the controls to zoom in</Text>
              <Text>• Use the - button in the controls to zoom out</Text>
              <Text>• Use the reset button to reset the zoom level</Text>
            </Vertical>
          </View>
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
