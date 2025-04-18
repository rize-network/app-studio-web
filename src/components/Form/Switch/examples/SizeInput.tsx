import React from 'react';
import { Vertical } from 'app-studio';

import { Switch } from '../Switch';

export const SizeSwitch = () => {
  return (
    <Vertical gap={10}>
      <Switch name="xs" size="xs" isChecked />
      <Switch name="sm" size="sm" isChecked />
      <Switch name="md" size="md" isChecked />
      <Switch name="lg" size="lg" isChecked />
      <Switch name="xl" size="xl" isChecked />
    </Vertical>
  );
};
