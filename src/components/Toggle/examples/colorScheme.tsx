import React from 'react';
import { Toggle } from '../Toggle';
import { Horizontal } from 'app-studio';

export const ColorSchemeDemo = () => (
  <Horizontal gap={10}>
    {[
      'theme.primary',
      'theme.secondary',
      'theme.warning',
      'theme.success',
      'theme.error',
    ].map((color, index) => (
      <Toggle key={index}>{color}</Toggle>
    ))}
  </Horizontal>
);
