import React from 'react';
import { Checkbox } from '../../../Form/Checkbox/Checkbox';

export const ShadowCheckbox = () => (
  <Checkbox
    id="shadowCheckbox"
    shadow={{ boxShadow: 'rgb(249, 115, 22) 0px 4px 14px 0px' }}
    defaultIsSelected
  />
);
