import React from 'react';
import { Selector } from '../Selector';

export const ColoredSelector = () => (
  <Selector
    label="Priority"
    options={[
      { label: 'Low', value: 'low', color: 'color-green-500' },
      { label: 'Medium', value: 'medium', color: 'color-orange-500' },
      { label: 'High', value: 'high', color: 'color-red-500' },
    ]}
  />
);
