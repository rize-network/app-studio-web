import { useState } from 'react';
export const useAvatarState = () => {
// Defines and exports a custom hook named useAvatarState for managing avatar image loading state.
  const [imageError, setImageError] = useState(false);
// useState hook initializes the imageError state variable to false, indicating no error by default.
  return { imageError, setImageError };
// setImageError is a function that allows updating the imageError state to handle error scenarios when loading an image.
};
// The hook returns an object containing both the imageError state and setImageError function for external use.
