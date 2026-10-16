import React from 'react';
import { Menubar } from '../Menubar';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';

export const MenubarVariants = () => {
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
    <Vertical gap={20} width="100%">
      <View>
        <Text marginBottom={10}>Default Variant</Text>
        <Menubar items={items} variant="default" />
      </View>

      <View>
        <Text marginBottom={10}>Filled Variant</Text>
        <Menubar items={items} variant="filled" />
      </View>

      <View>
        <Text marginBottom={10}>Outline Variant</Text>
        <Menubar items={items} variant="outline" />
      </View>
    </Vertical>
  );
};
