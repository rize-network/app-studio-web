import React from 'react';
import { View, Button, Image, Center } from 'app-studio';
import { MessageAttachment } from './AgentChat.props';
import { DefaultAgentChatStyles } from './AgentChat.style';
import { HoverCard } from '../../../HoverCard/HoverCard';
import { FileIcon, AudioIcon } from '../../../Icon/Icon';

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
  const lowerType = type.toLowerCase();
  const isImage = lowerType.startsWith('image/');
  const isVideo = lowerType.startsWith('video/');
  const isAudio = lowerType.startsWith('audio/');

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

      <HoverCard>
        <HoverCard.Trigger>
          {isImage && (
            <Image
              src={url}
              alt={file.name}
              width="60px"
              height="60px"
              objectFit="cover"
            />
          )}
          {isVideo && (
            <View
              as="video"
              src={url}
              width="60px"
              height="60px"
              style={{ objectFit: 'cover' }}
              muted
            />
          )}
          {isAudio && (
            <Center width="60px" height="60px" backgroundColor="color.gray.200">
              <AudioIcon widthHeight={24} color="color.gray.600" />
            </Center>
          )}
          {!isImage && !isVideo && !isAudio && (
            <Center width="60px" height="60px" backgroundColor="color.gray.200">
              <FileIcon widthHeight={24} color="color.gray.600" />
            </Center>
          )}
        </HoverCard.Trigger>
        <HoverCard.Content>
          {isImage && <Image src={url} alt={file.name} maxWidth="300px" />}
          {isVideo && (
            <View as="video" src={url} controls style={{ maxWidth: '300px' }} />
          )}
          {isAudio && <View as="audio" src={url} controls />}
        </HoverCard.Content>
      </HoverCard>
    </View>
  );
};
