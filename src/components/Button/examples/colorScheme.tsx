import React from 'react';
import { Button } from '../Button';
import { Horizontal } from 'app-studio';

export const ColoredButtons = () => (
  <Horizontal gap={10}>
    {[
      'theme-primary',
      'theme-secondary',
      'theme-warning',
      'theme-success',
      'theme-error',
    ].map((color, index) => (
      <Button key={index} color={color} isAuto>
        {color.replace('theme-', '')}
      </Button>
    ))}
  </Horizontal>
);
