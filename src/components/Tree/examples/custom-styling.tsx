import React from 'react';
import { Tree } from '../Tree';
import { Text, Vertical, View } from 'app-studio';
import { FolderIcon, FileIcon } from '../../Icon/Icon';
import { TreeNode } from '../Tree/Tree.type';

export const CustomStyledTree = () => {
  const treeData: TreeNode[] = [
    {
      id: 'root',
      label: 'Project',
      icon: <FolderIcon size={16} color="color.blue.500" />,
      children: [
        {
          id: 'src',
          label: 'src',
          icon: <FolderIcon size={16} color="color.blue.500" />,
          children: [
            {
              id: 'components',
              label: 'components',
              icon: <FolderIcon size={16} color="color.blue.500" />,
              children: [
                {
                  id: 'button',
                  label: 'Button.tsx',
                  icon: <FileIcon size={16} color="color.purple.500" />,
                },
                {
                  id: 'tree',
                  label: 'Tree.tsx',
                  icon: <FileIcon size={16} color="color.purple.500" />,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10}>Custom Styled Tree</Text>

      <View
        padding={16}
        backgroundColor="color.gray.50"
        borderRadius={8}
        border="1px solid"
        borderColor="color.gray.200"
      >
        <Tree
          items={treeData}
          defaultExpandedItems={['root', 'src', 'components']}
          views={{
            container: {
              backgroundColor: 'transparent',
            },
            item: {
              borderRadius: 4,
              marginBottom: 4,
            },
            itemLabel: {
              padding: 8,
              borderRadius: 4,
              _hover: {
                backgroundColor: 'color.blue.50',
              },
            },
            itemContent: {
              paddingLeft: 32,
              borderLeft: '1px dashed',
              borderLeftColor: 'color.blue.200',
              marginLeft: 8,
            },
            expandIcon: {
              color: 'color.blue.500',
            },
          }}
        />
      </View>
    </Vertical>
  );
};
