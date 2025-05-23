import React from 'react';

import { PasswordProps } from '../Form/Password/Password/Password.props';
import { usePasswordState } from '../Form/Password/Password/Password.state';
import { View } from 'app-studio';
import { CloseEyeIcon, OpenEyeIcon } from '../Icon/Icon';
import TextFieldView from '../Form/TextField/TextField/TextField.view';
import { useFormikInput } from './Formik.Hook';

const PasswordComponent: React.FC<PasswordProps> = ({
  visibleIcon = <OpenEyeIcon widthHeight={14} />,
  hiddenIcon = <CloseEyeIcon widthHeight={14} />,
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
      right={
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
