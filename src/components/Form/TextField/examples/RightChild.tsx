import React from 'react';
import { EditSvg } from 'src/components/Svg';

import { TextField } from '../TextField';

export const RightInput = () => {
  return <TextField name="name" placeholder="Name" rightChild={<EditSvg color="black" size={16} />} />;
};
