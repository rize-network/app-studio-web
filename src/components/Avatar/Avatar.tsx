import React from 'react';
import { AvatarProps } from './Avatar/Avatar.props';
import { useAvatarState } from './Avatar/Avatar.state';
import { AvatarView } from './Avatar/Avatar.view';
const AvatarComponent = ({ src, size, styles, fallback }: AvatarProps) => {
  const { imageError, setImageError } = useAvatarState();
  // AvatarComponent is a functional component that utilizes AvatarProps for its props definition.
  return (
    // useAvatarState is a custom hook that provides state and functionality to handle image errors.
    <AvatarView
      src={src}
      size={size}
      styles={styles}
      fallback={fallback}
      imageError={imageError}
      setImageError={setImageError}
    />
  );
};
export const Avatar = AvatarComponent;
