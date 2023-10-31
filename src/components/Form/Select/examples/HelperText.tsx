import React from 'react';

import { Select } from '../Select';

export const HelperTextSelect = () => (
  <Select options={['Item1', 'Item2', 'Item3']} helperText="select one item!" error />
);
