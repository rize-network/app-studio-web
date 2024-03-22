import { useState } from 'react';
export const useAvatarState = () => {
// Define the `useAvatarState` custom hook that manages avatar image error state.
  const [imageError, setImageError] = useState(false);
// `setImageError` is a function that allows updating the value of `imageError`.
// Initialize a state variable `imageError` with a default value of `false`. This will track if there is an error with the avatar image loading.
  return { imageError, setImageError };
// Return an object containing the `imageError` state and the `setImageError` function to manipulate the state, which can be used in components that require handling avatar image errors.
};
