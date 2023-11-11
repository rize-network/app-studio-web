import React from 'react';

import { PasswordProps } from './Password/Password.props';
import { usePasswordState } from './Password/Password.state';
import { View } from 'app-studio';
import { CloseEyeSvg, OpenEyeSvg } from '../../Svg';
import TextFieldView from '../TextField/TextField/TextField.view';

const PasswordComponent: React.FC<PasswordProps> = ({
  visibleIcon = <OpenEyeSvg size={14} />,
  hiddenIcon = <CloseEyeSvg size={14} />,
  ...props
}) => {
  const { isVisible, setIsVisible, ...passwordState } = usePasswordState(props);
  return (
    <TextFieldView
      {...props}
      {...passwordState}
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
