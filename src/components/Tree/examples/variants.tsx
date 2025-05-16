import React from 'react';
import { Tree } from '../Tree';
import { Text, Vertical, Horizontal } from 'app-studio';
import { FolderIcon, FileIcon } from '../../Icon/Icon';
import { TreeNode } from '../Tree/Tree.type';

export const TreeVariants = () => {
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
              icon: <FileIcon size={16} />,
            },
            {
              id: 'utils',
              label: 'utils',
              icon: <FileIcon size={16} />,
            },
          ],
        },
        {
          id: 'public',
          label: 'public',
          icon: <FolderIcon size={16} />,
        },
      ],
    },
  ];

  return (
    <Vertical gap={30} width="100%">
      <Text marginBottom={10} fontWeight="bold">
        Tree Variants
      </Text>

      <Horizontal gap={20} alignItems="flex-start">
        <Vertical gap={10} width="30%">
          <Text fontWeight="bold">Default</Text>
          <Tree
            items={treeData}
            defaultExpandedItems={['root']}
            variant="default"
          />
        </Vertical>

        <Vertical gap={10} width="30%">
          <Text fontWeight="bold">Outline</Text>
          <Tree
            items={treeData}
            defaultExpandedItems={['root']}
            variant="outline"
          />
        </Vertical>

        <Vertical gap={10} width="30%">
          <Text fontWeight="bold">Filled</Text>
          <Tree
            items={treeData}
            defaultExpandedItems={['root']}
            variant="filled"
          />
        </Vertical>
      </Horizontal>

      <Text marginTop={20} marginBottom={10} fontWeight="bold">
        Tree Sizes
      </Text>

      <Horizontal gap={20} alignItems="flex-start">
        <Vertical gap={10} width="30%">
          <Text fontWeight="bold">Small</Text>
          <Tree items={treeData} defaultExpandedItems={['root']} size="sm" />
        </Vertical>

        <Vertical gap={10} width="30%">
          <Text fontWeight="bold">Medium (Default)</Text>
          <Tree items={treeData} defaultExpandedItems={['root']} size="md" />
        </Vertical>

        <Vertical gap={10} width="30%">
          <Text fontWeight="bold">Large</Text>
          <Tree items={treeData} defaultExpandedItems={['root']} size="lg" />
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
