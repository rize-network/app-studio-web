import React from 'react';
import { TextField } from '../../../Form/TextField/TextField';
import { View } from '../../../Layout/View/View';

import { PasswordViewProps } from './Password.props';
import { CloseEyeSvg, OpenEyeSvg } from 'src/components/Svg';

const PasswordView: React.FC<PasswordViewProps> = ({
  name,
  visibleIcon = <OpenEyeSvg size={14} />,
  hiddenIcon = <CloseEyeSvg size={14} />,
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
