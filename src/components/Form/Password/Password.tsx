import React from 'react';

import { PasswordProps } from './Password/Password.props';
import { usePasswordState } from './Password/Password.state';
import { View } from 'app-studio';
import { CloseEyeIcon, OpenEyeIcon } from '../../Icon/Icon';
import TextFieldView from '../TextField/TextField/TextField.view';

const PasswordComponent: React.FC<PasswordProps> = ({
  visibleIcon = <OpenEyeIcon size={14} />,
  hiddenIcon = <CloseEyeIcon size={14} />,
  ...props
}) => {
  const { isVisible, setIsVisible, ...passwordProps } = usePasswordState(props);

  return (
    <TextFieldView
      {...passwordProps}
      type={isVisible ? 'text' : 'password'}
      isClearable={false}
      rightChild={
        <View
          onClick={() => {
            if (!props.isDisabled) {
              setIsVisible(!isVisible);
            }
          }}
        >
          {isVisible ? visibleIcon : hiddenIcon}
        </View>
      }
    />
  );
};

/**
 * To allow users to securely enter sensitive information
 */
export const Password = PasswordComponent;
