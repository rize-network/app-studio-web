import React from 'react';
import { Vertical } from '../../../Layout/Vertical/examples';

import { TextField } from '../TextField';

export const ClearInput = () => {
  return (
    <Vertical gap={10} width="300px">
      <TextField value="Clear Button" size="xs" />
      <TextField size="xs" value="No Clear Button" isClearable={false} />
    </Vertical>
  );
};
