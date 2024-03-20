import React from 'react';
import { ProfileSvg } from '../../../Svg';

import { TextField } from '../TextField';

export const LeftInput = () => {
  return (
    <TextField
      name="name"
      placeholder="Name"
      leftChild={<ProfileSvg color="black" size={16} />}
    />
  );
};
