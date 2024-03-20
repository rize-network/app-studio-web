import { useState } from 'react';

export const useAvatarState = () => {
  const [imageError, setImageError] = useState(false);

  return { imageError, setImageError };
};
