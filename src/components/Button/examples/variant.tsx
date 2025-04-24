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
        {variant} a
      </Button>
    ))}
    {['filled', 'outline', 'link', 'ghost'].map((variant, index) => (
      <Button
        key={index}
        // to="https://www.npmjs.com/package/app-studio"
        variant={variant as Variant}
        effect="reverse"
      >
        {variant}
      </Button>
    ))}
  </Vertical>
);
