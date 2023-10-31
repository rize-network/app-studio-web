import React from 'react';

import { Select } from '../../../Form/Select/Select';

export const MultiSelect = () => (
  <Select options={['Item1', 'Item2', 'Item3']} placeholder="Select an item.." isMulti />
);
