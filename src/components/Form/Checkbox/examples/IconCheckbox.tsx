import React from 'react';
import { EditIcon } from '../../../Icon/Icon';

import { Checkbox } from '../Checkbox';

export const IconCheckbox = () => (
  <Checkbox id="child" icon={<EditIcon widthHeight={14} />} label="Label" />
);
