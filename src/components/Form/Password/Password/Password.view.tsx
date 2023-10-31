import React from 'react';
import { TextField, View } from 'src/components';

import { PasswordViewProps } from './Password.props';

const PasswordView: React.FC<PasswordViewProps> = ({
  name,
  visibleIcon,
  hiddenIcon,
  isDisabled = false,
  isVisible = false,
  setIsVisible = () => {},
  ...props
}) => (
  <TextField
    name={name}
    type={isVisible ? 'text' : 'password'}
    rightChild={
      <View
        onClick={() => {
          if (!isDisabled) setIsVisible(!isVisible);
        }}
      >
        {isVisible ? visibleIcon : hiddenIcon}
      </View>
    }
    isClearable={false}
    {...props}
  />
);

export default PasswordView;
