'use client';

import React, { useCallback } from 'react';
import { Vertical, View, Image, Center, Button } from 'app-studio';
import { FileIcon, AudioIcon } from '../Icon/Icon';
import { HoverCard } from '../HoverCard/HoverCard';
import { DefaultAgentChatStyles } from '../adk/AgentChat/AgentChat/AgentChat.style';
import { Text } from '../Text/Text';

interface AttachmentGroupProps {
  files: File[];
  sandboxId?: string;
  onRemove: (index: number) => void;
  layout?: 'inline' | 'grid';
  maxHeight?: string;
  showPreviews?: boolean;
  views?: {
    container?: any;
    item?: any;
    name?: any;
    size?: any;
    removeButton?: any;
  };
}

export const AttachmentGroup: React.FC<AttachmentGroupProps> = ({
  files,
  sandboxId,
  onRemove,
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
      {files.map((file, index) => {
        const previewUrl =
          URL.createObjectURL(file) ||
          (file as any)?.path ||
          (file as any)?.url ||
          '';
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        const isAudio = file.type.startsWith('audio/');
        return (
          <Vertical
            key={index}
            alignItems="center"
            gap="6px"
            padding="4px 8px"
            borderRadius="6px"
            backgroundColor="color.gray.100"
            animate={{
              from: { opacity: 0, scale: 0.9 },
              to: { opacity: 1, scale: 1 },
            }}
            animationDuration={0.2}
            {...views?.item}
          >
            {showPreviews && (
              <HoverCard>
                <HoverCard.Trigger>
                  {isImage && (
                    <Image
                      src={previewUrl}
                      alt={file.name}
                      width="60px"
                      height="60px"
                      objectFit="cover"
                    />
                  )}
                  {isVideo && (
                    <View
                      as="video"
                      src={previewUrl}
                      alt={file.name}
                      controls={false}
                      muted={true}
                      width="60px"
                      height="60px"
                      objectFit="cover"
                    />
                  )}
                  {isAudio && (
                    <Center
                      width="60px"
                      height="60px"
                      backgroundColor="color.gray.200"
                    >
                      <AudioIcon widthHeight={24} color="color.black" />
                    </Center>
                  )}
                  {!isImage && !isVideo && !isAudio && (
                    <Center
                      width="60px"
                      height="60px"
                      backgroundColor="color.gray.200"
                    >
                      <FileIcon widthHeight={24} color="color.black" />
                    </Center>
                  )}

                  {onRemove && (
                    <Button
                      {...DefaultAgentChatStyles.attachmentRemove}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(index);
                      }}
                      aria-label={`Remove ${file.name}`}
                    >
                      ×
                    </Button>
                  )}
                </HoverCard.Trigger>
                <HoverCard.Content>
                  {isImage && (
                    <Image src={previewUrl} alt={file.name} maxWidth="100%" />
                  )}
                  {isVideo && (
                    <View
                      as="video"
                      src={previewUrl}
                      controls
                      maxWidth="100%"
                    />
                  )}
                  {isAudio && (
                    <View as="audio" src={previewUrl} controls width={'100%'} />
                  )}
                  <Text
                    marginTop="4px"
                    truncateText={true}
                    textOverflow="ellipsis"
                    overflow="hidden"
                    width={'100%'}
                    {...views?.name}
                  >
                    {file.name} ({formatFileSize(file.size)})
                  </Text>
                </HoverCard.Content>
              </HoverCard>
            )}
          </Vertical>
        );
      })}
    </View>
  );
};
