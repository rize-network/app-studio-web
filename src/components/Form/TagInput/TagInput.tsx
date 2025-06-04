import React from 'react';
import { useTagInputState } from './TagInput/TagInput.state';
import { TagInputProps } from './TagInput/TagInput.props';
import TagInputView from './TagInput/TagInput.view';

/**
 * TagInput Component
 *
 * A form input component for managing a list of tags.
 * Users can add tags by typing and pressing Enter or comma,
 * and remove them by clicking the X button or using backspace.
 */
const TagInputComponent: React.FC<TagInputProps> = (props: TagInputProps) => {
  // Initialize state management with the custom hook
  const tagInputState = useTagInputState(props);

  // Separate the tags prop to avoid type conflicts
  const { tags: _, ...restProps } = props;

  // Render the view component with combined props and state
  return <TagInputView {...tagInputState} {...restProps} />;
};

// Export the component
export const TagInput = TagInputComponent;
