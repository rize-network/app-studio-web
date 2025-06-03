import React from 'react';
import { KeywordsInputProps } from './KeywordsInput/KeywordsInput.props';
import { useKeywordsInputState } from './KeywordsInput/KeywordsInput.state';
import KeywordsInputView from './KeywordsInput/KeywordsInput.view';

/**
 * KeywordsInput Component
 *
 * A form input component for managing a list of keywords/tags.
 * Users can add keywords by typing and pressing Enter or comma,
 * and remove them by clicking the X button or using backspace.
 */
const KeywordsInputComponent: React.FC<KeywordsInputProps> = (
  props: KeywordsInputProps
) => {
  // Initialize state management with the custom hook
  const keywordsInputState = useKeywordsInputState(props);

  // Render the view component with combined props and state
  return <KeywordsInputView {...keywordsInputState} {...props} />;
};

// Export the component
export const KeywordsInput = KeywordsInputComponent;
