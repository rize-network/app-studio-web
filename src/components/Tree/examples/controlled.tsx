import React, { useState } from 'react';
import { Tree } from '../Tree';
import { Text, Vertical, Horizontal, View } from 'app-studio';
import { Button } from '../../Button/Button';
import { FolderIcon, FileIcon } from '../../Icon/Icon';
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

  const expandAll = () => {
    // Recursively collect all node IDs
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
      <Text marginBottom={10}>Controlled Tree</Text>

      <Horizontal gap={10} marginBottom={10}>
        <Button size="sm" onClick={expandAll}>
          Expand All
        </Button>
        <Button size="sm" onClick={collapseAll}>
          Collapse All
        </Button>
      </Horizontal>

      <View display="flex" gap={20}>
        <Tree
          items={treeData}
          expandedItems={expandedItems}
          onExpandedItemsChange={setExpandedItems}
          selectedItem={selectedItem}
          onItemSelect={(itemId) => {
            setSelectedItem(itemId);
            console.log(`Selected item: ${itemId}`);
          }}
        />

        {selectedItem && (
          <View padding={10} backgroundColor="color.gray.100" borderRadius={4}>
            <Text>Selected: {selectedItem}</Text>
          </View>
        )}
      </View>
    </Vertical>
  );
};
