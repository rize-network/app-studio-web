import React from 'react';
import { CloseEyeSvg } from '../../../Svg/CloseEye';
import { OpenEyeSvg } from '../../../Svg/OpenEye';

import { Password } from '../Password';

export const DefaultPassword = () => (
  <Password visibleIcon={<OpenEyeSvg size={14} />} hiddenIcon={<CloseEyeSvg size={14} />} />
);
