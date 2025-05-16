import React, { useState } from 'react';
import { Text, Vertical, Horizontal, View } from 'app-studio';
import { PlusIcon, ChevronIcon } from '../../Icon/Icon';
import { TreeNode } from '../Tree/Tree.type';

// Custom node types for workflow
interface WorkflowNode extends TreeNode {
  number: number;
  subtitle: string;
  iconColor?: string;
}

export const WorkflowTree = () => {
  // Initial workflow data
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'node-1',
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
      iconColor: 'color.yellow.500',
    },
    {
      id: 'node-2',
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
      iconColor: 'color.blue.500',
    },
    {
      id: 'node-3',
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
      iconColor: 'color.green.500',
    },
    {
      id: 'node-4',
      label: 'Delete Row',
      subtitle: 'Google Sheets',
      number: 4,
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
          <Text color="color.green.600">📗</Text>
        </View>
      ),
      iconColor: 'color.green.500',
    },
  ]);

  // Function to add a new node after a specific node
  const addNodeAfter = (afterNodeId: string) => {
    const newNodes = [...nodes];
    const afterIndex = newNodes.findIndex((node) => node.id === afterNodeId);

    if (afterIndex !== -1) {
      const newNodeNumber = newNodes[afterIndex].number + 1;

      // Increment numbers for all subsequent nodes
      for (let i = afterIndex + 1; i < newNodes.length; i++) {
        newNodes[i].number += 1;
      }

      // Create new node
      const newNode: WorkflowNode = {
        id: `node-${Date.now()}`,
        label: 'New Step',
        subtitle: 'Select Action Type',
        number: newNodeNumber,
        icon: (
          <View
            width={32}
            height={32}
            backgroundColor="color.gray.100"
            borderRadius={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="color.gray.600">+</Text>
          </View>
        ),
        iconColor: 'color.gray.500',
      };

      // Insert the new node
      newNodes.splice(afterIndex + 1, 0, newNode);
      setNodes(newNodes);
    }
  };

  return (
    <Vertical gap={0} width="100%" maxWidth={500} alignItems="center">
      <Text marginBottom={20}>Workflow Builder</Text>

      {nodes.map((node, index) => (
        <React.Fragment key={node.id}>
          {/* Node */}
          <View
            width="90%"
            padding={16}
            borderRadius={8}
            border="1px solid"
            borderColor={index === 1 ? 'color.purple.400' : 'color.gray.200'}
            backgroundColor="white"
            marginBottom={0}
            position="relative"
            zIndex={1}
            boxShadow={index === 1 ? '0 0 0 2px color.purple.100' : 'none'}
          >
            <Horizontal gap={12} alignItems="center">
              {node.icon}
              <Vertical gap={2}>
                <Horizontal gap={4} alignItems="center">
                  <Text fontWeight="bold">
                    {node.number}. {node.label}
                  </Text>
                  <ChevronIcon orientation="down" size={16} />
                </Horizontal>
                <Text color="color.gray.500" fontSize="sm">
                  {node.subtitle}
                </Text>
              </Vertical>
            </Horizontal>
          </View>

          {/* Connector with Add Button */}
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
              <View
                backgroundColor="color.gray.200"
                width={28}
                height={28}
                borderRadius={14}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={() => addNodeAfter(node.id)}
                zIndex={1}
                _hover={{
                  backgroundColor: 'color.gray.300',
                }}
              >
                <PlusIcon size={16} color="color.gray.600" />
              </View>
            </Vertical>
          )}
        </React.Fragment>
      ))}

      {/* Final add button */}
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
        <View
          backgroundColor="color.gray.200"
          width={28}
          height={28}
          borderRadius={14}
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={() => addNodeAfter(nodes[nodes.length - 1].id)}
          zIndex={1}
          _hover={{
            backgroundColor: 'color.gray.300',
          }}
        >
          <PlusIcon size={16} color="color.gray.600" />
        </View>
      </Vertical>
    </Vertical>
  );
};
