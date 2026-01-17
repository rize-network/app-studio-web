import React, { useCallback } from 'react';
import { Vertical, View, Image, Center, Button } from 'app-studio';
import { FileIcon, AudioIcon } from '../Icon/Icon';
import { HoverCard } from '../HoverCard/HoverCard';
import { Text } from 'app-studio';

interface AttachmentPreviewProps {
  files: Array<{ name: string; size: number; type: string; url?: string }>;
  onRemove?: (index: number) => void;
  maxHeight?: string;
  views?: {
    container?: any;
    item?: any;
    name?: any;
    removeButton?: any;
  };
}

export const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
  files,
  onRemove,
  maxHeight = '120px',
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
        const previewUrl = file.url || '';
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
            backgroundColor="color-gray-100"
            position="relative"
            animate={{
              from: { opacity: 0, scale: 0.9 },
              to: { opacity: 1, scale: 1 },
            }}
            animationDuration={0.2}
            {...views?.item}
          >
            <HoverCard>
              <HoverCard.Trigger>
                <View position="relative">
                  {isImage && previewUrl && (
                    <Image
                      src={previewUrl}
                      alt={file.name}
                      width="60px"
                      height="60px"
                      objectFit="cover"
                      borderRadius="4px"
                    />
                  )}
                  {isVideo && previewUrl && (
                    <View
                      as="video"
                      src={previewUrl}
                      alt={file.name}
                      controls={false}
                      muted={true}
                      width="60px"
                      height="60px"
                      objectFit="cover"
                      borderRadius="4px"
                    />
                  )}
                  {isAudio && (
                    <Center
                      width="60px"
                      height="60px"
                      backgroundColor="color-gray-200"
                      borderRadius="4px"
                    >
                      <AudioIcon widthHeight={24} color="color-black" />
                    </Center>
                  )}
                  {!isImage && !isVideo && !isAudio && (
                    <Center
                      width="60px"
                      height="60px"
                      backgroundColor="color-gray-200"
                      borderRadius="4px"
                    >
                      <FileIcon widthHeight={24} color="color-black" />
                    </Center>
                  )}

                  {onRemove && (
                    <Button
                      position="absolute"
                      top="-4px"
                      right="-4px"
                      width="20px"
                      height="20px"
                      minWidth="20px"
                      minHeight="20px"
                      borderRadius="50%"
                      backgroundColor="color-red-500"
                      color="white"
                      fontSize={14}
                      fontWeight="bold"
                      padding={0}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      border="2px solid white"
                      _hover={{
                        backgroundColor: 'color-red-600',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(index);
                      }}
                      aria-label={`Remove ${file.name}`}
                    >
                      ×
                    </Button>
                  )}
                </View>
              </HoverCard.Trigger>
              <HoverCard.Content>
                {isImage && previewUrl && (
                  <Image src={previewUrl} alt={file.name} maxWidth="300px" />
                )}
                {isVideo && previewUrl && (
                  <View as="video" src={previewUrl} controls maxWidth="300px" />
                )}
                {isAudio && previewUrl && (
                  <View as="audio" src={previewUrl} controls width={'100%'} />
                )}
                <Text
                  marginTop="4px"
                  truncateText={true}
                  textOverflow="ellipsis"
                  overflow="hidden"
                  width={'100%'}
                  fontSize={12}
                  {...views?.name}
                >
                  {file.name} ({formatFileSize(file.size)})
                </Text>
              </HoverCard.Content>
            </HoverCard>
          </Vertical>
        );
      })}
    </View>
  );
};
