import React, { useState } from 'react';
import { Vertical } from 'src/components';
import { ToggleGroup } from '../ToggleGroup';

export const OnToggleChangeDemo = () => {
  const [newItems, setNewItems] = useState<any>([]);

  const items = [
    { id: 'B', value: 'B' },
    { id: 'C', value: 'C' },
    { id: 'D', value: 'D' },
  ];
  return (
    <Vertical gap={10}>
      <ToggleGroup
        items={items}
        onToggleChange={(items) => setNewItems(items)}
      />
      {newItems}
    </Vertical>
  );
};
