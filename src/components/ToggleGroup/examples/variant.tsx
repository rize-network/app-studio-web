import React from 'react';
import { Vertical } from 'src/components';
import { ToggleGroup } from '../ToggleGroup';
import { Variant } from '../ToggleGroup/ToggleGroup.type';

export const VariantDemo = () => {
  const items = [
    { id: 'B', value: 'B' },
    { id: 'C', value: 'C' },
    { id: 'D', value: 'D' },
  ];
  return (
    <Vertical gap={15}>
      {['filled', 'outline', 'link', 'ghost'].map((variant, index) => (
        <ToggleGroup key={index} items={items} variant={variant as Variant} />
      ))}
    </Vertical>
  );
};
