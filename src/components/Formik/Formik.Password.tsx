import React from 'react';

import { PasswordProps } from '../Form/Password/Password/Password.props';
import { usePasswordState } from '../Form/Password/Password/Password.state';
import { View } from 'app-studio';
import { CloseEyeSvg, OpenEyeSvg } from '../Svg';
import TextFieldView from '../Form/TextField/TextField/TextField.view';
import { useFormikInput } from './Formik.Hook';

const PasswordComponent: React.FC<PasswordProps> = ({
  visibleIcon = <OpenEyeSvg size={14} />,
  hiddenIcon = <CloseEyeSvg size={14} />,
  ...props
}) => {
  const formProps = useFormikInput(props);

  const { isVisible, setIsVisible, ...passwordProps } =
    usePasswordState(formProps);

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
export const FormikPassword = PasswordComponent;
