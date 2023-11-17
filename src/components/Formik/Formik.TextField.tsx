import React from 'react';

import { TextFieldProps } from '../Form/TextField/TextField/TextField.props';
import { useTextFieldState } from '../Form/TextField/TextField/TextField.state';
import TextFieldView from '../Form/TextField/TextField/TextField.view';
import { useFormikInput } from './Formik.Hook';

const TextFieldComponent: React.FC<TextFieldProps> = (
  props: TextFieldProps
) => {
  const formProps = useFormikInput(props);
  const textFieldStates = useTextFieldState(props);

  return <TextFieldView {...textFieldStates}  {...formProps}   />;
};
/**
 * TextField is used to capture text data from users.
 */
export const TextField = TextFieldComponent;
