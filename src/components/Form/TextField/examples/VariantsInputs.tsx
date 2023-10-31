import React from 'react';
import { TextField } from 'src/components';
import { Vertical } from 'src/components/Layout/Vertical/examples';

import { Variant } from '../TextField/TextField.type';

export const VariantsInput = () => {
  return (
    <Vertical gap={10} width="300px">
      {['default', 'outline', 'unStyled'].map((variant, index) => (
        <TextField key={index} name={variant} placeholder={variant} variant={variant as Variant} />
      ))}
    </Vertical>
  );
};
