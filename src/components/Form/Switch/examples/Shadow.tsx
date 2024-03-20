import React from 'react';
import { Switch } from '../../../Form/Switch/Switch';

export const ShadowSwitch = () => (
  <Switch
    id="shadowCheckbox"
    name="shadowCheckbox"
    shadow={{ boxShadow: 'rgb(249, 115, 22) 0px 4px 14px 0px' }}
    isChecked
  />
);
