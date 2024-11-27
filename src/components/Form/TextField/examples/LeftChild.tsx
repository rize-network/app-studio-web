import React from 'react';
import { ProfileIcon } from '../../../Icon/Icon';

import { TextField } from '../TextField';

export const LeftInput = () => {
  return (
    <TextField
      name="name"
      placeholder="Name"
      leftChild={<ProfileIcon color="black" size={16} />}
    />
  );
};
