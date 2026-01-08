import React from 'react';
import { Horizontal } from 'app-studio';
import { Badge } from '../Badge';
import { Shape } from '../Badge/Badge.type';
import { View } from 'app-studio';
export const ShapeDemo = () => (
  <Horizontal gap={15}>
    {['square', 'rounded', 'pill'].map((border, index) => (
      <View position="relative" key={index}>
        <Badge content={border} shape={border as Shape} />
      </View>
    ))}
  </Horizontal>
);
