import React from 'react';
import { Select } from '../Select';

export const ErrorSelect = () => (
  <Select id="error" name="error" error options={['Item1', 'Item2', 'Item3']} />
);
