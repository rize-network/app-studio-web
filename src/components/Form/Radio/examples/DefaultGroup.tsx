/**
 * Default RadioGroup Example
 */

import React from 'react';
import { Radio, RadioGroup } from '../';

export const DefaultRadioGroup = () => (
  <RadioGroup label="Select an option" name="default-group">
    <Radio value="option1" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" />
  </RadioGroup>
);
