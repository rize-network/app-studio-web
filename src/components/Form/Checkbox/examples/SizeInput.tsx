import React from 'react';
import { Vertical } from '../../../Layout/Vertical/examples';

import { Checkbox } from '../Checkbox';

export const SizeCheckbox = () => (
  <Vertical gap={10}>
    <Checkbox size="sm" label="sm" defaultIsSelected />
    <Checkbox size="md" label="md" defaultIsSelected />
    <Checkbox size="lg" label="lg" defaultIsSelected />
    <Checkbox size="xl" label="xl" defaultIsSelected />
    <Checkbox size="2xl" label="2xl" defaultIsSelected />
    <Checkbox size="3xl" label="3xl" defaultIsSelected />
    <Checkbox size="4xl" label="4xl" defaultIsSelected />
    <Checkbox size="5xl" label="5xl" defaultIsSelected />
    <Checkbox size="6xl" label="6xl" defaultIsSelected />
  </Vertical>
);
