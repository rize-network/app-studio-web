import { useState } from 'react';
import { PasswordProps } from './Password.props';
import { useTextFieldState } from '../../TextField/TextField/TextField.state';

export const usePasswordState = (props: PasswordProps) => {
  const textFieldStates = useTextFieldState(props);
  const [isVisible, setIsVisible] = useState(false);

  return { isVisible, setIsVisible, ...textFieldStates };
};
