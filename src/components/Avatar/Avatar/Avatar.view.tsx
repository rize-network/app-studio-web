import React from 'react';
import { Text } from '../../Text/Text';
import { Center } from '../../Layout/Center/Center';
import { Image } from 'app-studio';
import { AvatarViewProps } from './Avatar.props';
import { AvatarSizeMap } from './Avatar.style';
// Declaration of the AvatarView functional component with destructured props from AvatarViewProps.
export const AvatarView = ({
  src,
  size = 'md',
  fallback = 'IM',
  styles,
  imageError,
  setImageError,
}: AvatarViewProps) => {
  // Determines the size of the avatar by mapping the size prop to the predefined AvatarSizeMap.
  const avatarSize = AvatarSizeMap[size];
  // Initiates a style object for the image with an objectFit property and spreads additional image styles if provided.
  const imageStyle: any = {
    objectFit: 'cover',
    ...(styles?.image || {}),
  };
  // Start of the JSX returned by the AvatarView component, which uses the Center component as its root element.
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
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
      {...styles?.container}
    >
      {!imageError ? (
        <Image
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
