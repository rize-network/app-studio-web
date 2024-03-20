import React from 'react';
import { Toggle } from '../Toggle';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Variant } from '../Toggle/Toggle.type';

export const VariantDemo = () => (
  <Vertical gap={15}>
    {['outline', 'link', 'ghost'].map((variant, index) => (
      <Toggle key={index} variant={variant as Variant}>
        {variant}
      </Toggle>
    ))}
  </Vertical>
);
