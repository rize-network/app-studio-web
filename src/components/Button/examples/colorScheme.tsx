import React from 'react';
import { Button } from '../Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

export const ColoredButtons = () => (
  <Horizontal gap={10}>
    {[
      'theme.primary',
      'theme.secondary',
      'theme.warning',
      'theme.success',
      'theme.error',
    ].map((color, index) => (
      <Button key={index} colorScheme={color} isAuto>
        {color}
      </Button>
    ))}
  </Horizontal>
);
