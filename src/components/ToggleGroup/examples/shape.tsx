import React from 'react';
import { Horizontal, View } from 'src/components';
import { ToggleGroup } from '../ToggleGroup';
import { Shape } from '../ToggleGroup/ToggleGroup.type';

export const ShapeDemo = () => {
  const items = [
    { id: 'B', value: 'B' },
    { id: 'C', value: 'C' },
    { id: 'D', value: 'D' },
  ];
  return (
    <Horizontal gap={15}>
      {['sharp', 'rounded', 'pillShaped'].map((border, index) => (
        <View position="relative" key={index}>
          <ToggleGroup items={items} shape={border as Shape} />
        </View>
      ))}
    </Horizontal>
  );
};
