import React from 'react';

import { PasswordProps } from './Password/Password.props';
import { usePasswordState } from './Password/Password.state';
import PasswordView from './Password/Password.view';

const PasswordComponent: React.FC<PasswordProps> = (props) => {
  const passwordState = usePasswordState();
  return <PasswordView {...passwordState} {...props} />;
};

/**
 * To allow users to securely enter sensitive information
 */
export const Password = PasswordComponent;
