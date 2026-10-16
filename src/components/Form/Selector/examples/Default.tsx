import React from 'react';
import { Selector } from '../Selector';

export const DefaultSelector = () => (
  <Selector
    label="Plan"
    options={[
      { label: 'Free', value: 'free' },
      { label: 'Pro', value: 'pro' },
      { label: 'Enterprise', value: 'enterprise' },
    ]}
  />
);
