/**
 * Avatar View Component
 *
 * Renders an avatar with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Text } from '../../Text/Text';
import { Center } from '../../Layout/Center/Center';
import { Image } from 'app-studio';
import { AvatarViewProps } from './Avatar.props';
import { AvatarSizeMap, DefaultAvatarStyles } from './Avatar.style';
// Declaration of the AvatarView functional component with destructured props from AvatarViewProps.
export const AvatarView = ({
  src,
  size = 'md',
  fallback = 'IM',
  views,
  imageError,
  setImageError,
  onClick = () => {},
}: AvatarViewProps) => {
  // Determines the size of the avatar by mapping the size prop to the predefined AvatarSizeMap.
  const avatarSize = AvatarSizeMap[size];
  // Combine default image styles with custom styles
  const imageStyle: any = {
    ...DefaultAvatarStyles.image,
    ...(views?.image || {}),
  };
  // Start of the JSX returned by the AvatarView component, which uses the Center component as its root element.
  return (
    <Center
      role="avatar"
      width={avatarSize}
      height={avatarSize}
      {...DefaultAvatarStyles.container}
      borderColor={imageError ? 'color.gray.400' : 'transparent'}
      onClick={onClick}
      {...views?.container}
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
        <Text
          size={size}
          {...DefaultAvatarStyles.fallback}
          {...views?.fallback}
        >
          {fallback}
        </Text>
      )}
    </Center>
  );
};
