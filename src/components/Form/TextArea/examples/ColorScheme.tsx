import React from 'react';
import { Vertical } from 'app-studio';

import { TextArea } from '../TextArea';

export const ColorArea = () => {
  return (
    <Vertical gap={10}>
      <TextArea name="surname" label="Surname" />
      <TextArea name="name" label="Name" variant="outline" />
    </Vertical>
  );
};
