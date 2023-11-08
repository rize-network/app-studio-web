import React from 'react';

import { TextFieldProps } from './TextField/TextField.props';
import { useTextFieldState } from './TextField/TextField.state';
import TextFieldView from './TextField/TextField.view';

const TextFieldComponent: React.FC<TextFieldProps> = (
  props: TextFieldProps
) => {
  const textFieldStates = useTextFieldState(props);
  return <TextFieldView {...textFieldStates} {...props} />;
};
/**
 * TextField is used to capture text data from users.
 */
export const TextField = TextFieldComponent;
