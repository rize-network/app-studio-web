import React from 'react';
import { Tree } from '../Tree';
import { Text, Vertical } from 'app-studio';
import { FolderIcon, FileIcon, DocumentIcon } from '../../Icon/Icon';

export const DefaultTree = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10}>Default Tree</Text>
      <Tree defaultExpandedItems={['files']}>
        <Tree.Item value="files" icon={<FolderIcon size={16} />}>
          <Tree.ItemLabel>Files</Tree.ItemLabel>
          <Tree.ItemContent>
            <Tree.Item value="documents" icon={<FolderIcon size={16} />}>
              <Tree.ItemLabel>Documents</Tree.ItemLabel>
              <Tree.ItemContent>
                <Tree.Item value="doc1" icon={<DocumentIcon size={16} />}>
                  <Tree.ItemLabel>Document 1.docx</Tree.ItemLabel>
                </Tree.Item>
                <Tree.Item value="doc2" icon={<DocumentIcon size={16} />}>
                  <Tree.ItemLabel>Document 2.docx</Tree.ItemLabel>
                </Tree.Item>
              </Tree.ItemContent>
            </Tree.Item>
            <Tree.Item value="images" icon={<FolderIcon size={16} />}>
              <Tree.ItemLabel>Images</Tree.ItemLabel>
              <Tree.ItemContent>
                <Tree.Item value="img1" icon={<FileIcon size={16} />}>
                  <Tree.ItemLabel>image1.jpg</Tree.ItemLabel>
                </Tree.Item>
                <Tree.Item value="img2" icon={<FileIcon size={16} />}>
                  <Tree.ItemLabel>image2.png</Tree.ItemLabel>
                </Tree.Item>
              </Tree.ItemContent>
            </Tree.Item>
            <Tree.Item value="videos" icon={<FolderIcon size={16} />}>
              <Tree.ItemLabel>Videos</Tree.ItemLabel>
              <Tree.ItemContent>
                <Tree.Item value="video1" icon={<FileIcon size={16} />}>
                  <Tree.ItemLabel>video1.mp4</Tree.ItemLabel>
                </Tree.Item>
              </Tree.ItemContent>
            </Tree.Item>
          </Tree.ItemContent>
        </Tree.Item>
      </Tree>
    </Vertical>
  );
};
