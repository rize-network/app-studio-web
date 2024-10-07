import React from 'react';
import { DustBinSvg } from '../../Svg';
import { ToggleGroup } from '../ToggleGroup';
import { Shape } from '../ToggleGroup/ToggleGroup.type';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { View } from '../../Layout/View/View';

export const ShapeDemo = () => {
  const items = [
    {
      id: 'item',
      value: <DustBinSvg color="black" size={18} />,
      isActive: true,
    },
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
