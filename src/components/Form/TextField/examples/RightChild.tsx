import React from 'react';
import { EditIcon } from '../../../Icon/Icon';

import { TextField } from '../TextField';

export const RightInput = () => {
  return (
    <TextField
      name="name"
      placeholder="Name"
      right={<EditIcon color="black" widthHeight={16} />}
    />
  );
};
