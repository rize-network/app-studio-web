import React from 'react';
import { DragAndDrop } from '..//DragAndDrop';

export const SimpleDragAndDrop = () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <DragAndDrop
      items={items}
      onChange={(newItems) => console.log('Items reordered:', newItems)}
      containerProps={{
        padding: 16,
        backgroundColor: 'color.gray.50',
      }}
      itemProps={{
        marginBottom: 8,
      }}
    />
  );
};
