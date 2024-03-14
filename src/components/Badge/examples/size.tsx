import React from 'react';
import { Vertical } from 'src/components';
import { Badge } from '../Badge';
import { Size } from '../Badge/Badge.type';

export const SizeDemo = () => (
  <Vertical gap={10}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
      <Badge key={index} content={size} size={size as Size} />
    ))}
  </Vertical>
);
