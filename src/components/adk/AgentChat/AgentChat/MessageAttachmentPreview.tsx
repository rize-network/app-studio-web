import React from 'react';
import { View, Vertical, Text, Button } from 'app-studio';
import { MessageAttachment } from './AgentChat.props';
import { DefaultAgentChatStyles } from './AgentChat.style';

export interface MessageAttachmentPreviewProps {
  attachment: MessageAttachment;
  onRemove: () => void;
}

/**
 * MessageAttachmentPreview Component
 *
 * Shows a preview of attached files with the ability to remove them
 */
export const MessageAttachmentPreview: React.FC<
  MessageAttachmentPreviewProps
> = ({ attachment, onRemove }) => {
  const { file, url, type } = attachment;

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return '🖼️';
      case 'video':
        return '🎥';
      case 'audio':
        return '🎵';
      case 'document':
      default:
        return '📄';
    }
  };

  return (
    <View {...DefaultAgentChatStyles.attachmentPreview}>
      {/* Remove button */}
      <Button
        {...DefaultAgentChatStyles.attachmentRemove}
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
      >
        ×
      </Button>

      {/* File preview */}
      <Vertical gap={8} alignItems="center">
        {type === 'image' ? (
          <img
            src={url}
            alt={file.name}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '6px',
            }}
          />
        ) : type === 'video' ? (
          <video
            src={url}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '6px',
            }}
          />
        ) : (
          <View
            width="80px"
            height="80px"
            backgroundColor="color.gray.100"
            borderRadius="6px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="24px">{getFileIcon(type)}</Text>
          </View>
        )}

        {/* File info */}
        <Vertical gap={2} alignItems="center" maxWidth="120px">
          <Text
            fontSize="xs"
            fontWeight="500"
            textAlign="center"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            }}
          >
            {file.name}
          </Text>
          <Text fontSize="xs" color="color.gray.500">
            {formatFileSize(file.size)}
          </Text>
        </Vertical>
      </Vertical>
    </View>
  );
};
