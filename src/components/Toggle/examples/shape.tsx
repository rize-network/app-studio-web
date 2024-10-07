import React from 'react';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Toggle } from '../Toggle';
import { Shape } from '../Toggle/Toggle.type';
import { View } from '../../Layout/View/View';
export const ShapeDemo = () => (
  <Horizontal gap={15}>
    {['sharp', 'rounded', 'pillShaped'].map((border, index) => (
      <View position="relative" key={index}>
        <Toggle shape={border as Shape}>{border}</Toggle>
      </View>
    ))}
  </Horizontal>
);
