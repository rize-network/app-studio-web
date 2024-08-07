import React from 'react';
import { Select } from '../../../Form/Select/Select';

export const ShadowSelect = () => (
  <Select
    shadow={{
      boxShadow:
        'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
    }}
    options={[
      { label: 'Item1', value: '1' },
      { label: 'Item2', value: '2' },
      { label: 'Item3', value: '3' },
    ]}
  />
);
