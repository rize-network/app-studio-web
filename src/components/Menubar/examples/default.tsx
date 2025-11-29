import React from 'react';
import { Menubar } from '../Menubar';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { EditIcon } from '../../Icon/Icon';

export const DefaultMenubar = () => {
  const items: any[] = [
    {
      id: 'file',
      label: 'File',
      items: [
        {
          id: 'new',
          label: 'New',
          icon: <EditIcon size={16} />,
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
        {
          id: 'save-as',
          label: 'Save As',
          onClick: () => console.log('Save As clicked'),
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
        { separator: true },
        {
          id: 'cut',
          label: 'Cut',
          onClick: () => console.log('Cut clicked'),
        },
        {
          id: 'copy',
          label: 'Copy',
          onClick: () => console.log('Copy clicked'),
        },
        {
          id: 'paste',
          label: 'Paste',
          onClick: () => console.log('Paste clicked'),
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
        { separator: true },
        {
          id: 'fullscreen',
          label: 'Fullscreen',
          onClick: () => console.log('Fullscreen clicked'),
        },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      items: [
        {
          id: 'documentation',
          label: 'Documentation',
          onClick: () => console.log('Documentation clicked'),
        },
        {
          id: 'about',
          label: 'About',
          onClick: () => console.log('About clicked'),
        },
      ],
    },
  ];

  return (
    <View width="100%">
      <Text marginBottom={10}>Default Menubar</Text>
      <Menubar items={items} />
    </View>
  );
};
