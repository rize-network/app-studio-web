import React from 'react';
import { TextAreaProps } from './TextArea/TextArea.props';
import { useTextAreaState } from './TextArea/TextArea.state';
import TextAreaView from './TextArea/TextArea.view';
// Defines the TextAreaComponent as a functional component that accepts TextAreaProps for type safety and structure.
const TextAreaComponent: React.FC<TextAreaProps> = (props) => {
// Creates a state for the TextAreaComponent using custom hook useTextAreaState which initializes the state with props.
  const textAreaState = useTextAreaState(props);
// Renders the TextAreaView component, passing along the state and any received props.
  return <TextAreaView {...textAreaState} {...props} />;
};
// Exports the TextAreaComponent as TextArea for use in other parts of the application.
export const TextArea = TextAreaComponent;
