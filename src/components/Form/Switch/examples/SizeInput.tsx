import React from 'react';
import { Vertical } from '../../../Layout/Vertical/Vertical';

import { Switch } from '../Switch';

export const SizeSwitch = () => {
  return (
    <Vertical gap={10}>
      <Switch name="xs" size="xs" isChecked />
      <Switch name="sm" size="sm" isChecked />
      <Switch name="md" size="md" isChecked />
      <Switch name="lg" size="lg" isChecked />
      <Switch name="xl" size="xl" isChecked />
      <Switch name="2xl" size="2xl" isChecked />
      <Switch name="3xl" size="3xl" isChecked />
      <Switch name="4xl" size="4xl" isChecked />
      <Switch name="5xl" size="5xl" isChecked />
      <Switch name="6xl" size="6xl" isChecked />
    </Vertical>
  );
};
