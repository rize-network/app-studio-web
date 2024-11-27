import React from 'react';
import { EditIcon } from '../../../Icon/Icon';

import { Checkbox } from '../Checkbox';

export const IconCheckbox = () => (
  <Checkbox
    id="child"
    colorScheme="theme.error"
    icon={<EditIcon size={14} />}
    label="Label"
  />
);
