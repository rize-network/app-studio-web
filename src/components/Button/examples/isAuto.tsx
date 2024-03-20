import React from 'react';
import { Button } from '../Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import { Shape } from '../Button/Button.type';

export const BorderedButtons = () => (
  <Horizontal gap={15}>
    {['sharp', 'rounded', 'pillShaped'].map((border, index) => (
      <Button key={index} shape={border as Shape} isAuto>
        {border}
      </Button>
    ))}
  </Horizontal>
);
