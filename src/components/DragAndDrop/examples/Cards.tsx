import React from 'react';
import { Horizontal, Text, View } from 'app-studio';
import { DragAndDrop } from '../DragAndDrop';

const tasks = [
  { id: 1, title: 'Design review', color: 'color-blue-500' },
  { id: 2, title: 'Write tests', color: 'color-green-500' },
  { id: 3, title: 'Ship release', color: 'color-purple-500' },
];

export const CardsDragAndDrop = () => (
  <DragAndDrop
    items={tasks}
    onChange={(next) => console.log('order', next)}
    itemProps={{ marginBottom: 8 }}
    renderItem={(item: (typeof tasks)[number]) => (
      <Horizontal
        alignItems="center"
        gap={10}
        padding={12}
        borderRadius={10}
        backgroundColor="color-white"
        borderWidth={1}
        borderStyle="solid"
        borderColor="color-gray-200"
      >
        <View
          widthHeight={10}
          borderRadius={999}
          backgroundColor={item.color}
        />
        <Text color="color-gray-800" fontWeight="600">
          {item.title}
        </Text>
      </Horizontal>
    )}
  />
);
