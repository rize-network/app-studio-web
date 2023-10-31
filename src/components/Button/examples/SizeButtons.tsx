import React from 'react';
import { Button } from '../../Button/Button';
import { Vertical } from '../../Layout/Vertical/Vertical';

import { Size } from '../Button/Button.type';

export const ButtonSizes = () => (
  <Vertical gap={10}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
      <Button key={index} size={size as Size}>
        Button
      </Button>
    ))}
    <Button isAuto>Auto Width</Button>
    <Button isFilled>Fill Width</Button>
  </Vertical>
);
