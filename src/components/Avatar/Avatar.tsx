import React from 'react';
import { AvatarProps } from './Avatar/Avatar.props';
import { useAvatarState } from './Avatar/Avatar.state';
import { AvatarView } from './Avatar/Avatar.view';

const AvatarComponent = ({ src, size, styles, fallback }: AvatarProps) => {
  const { imageError, setImageError } = useAvatarState();
  return (
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
