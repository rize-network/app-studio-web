import React from 'react';
import { Center, Text } from 'src/components';
// import { Image } from 'app-studio';
import { AvatarViewProps } from './Avatar.props';
import { AvatarSizeMap } from './Avatar.style';

export const AvatarView = ({
  src,
  size = 'md',
  fallback = 'IM',
  styles,
  imageError,
  setImageError,
}: AvatarViewProps) => {
  const avatarSize = AvatarSizeMap[size];

  const imageStyle: any = {
    objectFit: 'cover',
    ...(styles?.image || {}),
  };

  return (
    <Center
      role="avatar"
      width={avatarSize}
      height={avatarSize}
      borderRadius="50%"
      overflow="hidden"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={imageError ? 'black' : 'transparent'}
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)" // Add shadow effect
      {...styles?.container}
    >
      {!imageError ? (
        <img
          alt="IM"
          src={src}
          style={imageStyle}
          width={avatarSize}
          height={avatarSize}
          onError={() => setImageError(true)}
        />
      ) : (
        <Text size={size} {...styles?.fallback}>
          {fallback}
        </Text>
      )}
    </Center>
  );
};
