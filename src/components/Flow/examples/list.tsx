// This example demonstrates a custom list-based workflow visualizer.
// It does NOT use the Tree component, but showcases a similar visual pattern for sequential steps.
import React, { useState } from 'react';
import { Text, Vertical, Horizontal, View } from 'app-studio';
import { PlusIcon, ChevronIcon } from '../../Icon/Icon'; // Assuming Icon path is correct
import { TreeNode } from '../../Tree/Tree/Tree.type'; // TreeNode is used for structure, not for Tree component

// Custom node type for this specific workflow visualizer
interface WorkflowStepNode extends Omit<TreeNode, 'children' | 'label'> {
  // Omit Tree-specifics if not needed
  id: string;
  label: string; // Keep label
  number: number;
  subtitle: string;
  icon?: React.ReactNode; // Made icon optional and use ReactNode for consistency
  iconColor?: string; // This might be part of the icon's props itself
}

export const FlowList = () => {
  // Initial workflow data
  const [nodes, setNodes] = useState<WorkflowStepNode[]>([
    {
      id: 'wf-node-1',
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
          <Text color="color.yellow.600" fontSize="xl">
            📊
          </Text>
        </View>
      ),
    },
    {
      id: 'wf-node-2',
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
          <Text color="color.blue.600" fontSize="xl">
            ↩️
          </Text>
        </View>
      ),
    },
    {
      id: 'wf-node-3',
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
          <Text color="color.green.600" fontSize="xl">
            ✓
          </Text>
        </View>
      ),
    },
    {
      id: 'wf-node-4',
      label: 'Delete Row',
      subtitle: 'Google Sheets',
      number: 4,
      icon: (
        <View
          width={32}
          height={32}
          backgroundColor="color.red.100" // Changed color for variety
          borderRadius={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="color.red.600" fontSize="xl">
            📗
          </Text>
        </View>
      ),
    },
  ]);

  // Function to add a new node after a specific node
  const addNodeAfter = (afterNodeId: string) => {
    const newNodesList = [...nodes];
    const afterIndex = newNodesList.findIndex(
      (node) => node.id === afterNodeId
    );

    if (afterIndex !== -1) {
      const newNodeNumber = newNodesList[afterIndex].number + 1;

      // Increment numbers for all subsequent nodes
      for (let i = afterIndex + 1; i < newNodesList.length; i++) {
        newNodesList[i].number += 1;
      }

      // Create new node
      const newNodeId = `wf-node-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 6)}`;
      const newNode: WorkflowStepNode = {
        id: newNodeId,
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
            <Text color="color.gray.600" fontSize="xl">
              +
            </Text>
          </View>
        ),
      };

      // Insert the new node
      newNodesList.splice(afterIndex + 1, 0, newNode);
      setNodes(newNodesList);
    } else if (nodes.length === 0) {
      // Handle adding the first node
      const newNodeId = `wf-node-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 6)}`;
      const newNode: WorkflowStepNode = {
        id: newNodeId,
        label: 'First Step',
        subtitle: 'Configure this step',
        number: 1,
        icon: (
          /* similar icon */ <View
            width={32}
            height={32}
            backgroundColor="color.gray.100"
            borderRadius={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="color.gray.600" fontSize="xl">
              +
            </Text>
          </View>
        ),
      };
      setNodes([newNode]);
    }
  };

  const lastNodeId = nodes.length > 0 ? nodes[nodes.length - 1].id : null;

  return (
    <Vertical gap={0} width="100%" maxWidth={500} alignItems="center">
      <Text marginBottom={20} fontSize="lg" fontWeight="bold">
        Workflow List Visualizer
      </Text>

      {nodes.map((node, index) => (
        <React.Fragment key={node.id}>
          {/* Node */}
          <View
            width="90%"
            padding={16}
            borderRadius={8}
            border="1px solid"
            // Example of conditional styling for a specific node (e.g., selected)
            borderColor={index === 1 ? 'color.purple.400' : 'color.gray.200'}
            backgroundColor="white"
            marginBottom={0} // Connectors will handle spacing
            position="relative"
            zIndex={1} // Ensure node is above connector line part behind it
            boxShadow={index === 1 ? '0 0 0 2px color.purple.100' : 'none'}
          >
            <Horizontal gap={12} alignItems="center">
              {node.icon}
              <Vertical gap={2} flexGrow={1} overflow="hidden">
                <Horizontal gap={4} alignItems="center">
                  <Text fontWeight="bold" isTruncated>
                    {node.number}. {node.label}
                  </Text>
                  <ChevronIcon orientation="down" size={16} />
                </Horizontal>
                <Text color="color.gray.500" fontSize="sm" isTruncated>
                  {node.subtitle}
                </Text>
              </Vertical>
            </Horizontal>
          </View>

          {/* Connector with Add Button (if not the last node) */}
          {index < nodes.length - 1 && (
            <Vertical
              alignItems="center"
              height={40} // Space for line and button
              position="relative"
              width="100%" // To center the button
            >
              <View // Connector line
                width={2}
                height="100%"
                backgroundColor="color.gray.300"
                position="absolute"
                zIndex={0} // Behind button
              />
              <View // Add button
                as="button"
                aria-label={`Add step after ${node.label}`}
                backgroundColor="color.gray.200"
                width={28}
                height={28}
                borderRadius="50%" // Make it circular
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={() => addNodeAfter(node.id)}
                zIndex={1} // Above line
                _hover={{
                  backgroundColor: 'color.gray.300',
                }}
                border="none"
              >
                <PlusIcon size={16} color="color.gray.700" />
              </View>
            </Vertical>
          )}
        </React.Fragment>
      ))}

      {/* Final add button (always shown, or shown if nodes exist) */}
      {/* This button adds after the last node, or as the first node if list is empty. */}
      <Vertical
        alignItems="center"
        height={40}
        position="relative"
        width="100%"
      >
        {nodes.length > 0 /* Show line only if there are preceding nodes */ && (
          <View // Connector line part for the final add button
            width={2}
            height="50%" // Line from top to center
            backgroundColor="color.gray.300"
            position="absolute"
            top={0}
            zIndex={0}
          />
        )}
        <View // The final add button itself
          as="button"
          aria-label={
            nodes.length > 0
              ? `Add step after ${nodes[nodes.length - 1].label}`
              : 'Add first step'
          }
          backgroundColor="color.gray.200"
          width={28}
          height={28}
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={() => addNodeAfter(lastNodeId || '')} // Pass last node ID or handle empty string for first node
          zIndex={1}
          _hover={{
            backgroundColor: 'color.gray.300',
          }}
          border="none"
        >
          <PlusIcon size={16} color="color.gray.700" />
        </View>
      </Vertical>
    </Vertical>
  );
};
