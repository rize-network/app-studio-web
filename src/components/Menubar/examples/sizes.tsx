import React from 'react';
import { Menubar } from '../Menubar';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';

export const MenubarSizes = () => {
  const items = [
    {
      id: 'file',
      label: 'File',
      items: [
        {
          id: 'new',
          label: 'New',
          onClick: () => console.log('New clicked'),
        },
        {
          id: 'open',
          label: 'Open',
          onClick: () => console.log('Open clicked'),
        },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        {
          id: 'undo',
          label: 'Undo',
          onClick: () => console.log('Undo clicked'),
        },
        {
          id: 'redo',
          label: 'Redo',
          onClick: () => console.log('Redo clicked'),
        },
      ],
    },
    {
      id: 'view',
      label: 'View',
      items: [
        {
          id: 'zoom-in',
          label: 'Zoom In',
          onClick: () => console.log('Zoom In clicked'),
        },
        {
          id: 'zoom-out',
          label: 'Zoom Out',
          onClick: () => console.log('Zoom Out clicked'),
        },
      ],
    },
  ];

  return (
    <Vertical gap={20} width="100%">
      <View>
        <Text marginBottom={10}>Small Size</Text>
        <Menubar items={items} size="sm" variant="outline" />
      </View>

      <View>
        <Text marginBottom={10}>Medium Size (Default)</Text>
        <Menubar items={items} size="md" variant="outline" />
      </View>

      <View>
        <Text marginBottom={10}>Large Size</Text>
        <Menubar items={items} size="lg" variant="outline" />
      </View>
    </Vertical>
  );
};
