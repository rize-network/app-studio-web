'use client';

import React, { useCallback } from 'react';
import { Horizontal, Text, Vertical, View, Image, Center } from 'app-studio';
import { UploadedFile } from './ChatInput/ChatInput.type';
import { ImageIcon, FileIcon, AudioIcon } from '../Icon/Icon';
import { HoverCard } from '../HoverCard/HoverCard';

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
      {files.map((file, index) => {
        const previewUrl = file.localUrl || file.path;
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
            <Horizontal>
              {/* {!sandboxId && (
                  <Text as="span" marginLeft="4px" color="theme.primary">
                    (pending)
                  </Text>
                )} */}
            </Horizontal>

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
                      width="60px"
                      height="60px"
                      style={{ objectFit: 'cover' }}
                      muted
                    />
                  )}
                  {isAudio && (
                    <Center
                      width="60px"
                      height="60px"
                      backgroundColor="color.gray.200"
                    >
                      <AudioIcon widthHeight={24} color="color.gray.600" />
                    </Center>
                  )}
                  {!isImage && !isVideo && !isAudio && (
                    <Center
                      width="60px"
                      height="60px"
                      backgroundColor="color.gray.200"
                    >
                      <FileIcon widthHeight={24} color="color.gray.600" />
                    </Center>
                  )}
                </HoverCard.Trigger>
                <HoverCard.Content>
                  {isImage && (
                    <Image src={previewUrl} alt={file.name} maxWidth="300px" />
                  )}
                  {isVideo && (
                    <View
                      as="video"
                      src={previewUrl}
                      controls
                      style={{ maxWidth: '300px' }}
                    />
                  )}
                  {isAudio && <View as="audio" src={previewUrl} controls />}
                  <Text marginTop="4px">
                    {file.name} ({formatFileSize(file.size)})
                  </Text>
                </HoverCard.Content>
              </HoverCard>
            )}

            {/* Reference button for image files */}
            {onSetAsReference && isImage && (
              <View
                as="button"
                type="button"
                width="16px"
                height="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
                backgroundColor={
                  file.isReferenceImage ? 'theme.primary' : 'transparent'
                }
                color={file.isReferenceImage ? 'color.white' : 'color.gray.500'}
                cursor="pointer"
                transition="all 0.2s ease"
                onClick={() => onSetAsReference(index)}
                title={
                  file.isReferenceImage
                    ? 'Reference image'
                    : 'Set as reference image'
                }
                _hover={{
                  backgroundColor: file.isReferenceImage
                    ? 'color.blue.600'
                    : 'color.blue.100',
                  color: file.isReferenceImage
                    ? 'color.white'
                    : 'theme.primary',
                }}
                {...views?.referenceButton}
              >
                <ImageIcon
                  widthHeight={20}
                  color="currentColor"
                  filled={file.isReferenceImage}
                />
              </View>
            )}

            {/* <Button
                variant="ghost"
                size="sm"
                icon={<TrashIcon widthHeight={12} />}
                onClick={() => onRemove(index)}
              /> */}
          </Vertical>
        );
      })}
    </View>
  );
};
