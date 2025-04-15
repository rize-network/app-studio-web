import React from 'react';
import { Menubar } from '../Menubar';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { EditIcon } from '../../Icon/Icon';

export const CompositeMenubar = () => {
  return (
    <View width="100%">
      <Text marginBottom={10}>Composite Menubar (Using Subcomponents)</Text>
      <Menubar.Root orientation="horizontal" variant="outline">
        <Menubar.Menu id="file">
          <Menubar.Trigger menuId="file">File</Menubar.Trigger>
          <Menubar.Content menuId="file">
            <Menubar.Item
              id="new"
              icon={<EditIcon size={16} />}
              onClick={() => console.log('New clicked')}
            >
              New
            </Menubar.Item>
            <Menubar.Item id="open" onClick={() => console.log('Open clicked')}>
              Open
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item id="save" onClick={() => console.log('Save clicked')}>
              Save
            </Menubar.Item>
            <Menubar.Item
              id="save-as"
              onClick={() => console.log('Save As clicked')}
            >
              Save As
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>

        <Menubar.Menu id="edit">
          <Menubar.Trigger menuId="edit">Edit</Menubar.Trigger>
          <Menubar.Content menuId="edit">
            <Menubar.Item id="undo" onClick={() => console.log('Undo clicked')}>
              Undo
            </Menubar.Item>
            <Menubar.Item id="redo" onClick={() => console.log('Redo clicked')}>
              Redo
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item id="cut" onClick={() => console.log('Cut clicked')}>
              Cut
            </Menubar.Item>
            <Menubar.Item id="copy" onClick={() => console.log('Copy clicked')}>
              Copy
            </Menubar.Item>
            <Menubar.Item
              id="paste"
              onClick={() => console.log('Paste clicked')}
            >
              Paste
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>

        <Menubar.Menu id="view">
          <Menubar.Trigger menuId="view">View</Menubar.Trigger>
          <Menubar.Content menuId="view">
            <Menubar.Item
              id="zoom-in"
              onClick={() => console.log('Zoom In clicked')}
            >
              Zoom In
            </Menubar.Item>
            <Menubar.Item
              id="zoom-out"
              onClick={() => console.log('Zoom Out clicked')}
            >
              Zoom Out
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item
              id="fullscreen"
              onClick={() => console.log('Fullscreen clicked')}
            >
              Fullscreen
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>

        <Menubar.Menu id="help">
          <Menubar.Trigger menuId="help">Help</Menubar.Trigger>
          <Menubar.Content menuId="help">
            <Menubar.Item
              id="documentation"
              onClick={() => console.log('Documentation clicked')}
            >
              Documentation
            </Menubar.Item>
            <Menubar.Item
              id="about"
              onClick={() => console.log('About clicked')}
            >
              About
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>
    </View>
  );
};
