import React from 'react';
import { EditSvg } from 'src/components/Svg';

import { Checkbox } from '../Checkbox';

export const IconCheckbox = () => (
  <Checkbox id="child" name="child" colorScheme="theme.error" icon={<EditSvg size={14} />} label="Label" />
);
