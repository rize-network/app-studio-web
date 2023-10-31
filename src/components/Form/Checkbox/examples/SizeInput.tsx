import React from 'react';
import { Vertical } from '../../../Layout/Vertical/examples';

import { Checkbox } from '../Checkbox';

export const SizeCheckbox = () => (
  <Vertical gap={10}>
    <Checkbox name="sm" size="sm" label="sm" defaultIsSelected />
    <Checkbox name="md" size="md" label="md" defaultIsSelected />
    <Checkbox name="lg" size="lg" label="lg" defaultIsSelected />
    <Checkbox name="xl" size="xl" label="xl" defaultIsSelected />
    <Checkbox name="2xl" size="2xl" label="2xl" defaultIsSelected />
    <Checkbox name="3xl" size="3xl" label="3xl" defaultIsSelected />
    <Checkbox name="4xl" size="4xl" label="4xl" defaultIsSelected />
    <Checkbox name="5xl" size="5xl" label="5xl" defaultIsSelected />
    <Checkbox name="6xl" size="6xl" label="6xl" defaultIsSelected />
  </Vertical>
);
