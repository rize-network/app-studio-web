import React from 'react';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Badge } from '../Badge';
import { Shape } from '../Badge/Badge.type';

export const ShapeDemo = () => (
  <Horizontal gap={15}>
    {['sharp', 'rounded', 'pillShaped'].map((border, index) => (
      <Badge key={index} content={border} shape={border as Shape} />
    ))}
  </Horizontal>
);
