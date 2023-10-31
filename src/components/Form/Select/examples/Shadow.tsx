import React from 'react';
import { Select } from '../../..';

export const ShadowSelect = () => (
  <Select
    shadow={{
      boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
    }}
    options={['Item1', 'Item2', 'Item3']}
  />
);
