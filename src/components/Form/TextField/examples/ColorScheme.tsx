import React from 'react';
import { Vertical } from 'app-studio';

import { TextField } from '../TextField';

export const ColorSchemeDemo = () => {
  return (
    <Vertical gap={10} width="300px">
      <TextField name="surname" label="Surname" />
      <TextField name="name" label="Name" variant="outline" />
    </Vertical>
  );
};
