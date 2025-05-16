import React from 'react';
import { Tree } from '../Tree';
import { Text, Vertical } from 'app-studio';
import { FolderIcon, FileIcon, DocumentIcon } from '../../Icon/Icon';
import { TreeNode } from '../Tree/Tree.type';

export const DataDrivenTree = () => {
  const treeData: TreeNode[] = [
    {
      id: 'files',
      label: 'Files',
      icon: <FolderIcon size={16} />,
      children: [
        {
          id: 'documents',
          label: 'Documents',
          icon: <FolderIcon size={16} />,
          children: [
            {
              id: 'doc1',
              label: 'Document 1.docx',
              icon: <DocumentIcon size={16} />,
            },
            {
              id: 'doc2',
              label: 'Document 2.docx',
              icon: <DocumentIcon size={16} />,
            },
          ],
        },
        {
          id: 'images',
          label: 'Images',
          icon: <FolderIcon size={16} />,
          children: [
            {
              id: 'img1',
              label: 'image1.jpg',
              icon: <FileIcon size={16} />,
            },
            {
              id: 'img2',
              label: 'image2.png',
              icon: <FileIcon size={16} />,
            },
          ],
        },
        {
          id: 'videos',
          label: 'Videos',
          icon: <FolderIcon size={16} />,
          children: [
            {
              id: 'video1',
              label: 'video1.mp4',
              icon: <FileIcon size={16} />,
            },
          ],
        },
      ],
    },
  ];

  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10}>Data-Driven Tree</Text>
      <Tree
        items={treeData}
        defaultExpandedItems={['files']}
        onItemSelect={(itemId) => console.log(`Selected item: ${itemId}`)}
      />
    </Vertical>
  );
};
