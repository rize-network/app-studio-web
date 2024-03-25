import { useState } from 'react';
// Defines a state hook for managing avatar image error status, initialized as false.
export const useAvatarState = () => {
  const [imageError, setImageError] = useState(false);
  // Provides an object containing the image error state and its setter function.
  return { imageError, setImageError };
};
