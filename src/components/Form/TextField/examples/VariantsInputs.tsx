import React from 'react';
import { TextField } from '../../../Form/TextField/TextField';

import { Vertical } from '../../../Layout/Vertical/Vertical';

import { Variant } from '../TextField/TextField.type';

export const VariantsInput = () => {
  return (
    <Vertical gap={10} width="300px">
      {['default', 'outline', 'none'].map((variant, index) => (
        <TextField
          key={index}
          name={variant}
          placeholder={variant}
          variant={variant as Variant}
        />
      ))}
    </Vertical>
  );
};
