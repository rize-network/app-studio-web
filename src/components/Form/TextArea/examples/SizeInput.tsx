import React from 'react';
import { Vertical } from 'src/components/Layout/Vertical/examples';

import { TextArea } from '../TextArea';

export const SizeArea = () => {
  return (
    <Vertical gap={10}>
      <TextArea name="xs" placeholder="xs" size="xs" />
      <TextArea name="sm" placeholder="sm" size="sm" />
      <TextArea name="md" placeholder="md" size="md" />
      <TextArea name="lg" placeholder="lg" size="lg" />
      <TextArea name="xl" placeholder="xl" size="xl" />
    </Vertical>
  );
};
