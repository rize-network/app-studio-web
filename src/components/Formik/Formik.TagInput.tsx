import React, { useCallback } from 'react';
import { useFormikContext, getIn } from 'formik';
import { TagInputProps } from '../Form/TagInput/TagInput/TagInput.props';
import { useTagInputState } from '../Form/TagInput/TagInput/TagInput.state';
import TagInputView from '../Form/TagInput/TagInput/TagInput.view';

/**
 * Formik-integrated TagInput component
 */
const TagInputComponent: React.FC<TagInputProps & { name: string }> = (
  props: TagInputProps & { name: string }
) => {
  const { name, ...restProps } = props;

  // Get Formik context directly for better control
  const {
    values,
    errors,
    touched,
    submitCount,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext();

  // Get current field value and error state
  const value = getIn(values, name) || [];
  const error =
    getIn(touched, name) || submitCount > 0 ? getIn(errors, name) : undefined;

  // Handle tags change with clean data
  const handleTagsChange = useCallback(
    (tags: string[]) => {
      // Ensure we only pass clean string arrays to Formik
      const cleanTags = Array.isArray(tags)
        ? tags.filter((tag) => typeof tag === 'string')
        : [];
      setFieldValue(name, cleanTags);
      props.onTagsChange?.(cleanTags);
    },
    [name, setFieldValue, props.onTagsChange]
  );

  // Handle blur to mark field as touched
  const handleBlur = useCallback(() => {
    setFieldTouched(name, true);
    props.onBlur?.();
  }, [name, setFieldTouched, props.onBlur]);

  // Get component state with Formik-controlled tags
  const tagInputState = useTagInputState({
    ...restProps,
    tags: value,
    onTagsChange: handleTagsChange,
    onBlur: handleBlur,
  });

  // Separate tags from tagInputState to avoid type conflicts
  const { tags, ...stateWithoutTags } = tagInputState;

  // Render the view component with combined props and state
  return (
    <TagInputView
      {...stateWithoutTags}
      {...restProps}
      tags={tags}
      error={error}
    />
  );
};

/**
 * TagInput allows users to add and manage a list of tags.
 * Integrated with Formik for form validation and state management.
 */
export const FormikTagInput = TagInputComponent;
