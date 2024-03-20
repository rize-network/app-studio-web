import React from 'react';
import { Text } from '../../Text/Text';
import { Center } from '../../Layout/Center/Center';
import { Image } from 'app-studio';
import { AvatarViewProps } from './Avatar.props';
import { AvatarSizeMap } from './Avatar.style';
// Define the functional component 'AvatarView' which takes 'AvatarViewProps' as props.
export const AvatarView = ({
  // Destructure properties from 'AvatarViewProps', including source 'src', 'size' with default 'md', 'fallback' text, custom 'styles', and error states for the image.
  src,
  size = 'md',
  fallback = 'IM',
  styles,
  imageError,
  // Dynamically set the imageStyle to have 'objectFit: cover' and merge any 'image' styles passed through the 'styles' prop.
  setImageError,
}: AvatarViewProps) => {
  // The component returns a 'Center' layout component styled as an avatar with conditional styling based on 'imageError' state.
  const avatarSize = AvatarSizeMap[size];
  const imageStyle: any = {
    objectFit: 'cover',
    ...(styles?.image || {}),
  };
  // If 'imageError' is false, an 'Image' component is rendered, otherwise a 'Text' component is used as a fallback display.
  return (
    <Center
      // The 'Image' component includes an onError handler to update the 'imageError' state when the image fails to load.
      role="avatar"
      width={avatarSize}
      height={avatarSize}
      borderRadius="50%"
      overflow="hidden"
      // The 'Text' component displays the fallback text (e.g., initials) when the image cannot be displayed.
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
