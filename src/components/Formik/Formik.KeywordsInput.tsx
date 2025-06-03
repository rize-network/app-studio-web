import React from 'react';
import { KeywordsInputProps } from '../Form/KeywordsInput/KeywordsInput/KeywordsInput.props';
import { useKeywordsInputState } from '../Form/KeywordsInput/KeywordsInput/KeywordsInput.state';
import KeywordsInputView from '../Form/KeywordsInput/KeywordsInput/KeywordsInput.view';
import { useFormikInput } from './Formik.Hook';

/**
 * Formik-integrated KeywordsInput component
 */
const KeywordsInputComponent: React.FC<KeywordsInputProps> = (
  props: KeywordsInputProps
) => {
  // Get Formik integration props
  const formProps = useFormikInput(props);

  // Get component state
  const keywordsInputState = useKeywordsInputState({
    ...props,
    ...formProps,
  });

  // Render the view component with combined props and state
  return (
    <KeywordsInputView {...keywordsInputState} {...formProps} {...props} />
  );
};

/**
 * KeywordsInput allows users to add and manage a list of keywords/tags.
 * Integrated with Formik for form validation and state management.
 */
export const FormikKeywordsInput = KeywordsInputComponent;
