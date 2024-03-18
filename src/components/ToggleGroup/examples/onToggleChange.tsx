import React, { useState } from 'react';
import { ToggleGroup } from '../ToggleGroup';
import { Text } from 'src/components/Text/Text';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';

export const OnToggleChangeDemo = () => {
  const [newItems, setNewItems] = useState<any>([]);

  const items = [
    { id: 'B', value: <Text>B</Text> },
    { id: 'C', value: <Text>C</Text> },
    { id: 'D', value: <Text>D</Text> },
  ];
  return (
    <Vertical gap={10}>
      <ToggleGroup
        items={items}
        onToggleChange={(items) => setNewItems(items)}
      />
      Selected: {newItems}
    </Vertical>
  );
};
