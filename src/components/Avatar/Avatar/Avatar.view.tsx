/**
 * Avatar View Component
 *
 * Renders an avatar with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Text } from 'app-studio';
import { Center } from 'app-studio';
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
  children,
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
      // `data-role`: "avatar" is not an ARIA role and failed axe's aria-roles
      // rule (critical) on every consumer screen. The naming, when needed,
      // belongs to the consumer (e.g. a wrapping element with role="img").
      data-role="avatar"
      width={avatarSize}
      height={avatarSize}
      {...DefaultAvatarStyles.container}
      borderColor={imageError ? 'color-gray-400' : 'transparent'}
      onClick={onClick}
      {...views?.container}
    >
      {!imageError && src ? (
        <Image
          // Empty alt: the image is presentational here — the consumer names
          // the avatar (tooltip, wrapping role="img", adjacent text). "IM"
          // was a junk name screen readers announced verbatim.
          alt=""
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
      {children}
    </Center>
  );
};
