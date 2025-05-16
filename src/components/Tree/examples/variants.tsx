import React from 'react';
import { Tree } from '../Tree';
import { Text, Vertical, Horizontal } from 'app-studio';
import { FolderIcon, FileIcon } from '../../Icon/Icon'; // Assuming Icon path is correct
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
              icon: <FileIcon size={16} />, // Inconsistent: label 'components' usually a folder
            },
            {
              id: 'utils',
              label: 'utils',
              icon: <FileIcon size={16} />, // Inconsistent: label 'utils' usually a folder
            },
          ],
        },
        {
          id: 'public',
          label: 'public',
          icon: <FolderIcon size={16} />, // No children, so it's a leaf node visually unless ItemContent is used in compound
        },
      ],
    },
  ];

  const treeDataFixed: TreeNode[] = [
    // More consistent data
    {
      id: 'root-fx', // Changed ID to avoid clashes if rendered on same page
      label: 'Project Root',
      icon: <FolderIcon size={16} />,
      children: [
        {
          id: 'src-fx',
          label: 'Source Files',
          icon: <FolderIcon size={16} />,
          children: [
            {
              id: 'components-fx',
              label: 'Components Folder',
              icon: <FolderIcon size={16} />, // Corrected to FolderIcon
              children: [
                {
                  id: 'button-fx',
                  label: 'Button.ts',
                  icon: <FileIcon size={16} />,
                },
              ],
            },
            {
              id: 'utils-fx',
              label: 'Utilities Folder',
              icon: <FolderIcon size={16} />, // Corrected to FolderIcon
              children: [
                {
                  id: 'helper-fx',
                  label: 'helper.ts',
                  icon: <FileIcon size={16} />,
                },
              ],
            },
          ],
        },
        {
          id: 'public-fx',
          label: 'Public Assets',
          icon: <FolderIcon size={16} />,
          children: [
            {
              id: 'index-html-fx',
              label: 'index.html',
              icon: <FileIcon size={16} />,
            },
          ],
        },
      ],
    },
  ];

  return (
    <Vertical gap={30} width="100%">
      <Text marginBottom={10} fontSize="xl" fontWeight="bold">
        Tree Variants & Sizes
      </Text>

      <Text marginBottom={10} fontSize="lg" fontWeight="bold">
        Tree Variants
      </Text>
      <Horizontal gap={30} alignItems="flex-start" flexWrap="wrap">
        <Vertical gap={10}>
          <Text fontWeight="medium">Default Variant</Text>
          <Tree
            items={treeDataFixed}
            defaultExpandedItems={['root-fx', 'src-fx']}
            variant="default"
          />
        </Vertical>

        <Vertical gap={10}>
          <Text fontWeight="medium">Outline Variant</Text>
          <Tree
            items={treeDataFixed}
            defaultExpandedItems={['root-fx', 'src-fx']}
            variant="outline"
          />
        </Vertical>

        <Vertical gap={10}>
          <Text fontWeight="medium">Filled Variant</Text>
          <Tree
            items={treeDataFixed}
            defaultExpandedItems={['root-fx', 'src-fx']}
            variant="filled"
          />
        </Vertical>
      </Horizontal>

      <Text marginTop={30} marginBottom={10} fontSize="lg" fontWeight="bold">
        Tree Sizes
      </Text>

      <Horizontal gap={30} alignItems="flex-start" flexWrap="wrap">
        <Vertical gap={10}>
          <Text fontWeight="medium">Small Size</Text>
          <Tree
            items={treeDataFixed}
            defaultExpandedItems={['root-fx', 'src-fx']}
            size="sm"
          />
        </Vertical>

        <Vertical gap={10}>
          <Text fontWeight="medium">Medium Size (Default)</Text>
          <Tree
            items={treeDataFixed}
            defaultExpandedItems={['root-fx', 'src-fx']}
            size="md"
          />
        </Vertical>

        <Vertical gap={10}>
          <Text fontWeight="medium">Large Size</Text>
          <Tree
            items={treeDataFixed}
            defaultExpandedItems={['root-fx', 'src-fx']}
            size="lg"
          />
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
