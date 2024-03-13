import React from 'react';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';

import { TextArea } from '../TextArea';

export const ColorArea = () => {
  return (
    <Vertical gap={10}>
      <TextArea name="surname" label="Surname" colorScheme="theme.secondary" />
      <TextArea
        name="name"
        label="Name"
        colorScheme="theme.primary"
        variant="outline"
      />
    </Vertical>
  );
};
