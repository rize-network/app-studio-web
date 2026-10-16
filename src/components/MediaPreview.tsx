import React from 'react';
import { View, Image } from 'app-studio';
import { FileIcon } from './Icon/Icon';

export interface MediaPreviewProps {
  url: string;
  type: string; // mime type or generic 'image' | 'video' | 'audio'
  name?: string;
  onOpen?: () => void;
}

/**
 * MediaPreview renders a square thumbnail for image, video or audio files.
 * It falls back to a file icon for unsupported types. Clicking the preview
 * opens the original file unless the user interacts with playback controls.
 */
export const MediaPreview: React.FC<MediaPreviewProps> = ({
  url,
  type,
  name,
  onOpen,
}) => {
  const lowerType = type.toLowerCase();
  const isImage = lowerType.startsWith('image');
  const isVideo = lowerType.startsWith('video');
  const isAudio = lowerType.startsWith('audio');

  const handleClick = () => {
    if (onOpen) {
      onOpen();
    }
  };

  return (
    <View
      width="60px"
      height="60px"
      flexShrink={0}
      borderRadius="4px"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="color-gray-200"
      cursor="pointer"
      onClick={handleClick}
    >
      {isImage && (
        <Image
          src={url}
          alt={name}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      )}

      {isVideo && (
        <View
          as="video"
          src={url}
          controls
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {isAudio && (
        <View
          as="audio"
          controls
          src={url}
          width="100%"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {!isImage && !isVideo && !isAudio && (
        <FileIcon widthHeight={24} color="color-gray-600" />
      )}
    </View>
  );
};

export default MediaPreview;
