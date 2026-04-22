import React, { useCallback } from 'react';
import { Vertical, View, Image, Center, Button, Horizontal } from 'app-studio';
import { FileIcon, AudioIcon } from '../../Icon/Icon';
import { HoverCard } from '../../HoverCard/HoverCard';
import { Text } from 'app-studio';

// Default styles extracted from ChatInput.style
const defaultRemoveButtonStyles: any = {
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  border: 'none',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '12px',
  zIndex: 10,
  _hover: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

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

  const getAttachmentAccent = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      return { backgroundColor: '#DBEAFE', color: '#2563EB' };
    }
    if (file.type.startsWith('video/')) {
      return { backgroundColor: '#EDE9FE', color: '#7C3AED' };
    }
    if (file.type.startsWith('audio/')) {
      return { backgroundColor: '#DCFCE7', color: '#16A34A' };
    }
    return { backgroundColor: '#E2E8F0', color: '#475569' };
  }, []);

  return (
    <View
      display="flex"
      flexWrap="wrap"
      gap="8px"
      padding="8px 0"
      maxHeight={maxHeight}
      overflowY="auto"
      {...views?.container}
    >
      {files.map((file, index) => {
        const previewUrl =
          (file as any)?.path ||
          (file as any)?.url ||
          (showPreviews ? URL.createObjectURL(file) : '');
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        const isAudio = file.type.startsWith('audio/');
        const accent = getAttachmentAccent(file);

        if (!showPreviews) {
          return (
            <Horizontal
              key={index}
              alignItems="center"
              gap="8px"
              padding="6px 10px 6px 8px"
              borderRadius="9999px"
              border="1px solid #E2E8F0"
              backgroundColor="color-white"
              maxWidth="100%"
              animate={{
                from: { opacity: 0, scale: 0.96 },
                to: { opacity: 1, scale: 1 },
              }}
              animationDuration={0.2}
              {...views?.item}
            >
              <Center
                width="22px"
                height="22px"
                minWidth="22px"
                borderRadius="9999px"
                backgroundColor={accent.backgroundColor}
                color={accent.color}
              >
                {isAudio ? (
                  <AudioIcon widthHeight={12} color="currentColor" />
                ) : (
                  <FileIcon widthHeight={12} color="currentColor" />
                )}
              </Center>
              <Text
                fontSize="12px"
                lineHeight="16px"
                color="color-gray-600"
                truncateText={true}
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                maxWidth="220px"
                {...views?.name}
              >
                {file.name} · {formatFileSize(file.size)}
              </Text>
              {onRemove && (
                <View
                  as="button"
                  type="button"
                  onClick={() => onRemove(index)}
                  aria-label={`Remove ${file.name}`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="16px"
                  height="16px"
                  minWidth="16px"
                  border="none"
                  backgroundColor="transparent"
                  color="color-gray-400"
                  padding={0}
                  cursor="pointer"
                  transition="color 0.2s ease, opacity 0.2s ease"
                  _hover={{ color: 'color-gray-600' }}
                >
                  ×
                </View>
              )}
            </Horizontal>
          );
        }

        return (
          <Vertical
            key={index}
            alignItems="center"
            gap="6px"
            padding="6px 10px"
            borderRadius="8px"
            border="1px solid #E2E8F0"
            backgroundColor="color-white"
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
                      borderRadius="8px"
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
                      borderRadius="8px"
                      objectFit="cover"
                    />
                  )}
                  {isAudio && (
                    <Center
                      width="60px"
                      height="60px"
                      borderRadius="8px"
                      backgroundColor="color-gray-100"
                    >
                      <AudioIcon widthHeight={24} color="color-black" />
                    </Center>
                  )}
                  {!isImage && !isVideo && !isAudio && (
                    <Center
                      width="60px"
                      height="60px"
                      borderRadius="8px"
                      backgroundColor="color-gray-100"
                    >
                      <FileIcon widthHeight={24} color="color-black" />
                    </Center>
                  )}

                  {onRemove && (
                    <Button
                      {...defaultRemoveButtonStyles}
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
