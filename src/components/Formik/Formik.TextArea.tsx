import React from 'react';

import { TextAreaProps } from '../Form/TextArea/TextArea/TextArea.props';
import { useTextAreaState } from '../Form/TextArea/TextArea/TextArea.state';
import TextAreaView from '../Form/TextArea/TextArea/TextArea.view';
import { useFormikInput } from './Formik.Hook';

const TextAreaComponent: React.FC<TextAreaProps> = (props) => {
  const formProps = useFormikInput(props);
  const textAreaState = useTextAreaState(props);
  return <TextAreaView {...textAreaState} {...formProps} />;
};

/**
 * Text Area is an component used to create a multi-line input field.
 */
export const TextArea = TextAreaComponent;
