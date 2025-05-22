import React, { useState } from 'react';
import { Tree } from '../Tree';
import { TreeNode } from '../Tree/Tree.type';
import { View, Text } from 'app-studio';
import { DragHandleLinesIcon } from '../../Icon/Icon';

export const TreeDragAndDrop = () => {
  // Initial tree data for a menu structure
  const initialItems: TreeNode[] = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
    },
    {
      id: 'products',
      label: 'Products',
      icon: '📦',
      children: [
        {
          id: 'electronics',
          label: 'Electronics',
          icon: '💻',
          children: [
            {
              id: 'computers',
              label: 'Computers',
              icon: '🖥️',
            },
            {
              id: 'phones',
              label: 'Phones',
              icon: '📱',
            },
          ],
        },
        {
          id: 'clothing',
          label: 'Clothing',
          icon: '👕',
        },
      ],
    },
    {
      id: 'services',
      label: 'Services',
      icon: '🔧',
    },
    {
      id: 'about',
      label: 'About Us',
      icon: 'ℹ️',
      children: [
        {
          id: 'team',
          label: 'Our Team',
          icon: '👥',
        },
        {
          id: 'history',
          label: 'History',
          icon: '📜',
        },
      ],
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: '📞',
    },
  ];

  // State to track the current tree items
  const [items, setItems] = useState<TreeNode[]>(initialItems);
  // State to track expanded items
  const [expandedItems, setExpandedItems] = useState<string[]>([
    'products',
    'electronics',
    'about',
  ]);

  // Handle items reordering
  const handleItemsReorder = (newItems: TreeNode[]) => {
    console.log('Tree structure updated:', newItems);
    setItems(newItems);
  };

  // Handle drag start
  const handleDragStart = (itemId: string) => {
    console.log(`Started dragging item: ${itemId}`);
  };

  // Handle drag end
  const handleDragEnd = (itemId: string) => {
    console.log(`Finished dragging item: ${itemId}`);

    // Ensure all items with children are expanded for better visibility
    const itemsWithChildren = findItemsWithChildren(items);
    const newExpandedItems = [
      ...new Set([...expandedItems, ...itemsWithChildren]),
    ];
    setExpandedItems(newExpandedItems);
  };

  // Helper function to find all items with children
  const findItemsWithChildren = (nodes: TreeNode[]): string[] => {
    let result: string[] = [];

    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        result.push(node.id);
        result = [...result, ...findItemsWithChildren(node.children)];
      }
    }

    return result;
  };

  // Custom drag handle icon
  const CustomDragHandleIcon = () => <DragHandleLinesIcon />;

  return (
    <View padding={16}>
      <Text as="h2" marginBottom={8}>
        Menu Structure (Drag and Drop to Reorganize)
      </Text>
      <View marginBottom={16}>
        <Text fontSize="sm" color="color.gray.600" fontWeight="bold">
          Instructions:
        </Text>
        <Text fontSize="sm" color="color.gray.600">
          • Use the drag handle icon{' '}
          <span style={{ verticalAlign: 'middle' }}>≡</span> on the right to
          drag items
        </Text>
        <Text fontSize="sm" color="color.gray.600">
          • Drop in the top 25% of an item to place before it (blue line appears
          on top)
        </Text>
        <Text fontSize="sm" color="color.gray.600">
          • Drop in the middle 50% of an item to place inside it as a child
          (blue background)
        </Text>
        <Text fontSize="sm" color="color.gray.600">
          • Drop in the bottom 25% of an item to place after it (blue line
          appears on bottom)
        </Text>
        <Text
          fontSize="sm"
          color="color.gray.600"
          fontWeight="bold"
          marginTop={8}
        >
          Note: All children are preserved when dragging items!
        </Text>
        <Text fontSize="sm" color="color.gray.600">
          • If you drop an item outside a valid target, the operation is
          canceled and no data is lost
        </Text>
      </View>
      <View
        width="300px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius={4}
        padding={8}
        backgroundColor="color.white"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
      >
        <Tree
          items={items}
          expandedItems={expandedItems}
          onExpandedItemsChange={setExpandedItems}
          allowDragAndDrop={true}
          dragHandleIcon={<CustomDragHandleIcon />}
          onItemsReorder={handleItemsReorder}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          views={{
            item: {
              transition: 'all 0.2s ease',
              _hover: {
                backgroundColor: 'color.gray.50',
              },
              marginY: 2, // Add vertical margin to make drop targets more visible
              padding: 2, // Add padding for better visual appearance
            },
            draggedItem: {
              backgroundColor: 'color.blue.50',
              opacity: 0.8,
            },
            dragHandle: {
              color: 'color.gray.400',
              _hover: {
                color: 'color.blue.500',
              },
            },
          }}
        />
      </View>

      {/* Display the current tree structure */}
      <View marginTop={24}>
        <Text as="h3" marginBottom={8}>
          Current Tree Structure:
        </Text>
        <View
          backgroundColor="color.gray.50"
          padding={8}
          borderRadius={4}
          fontFamily="monospace"
          fontSize="sm"
          whiteSpace="pre-wrap"
          maxHeight="300px"
          overflow="auto"
        >
          {JSON.stringify(items, null, 2)}
        </View>
      </View>
    </View>
  );
};
