import React, { useState } from 'react';
import { TextField } from '../../../Form/TextField/TextField';
import { View } from '../../../Layout/View/View';

import { PasswordViewProps } from './Password.props';
import { CloseEyeSvg, OpenEyeSvg } from '../../../Svg';

const PasswordView: React.FC<PasswordViewProps> = ({
  name,
  visibleIcon = <OpenEyeSvg size={14} />,
  hiddenIcon = <CloseEyeSvg size={14} />,
  isDisabled = false,
  isVisible = false,
  ...props
}) => {
  const [visible, setVisible] = useState(isVisible);
  return (
    <TextField
      name={name}
      type={visible ? 'text' : 'password'}
      rightChild={
        <View
          onClick={() => {
            if (!isDisabled) {
              setVisible(!visible);
            }
          }}
        >
          {visible ? visibleIcon : hiddenIcon}
        </View>
      }
      isClearable={false}
      {...props}
    />
  );
};

export default PasswordView;
