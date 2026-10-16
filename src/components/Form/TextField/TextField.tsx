import React from 'react';
import { TextFieldProps } from './TextField/TextField.props';
import { useTextFieldState } from './TextField/TextField.state';
import TextFieldView from './TextField/TextField.view';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
const TextFieldComponent: React.FC<TextFieldProps> = (
  props: TextFieldProps
) => {
  const mergedProps = useMergedDesignSystemComponentProps('input', props);
  // Initializes the 'textFieldStates' with state-management logic and relevant properties from 'useTextFieldState' hook, passing current 'props' as the argument
  const textFieldStates = useTextFieldState(mergedProps);
  // Renders the 'TextFieldView' component with the spread attributes from both 'textFieldStates' and 'props' to pass all necessary data
  return <TextFieldView {...textFieldStates} {...mergedProps} />;
};
// Exports 'TextFieldComponent' as 'TextField' for use in other parts of the application
export const TextField = TextFieldComponent;
