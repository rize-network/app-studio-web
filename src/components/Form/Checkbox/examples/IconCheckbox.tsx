import React from 'react';
import { EditSvg } from '../../../Svg';

import { Checkbox } from '../Checkbox';

export const IconCheckbox = () => (
  <Checkbox
    id="child"
    colorScheme="theme.error"
    icon={<EditSvg size={14} />}
    label="Label"
  />
);
