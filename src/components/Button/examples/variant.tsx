import React from 'react';
import { Button } from '../Button';
import { Vertical } from 'app-studio';

import { Variant } from '../Button/Button.type';

export const VariantButtons = () => (
  <Vertical gap={15}>
    {['filled', 'outline', 'link', 'ghost'].map((variant, index) => (
      <Button
        key={index}
        to="https://www.npmjs.com/package/app-studio"
        variant={variant as Variant}
      >
        App Studio Link {variant}
      </Button>
    ))}
    {['filled', 'outline', 'link', 'ghost'].map((variant, index) => (
      <Button key={index} variant={variant as Variant}>
        {variant}
      </Button>
    ))}
    {/* Effect variants */}
    <Button variant="borderMoving">Border Moving Effect</Button>
    <Button variant="animatedStroke">Animated Stroke Effect</Button>
  </Vertical>
);
