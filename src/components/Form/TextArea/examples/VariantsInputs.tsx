import React from 'react';
import { Vertical } from '../../../Layout/Vertical/examples';

import { TextArea } from '../TextArea';
import { Variant } from '../TextArea/TextArea.type';

export const VariantsArea = () => {
  return (
    <Vertical gap={10} width="300px">
      {['default', 'outline', 'unStyled'].map((variant, index) => (
        <TextArea
          key={index}
          name={variant}
          placeholder={variant}
          variant={variant as Variant}
        />
      ))}
    </Vertical>
  );
};
