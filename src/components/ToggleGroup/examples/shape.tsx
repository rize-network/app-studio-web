import React from 'react';
import { DustBinIcon } from '../../Icon/Icon';
import { ToggleGroup } from '../ToggleGroup';
import { Shape } from '../ToggleGroup/ToggleGroup.type';
import { Horizontal } from 'app-studio';
import { View } from 'app-studio';

export const ShapeDemo = () => {
  const items = [
    {
      id: 'item',
      value: <DustBinIcon widthHeight={18} />,
      isActive: true,
    },
  ];
  return (
    <Horizontal gap={15}>
      {['square', 'rounded', 'pill'].map((border, index) => (
        <View position="relative" key={index}>
          <ToggleGroup items={items} shape={border as Shape} />
        </View>
      ))}
    </Horizontal>
  );
};
