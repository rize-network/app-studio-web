import React from 'react';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';

import { TextArea } from '../TextArea';
import { Variant } from '../TextArea/TextArea.type';

export const VariantsArea = () => {
  return (
    <Vertical gap={10} width="300px">
      {['default', 'outline', 'none'].map((variant, index) => (
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
