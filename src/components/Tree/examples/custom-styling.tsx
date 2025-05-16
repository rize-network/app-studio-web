import React from 'react';
import { Tree } from '../Tree';
import { Text, Vertical, View } from 'app-studio';
import { FolderIcon, FileIcon } from '../../Icon/Icon'; // Assuming Icon path is correct
import { TreeNode } from '../Tree/Tree.type';

export const CustomStyledTree = () => {
  const treeData: TreeNode[] = [
    {
      id: 'root',
      label: 'Project (Custom Root Style)',
      icon: <FolderIcon size={16} color="color.blue.500" />,
      // Example of custom style for a specific node (via data, if Tree component supported it, or via compound)
      // style: { backgroundColor: 'color.blue.50' },
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
      <Text marginBottom={10} fontWeight="bold">
        Custom Styled Tree
      </Text>

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
              // Styles for the main TreeView container
              // backgroundColor: 'transparent', // Already default
            },
            item: {
              // Styles for each TreeItem container
              borderRadius: 4,
              marginBottom: 2, // Small gap between items
              padding: '4px 0', // Add some vertical padding to item container
              _hover: {
                // Overriding default hover from variant
                backgroundColor: 'color.teal.50',
              },
            },
            itemLabel: {
              // Styles for the TreeItemLabel (clickable part)
              padding: '6px 8px', // Adjusted padding
              borderRadius: 4,
              _hover: {
                // Hover for the label itself
                backgroundColor: 'color.blue.100', // Keep or adjust this
              },
            },
            itemContent: {
              // Styles for the TreeItemContent (children wrapper)
              paddingLeft: 28, // Indentation for children
              borderLeft: '1px dashed',
              borderLeftColor: 'color.blue.300', // Slightly darker
              marginLeft: 12, // Margin for the guide line start from icon/label
              paddingTop: 4,
            },
            expandIcon: {
              // Styles for the Chevron expand/collapse icon
              color: 'color.blue.600', // Darker for better visibility
              marginRight: 4, // Space after expand icon
            },
            icon: {
              // Styles for the item's main icon (folder/file)
              marginRight: 8, // Default is 8, can adjust
              color: 'color.inherit', // Inherit color from parent by default
            },
          }}
        />
      </View>
    </Vertical>
  );
};
