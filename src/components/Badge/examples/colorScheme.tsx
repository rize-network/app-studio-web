import React from 'react';
import { Badge } from '../Badge';
import { Horizontal } from 'app-studio';

export const ColorSchemeDemo = () => (
  <Horizontal gap={10}>
    {[
      'theme-primary',
      'theme-secondary',
      'theme-warning',
      'theme-success',
      'theme-error',
    ].map((color, index) => (
      <Badge key={index} isAuto content={color} />
    ))}
  </Horizontal>
);
