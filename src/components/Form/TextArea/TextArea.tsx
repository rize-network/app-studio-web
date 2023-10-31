import React from 'react';

import { TextAreaProps } from './TextArea/TextArea.props';
import { useTextAreaState } from './TextArea/TextArea.state';
import TextAreaView from './TextArea/TextArea.view';

const TextAreaComponent: React.FC<TextAreaProps> = (props) => {
  const textAreaState = useTextAreaState(props);
  return <TextAreaView {...textAreaState} {...props} />;
};

/**
 * Text Area is an component used to create a multi-line input field.
 */
export const TextArea = TextAreaComponent;
