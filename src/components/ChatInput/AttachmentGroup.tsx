'use client';

import React, { useCallback } from 'react';
import { View } from 'app-studio';
import { UploadedFile } from './ChatInput/ChatInput.type';
import { MessageAttachmentPreview } from '../adk/AgentChat/AgentChat/MessageAttachmentPreview';

interface AttachmentGroupProps {
  files: UploadedFile[];
  sandboxId?: string;
  onRemove: (index: number) => void;
  onSetAsReference?: (index: number) => void;
  layout?: 'inline' | 'grid';
  maxHeight?: string;
  showPreviews?: boolean;
  views?: {
    container?: any;
    item?: any;
    name?: any;
    size?: any;
    removeButton?: any;
    referenceButton?: any;
  };
}

export const AttachmentGroup: React.FC<AttachmentGroupProps> = ({
  files,
  sandboxId,
  onRemove,
  onSetAsReference,
  layout = 'inline',
  maxHeight = '120px',
  showPreviews = false,
  views = {},
}) => {
  if (files.length === 0) {
    return null;
  }

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }, []);

  return (
    <View
      display="flex"
      flexWrap="wrap"
      gap="6px"
      padding="8px 0"
      maxHeight={maxHeight}
      overflowY="auto"
      {...views?.container}
    >
      {files.map((file, index) => (
        <MessageAttachmentPreview
          key={index}
          attachment={{ file, url: file.path, type: file.type as any }}
          onRemove={() => onRemove(index)}
        />
      ))}
    </View>
  );
};
