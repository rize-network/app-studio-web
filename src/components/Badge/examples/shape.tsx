import React from 'react';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Badge } from '../Badge';
import { Shape } from '../Badge/Badge.type';
import { View } from 'src/components/Layout/View/View';
export const ShapeDemo = () => (
  <Horizontal gap={15}>
    {['sharp', 'rounded', 'pillShaped'].map((border, index) => (
      <View position="relative" key={index}>
        <Badge content={border} shape={border as Shape} />
      </View>
    ))}
  </Horizontal>
);
