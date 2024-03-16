import React from 'react';
import { Horizontal, View } from 'src/components';
import { DustBinSvg } from 'src/components/Svg';
import { ToggleGroup } from '../ToggleGroup';
import { Shape } from '../ToggleGroup/ToggleGroup.type';

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
