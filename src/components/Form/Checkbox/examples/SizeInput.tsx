import React from 'react';
import { Vertical } from 'app-studio';

import { Checkbox } from '../Checkbox';

export const SizeCheckbox = () => (
  <Vertical gap={10}>
    <Checkbox size="sm" label="sm" defaultIsSelected />
    <Checkbox size="md" label="md" defaultIsSelected />
    <Checkbox size="lg" label="lg" defaultIsSelected />
    <Checkbox size="xl" label="xl" defaultIsSelected />
  </Vertical>
);
