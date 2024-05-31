import React from 'react';
import { Button } from '../Button';
import { Vertical } from '../../Layout/Vertical/Vertical';

import { Variant } from '../Button/Button.type';

export const VariantButtons = () => (
  <Vertical gap={15}>
    {['filled', 'outline', 'link', 'ghost'].map((variant, index) => (
      <Button
        key={index}
        externalHref="https://www.npmjs.com/package/app-studio"
        variant={variant as Variant}
        colorScheme="theme.primary"
        isFilled
      >
        {variant}
      </Button>
    ))}
     {['filled', 'outline', 'link', 'ghost'].map((variant, index) => (
      <Button
        key={index}
        externalHref="https://www.npmjs.com/package/app-studio"
        variant={variant as Variant}
        colorScheme="theme.primary"
        isFilled
        effect='reverse'
      >
        {variant}
      </Button>
    ))}
  </Vertical>
);
