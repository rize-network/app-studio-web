import React from 'react';
import { View, Text, Button } from 'app-studio';
import { MessageAttachment } from './AgentChat.props';
import { DefaultAgentChatStyles } from './AgentChat.style';

export interface MessageAttachmentPreviewProps {
  attachment: MessageAttachment;
  onRemove?: () => void;
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

  // Open file in a new tab/window
  const handleOpen = () => {
    window.open(url, '_blank');
  };

  // Icon for non-image files
  const getFileIcon = () => {
    if (type === 'audio' || type === 'video') return '▶️';
    return '📄';
  };

  return (
    <View {...DefaultAgentChatStyles.attachmentPreview} onClick={handleOpen}>
      {onRemove && (
        <Button
          {...DefaultAgentChatStyles.attachmentRemove}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${file.name}`}
        >
          ×
        </Button>
      )}

      {type === 'image' ? (
        <img
          src={url}
          alt={file.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <View
          width="100%"
          height="100%"
          backgroundColor="color.gray.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="24px">{getFileIcon()}</Text>
        </View>
      )}
    </View>
  );
};
