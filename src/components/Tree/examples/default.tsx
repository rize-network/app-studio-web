import React from 'react';
import { Tree } from '../Tree';
import { Text, Vertical } from 'app-studio';
import { FolderIcon, FileIcon, DocumentIcon } from '../../Icon/Icon'; // Assuming Icon path is correct

export const DefaultTree = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10} fontWeight="bold">
        Default Tree (Compound)
      </Text>
      <Tree
        defaultExpandedItems={['files', 'documents']}
        onItemSelect={(itemId, itemData) =>
          console.log(`Compound item selected: ${itemId}`, itemData)
        }
      >
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
                  <Tree.ItemLabel>Document 2.pdf</Tree.ItemLabel>
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
              <Tree.ItemLabel>Videos (Empty)</Tree.ItemLabel>
              <Tree.ItemContent />
              {/* To show expand icon for empty, ensure ItemContent is present, even if empty */}
            </Tree.Item>
            <Tree.Item value="report-file" icon={<DocumentIcon size={16} />}>
              <Tree.ItemLabel>Annual Report.docx</Tree.ItemLabel>
            </Tree.Item>
          </Tree.ItemContent>
        </Tree.Item>
        <Tree.Item value="settings" icon={<FolderIcon size={16} />}>
          <Tree.ItemLabel>Settings</Tree.ItemLabel>
        </Tree.Item>
      </Tree>
    </Vertical>
  );
};
