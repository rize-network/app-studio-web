import React from 'react';
import { Checkbox } from 'src/components';

export const ShadowCheckbox = () => (
  <Checkbox
    id="shadowCheckbox"
    name="shadowCheckbox"
    shadow={{ boxShadow: 'rgb(249, 115, 22) 0px 4px 14px 0px' }}
    defaultIsSelected
  />
);
