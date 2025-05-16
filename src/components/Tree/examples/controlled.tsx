import React, { useState } from 'react';
import { Tree } from '../Tree';
import { Text, Vertical, Horizontal, View } from 'app-studio';
import { Button } from '../../Button/Button'; // Assuming Button path is correct
import { FolderIcon, FileIcon } from '../../Icon/Icon'; // Assuming Icon path is correct
import { TreeNode } from '../Tree/Tree.type';

export const ControlledTree = () => {
  const treeData: TreeNode[] = [
    {
      id: 'root',
      label: 'Project',
      icon: <FolderIcon size={16} />,
      children: [
        {
          id: 'src',
          label: 'src',
          icon: <FolderIcon size={16} />,
          children: [
            {
              id: 'components',
              label: 'components',
              icon: <FolderIcon size={16} />,
              children: [
                {
                  id: 'button',
                  label: 'Button.tsx',
                  icon: <FileIcon size={16} />,
                },
                {
                  id: 'tree',
                  label: 'Tree.tsx',
                  icon: <FileIcon size={16} />,
                },
              ],
            },
            {
              id: 'utils',
              label: 'utils',
              icon: <FolderIcon size={16} />,
              children: [
                {
                  id: 'helpers',
                  label: 'helpers.ts',
                  icon: <FileIcon size={16} />,
                },
              ],
            },
          ],
        },
        {
          id: 'public',
          label: 'public',
          icon: <FolderIcon size={16} />,
          children: [
            {
              id: 'index',
              label: 'index.html',
              icon: <FileIcon size={16} />,
            },
          ],
        },
      ],
    },
  ];

  const [expandedItems, setExpandedItems] = useState<string[]>(['root']);
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );
  const [selectedNodeData, setSelectedNodeData] = useState<
    TreeNode | undefined
  >(undefined);

  const expandAll = () => {
    const getAllIds = (nodes: TreeNode[]): string[] => {
      return nodes.reduce((acc: string[], node) => {
        acc.push(node.id);
        if (node.children && node.children.length > 0) {
          acc = [...acc, ...getAllIds(node.children)];
        }
        return acc;
      }, []);
    };
    setExpandedItems(getAllIds(treeData));
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10} fontSize="lg" fontWeight="bold">
        Controlled Tree
      </Text>

      <Horizontal gap={10} marginBottom={10}>
        <Button size="sm" onClick={expandAll}>
          Expand All
        </Button>
        <Button size="sm" onClick={collapseAll}>
          Collapse All
        </Button>
      </Horizontal>

      <Horizontal gap={20} alignItems="flex-start">
        <Tree
          items={treeData}
          expandedItems={expandedItems}
          onExpandedItemsChange={setExpandedItems}
          selectedItem={selectedItem}
          onItemSelect={(itemId, itemData) => {
            setSelectedItem(itemId);
            setSelectedNodeData(itemData);
            console.log(`Selected item: ${itemId}`, itemData);
          }}
        />

        {selectedItem && (
          <View
            padding={10}
            backgroundColor="color.gray.100"
            borderRadius={4}
            flexShrink={0}
            width={200}
          >
            <Text fontWeight="bold">Selected:</Text>
            <Text>ID: {selectedItem}</Text>
            {selectedNodeData && <Text>Label: {selectedNodeData.label}</Text>}
          </View>
        )}
      </Horizontal>
    </Vertical>
  );
};
