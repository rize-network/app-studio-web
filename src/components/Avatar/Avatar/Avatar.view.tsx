import React from 'react';
import { Text } from '../../Text/Text';
import { Center } from '../../Layout/Center/Center';
import { Image } from 'app-studio';
import { AvatarViewProps } from './Avatar.props';
import { AvatarSizeMap } from './Avatar.style';
export const AvatarView = ({
// AvatarView is a functional React component that is exported for use in other parts of the application.
  src,
// The component takes an object of props defined by AvatarViewProps interface.
  size = 'md',
  fallback = 'IM',
// Assigns a default 'md' if no size prop is provided when the component is used.
  styles,
// Uses a default fallback text 'IM' when no fallback prop is provided or in case of an image load error.
  imageError,
// styles is an optional prop for custom styling, used by spreading its properties into inline styles where applicable.
  setImageError,
// imageError is a state hook, initially false, that when true, changes the borderColor prop and conditionally renders the Text component.
}: AvatarViewProps) => {
// setImageError is a function that is called to set the imageError state to true when an image fails to load.
  const avatarSize = AvatarSizeMap[size];
  const imageStyle: any = {
// Maps the size prop to a specific set of width and height values defined in AvatarSizeMap.
    objectFit: 'cover',
// Defines inline styles for how the image should be displayed using the CSS object-fit property and merges with optional image styles from props.
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
// Uses a 'Center' layout component to provide a centered and circular frame for the avatar.
      borderStyle="solid"
// Uses ARIA role 'avatar' to improve accessibility by semantically defining the purpose of the element.
      borderColor={imageError ? 'black' : 'transparent'}
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
      {...styles?.container}
    >
      {!imageError ? (
// Conditionally applies a black border color if the image has failed to load.
        <Image
          alt="IM"
// Spreads any container-style props if provided for custom styling the Center component.
          src={src}
// Conditionally renders the Image component if there's no image load error.
          style={imageStyle}
          width={avatarSize}
// Sets alt text for the Image component which is useful for accessibility and when the image cannot be displayed.
          height={avatarSize}
          onError={() => setImageError(true)}
// Applies the calculated size and inline styles to the Image component.
        />
// The onError callback updates the imageError state, triggering a UI update to display fallback content.
      ) : (
        <Text size={size} {...styles?.fallback}>
// Conditionally renders the Text component if the image fails to load, displaying a fallback text.
          {fallback}
// Applies a custom size to the Text component based on the 'size' prop allowing for scalable text size.
        </Text>
// Spreads any fallback-style props if provided for custom styling the Text component when it's rendered as a fallback.
      )}
    </Center>
  );
};
