import React from 'react';
import { Text } from '../../Text/Text';
import { ToggleGroup } from '../ToggleGroup';
import { Variant } from '../ToggleGroup/ToggleGroup.type';
import { Vertical } from '../../Layout/Vertical/Vertical';

export const VariantDemo = () => {
  const items = [
    { id: 'B', value: <Text>B</Text> },
    { id: 'C', value: <Text>C</Text> },
    { id: 'D', value: <Text>D</Text> },
  ];
  return (
    <Vertical gap={15}>
      {['outline', 'link', 'ghost'].map((variant, index) => (
        <ToggleGroup key={index} items={items} variant={variant as Variant} />
      ))}
    </Vertical>
  );
};
