import React from 'react';
import { CloseEyeSvg } from '../../../Svg/CloseEye';
import { OpenEyeSvg } from '../../../Svg/OpenEye';

import { Password } from '../Password';

export const DisabledPassword = () => {
  return (
    <Password
      name="disabled"
      value="disabled"
      visibleIcon={<OpenEyeSvg size={14} />}
      hiddenIcon={<CloseEyeSvg size={14} />}
      isDisabled
    />
  );
};
