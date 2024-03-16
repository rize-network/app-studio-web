import React from 'react';
import { Toggle } from '../Toggle';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

export const ColorSchemeDemo = () => (
  <Horizontal gap={10}>
    {[
      'theme.primary',
      'theme.secondary',
      'theme.warning',
      'theme.success',
      'theme.error',
    ].map((color, index) => (
      <Toggle key={index} colorScheme={color}>
        {color}
      </Toggle>
    ))}
  </Horizontal>
);
