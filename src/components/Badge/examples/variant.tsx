import React from 'react';
import { Vertical } from 'src/components';
import { Badge } from '../Badge';
import { Variant } from '../Badge/Badge.type';

export const VariantDemo = () => (
  <Vertical gap={15}>
    {['filled', 'outline', 'link', 'ghost'].map((variant, index) => (
      <Badge
        key={index}
        content={variant}
        variant={variant as Variant}
        colorScheme="theme.primary"
      />
    ))}
  </Vertical>
);
