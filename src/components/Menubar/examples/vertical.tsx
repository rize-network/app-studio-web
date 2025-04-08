import React from 'react';
import { Menubar } from '../Menubar';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';

export const VerticalMenubar = () => {
  const items: any[] = [
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
        { separator: true },
        {
          id: 'save',
          label: 'Save',
          onClick: () => console.log('Save clicked'),
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
    <View width="200px">
      <Text marginBottom={10}>Vertical Menubar</Text>
      <Menubar items={items} orientation="vertical" variant="outline" />
    </View>
  );
};
