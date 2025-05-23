import React from 'react';
import { ProfileIcon } from '../../../Icon/Icon';

import { TextField } from '../TextField';

export const LeftInput = () => {
  return (
    <TextField
      name="name"
      placeholder="Name"
      left={<ProfileIcon color="black" widthHeight={16} />}
    />
  );
};
