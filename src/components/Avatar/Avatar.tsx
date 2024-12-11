import React from 'react';
import { AvatarProps } from './Avatar/Avatar.props';
import { useAvatarState } from './Avatar/Avatar.state';
import { AvatarView } from './Avatar/Avatar.view';

// Defines the AvatarComponent functional component with destructured props from AvatarProps type.
const AvatarComponent = ({
  src,
  size,
  styles,
  fallback,
  onClick,
}: AvatarProps) => {
  // Uses custom hook useAvatarState to manage the avatar image loading error state.
  const { imageError, setImageError } = useAvatarState();
  // Begins the JSX return block for rendering the AvatarView component.
  return (
    <AvatarView
      src={src}
      size={size}
      styles={styles}
      fallback={fallback}
      imageError={imageError}
      setImageError={setImageError}
      onClick={onClick}
    />
  );
  // AvatarComponent is a functional component that wraps the AvatarView with added state logic.
};
// Exports the AvatarComponent as Avatar for use in other parts of the application.
export const Avatar = AvatarComponent;
