import React from 'react';
import { EditIcon } from '../../../Icon/Icon';

import { TextField } from '../TextField';

export const RightInput = () => {
  return (
    <TextField
      name="name"
      placeholder="Name"
      rightChild={<EditIcon color="black" size={16} />}
    />
  );
};
