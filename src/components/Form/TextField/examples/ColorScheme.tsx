import React from 'react';
import { Vertical } from '../../../Layout/Vertical/examples';

import { TextField } from '../TextField';

export const ColorInput = () => {
  return (
    <Vertical gap={10} width="300px">
      <TextField name="surname" label="Surname" colorScheme="theme.secondary" />
      <TextField name="name" label="Name" colorScheme="theme.primary" variant="outline" />
    </Vertical>
  );
};
