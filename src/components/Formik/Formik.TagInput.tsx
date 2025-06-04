import React from 'react';
import { TagInputProps } from '../Form/TagInput/TagInput/TagInput.props';
import { useTagInputState } from '../Form/TagInput/TagInput/TagInput.state';
import TagInputView from '../Form/TagInput/TagInput/TagInput.view';
import { useFormikInput } from './Formik.Hook';

/**
 * Formik-integrated TagInput component
 */
const TagInputComponent: React.FC<TagInputProps> = (props: TagInputProps) => {
  // Get Formik integration props
  const formProps = useFormikInput(props);

  // Get component state
  const tagInputState = useTagInputState({
    ...props,
    ...formProps,
  });

  // Separate the tags prop to avoid type conflicts
  const { tags: _, ...restProps } = props;

  // Render the view component with combined props and state
  return <TagInputView {...tagInputState} {...formProps} {...restProps} />;
};

/**
 * TagInput allows users to add and manage a list of tags.
 * Integrated with Formik for form validation and state management.
 */
export const FormikTagInput = TagInputComponent;
