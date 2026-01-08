import React from 'react';
import { Button } from '../Button';
import { Horizontal } from 'app-studio';

import { Shape } from '../Button/Button.type';

export const BorderedButtons = () => (
  <Horizontal gap={15}>
    {['square', 'rounded', 'pill'].map((border, index) => (
      <Button key={index} shape={border as Shape}>
        {border}
      </Button>
    ))}
  </Horizontal>
);
