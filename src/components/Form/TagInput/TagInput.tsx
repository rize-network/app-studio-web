import React from 'react';
import { useTagInputState } from './TagInput/TagInput.state';
import { TagInputProps } from './TagInput/TagInput.props';
import TagInputView from './TagInput/TagInput.view';
// This file defines the main TagInput component, integrating its state management logic with the presentational view component.
const TagInputComponent: React.FC<TagInputProps> = (props: TagInputProps) => {
  const tagInputState = useTagInputState(props);
  const { tags: _, ...restProps } = props;
  // `setTags` is internal state-hook machinery: it is deliberately not part of
  // `TagInputViewProps`, so keep it off the view (and therefore off the DOM).
  const { setTags: _setTags, ...viewState } = tagInputState;
  return <TagInputView {...viewState} {...restProps} />;
};
export const TagInput = TagInputComponent;
