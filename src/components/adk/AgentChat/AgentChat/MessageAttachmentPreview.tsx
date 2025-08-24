import React from 'react';
import { View, Button } from 'app-studio';
import { MessageAttachment } from './AgentChat.props';
import { DefaultAgentChatStyles } from './AgentChat.style';
import { MediaPreview } from '../../../MediaPreview';

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

  return (
    <View {...DefaultAgentChatStyles.attachmentPreview}>
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

      <MediaPreview
        url={url}
        type={type}
        name={file.name}
        onOpen={handleOpen}
      />
    </View>
  );
};
