import React from 'react';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';

import { TextField } from '../TextField';

export const SizeInput = () => {
  return (
    <Vertical gap={10} width="300px">
      <TextField name="xs" placeholder="xs" size="xs" />
      <TextField name="sm" placeholder="sm" size="xs" />
      <TextField name="md" placeholder="md" size="md" />
      <TextField name="lg" placeholder="lg" size="lg" />
      <TextField name="xl" placeholder="xl" size="md" />
    </Vertical>
  );
};
