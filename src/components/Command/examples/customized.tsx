import React, { useState } from 'react';
import { Command } from '../Command';
import { Button } from '../../Button/Button';
import { Text } from 'app-studio';
import { Horizontal } from 'app-studio';
import { HomeIcon, SettingsIcon, UserIcon } from '../../Icon/Icon';

export const CustomizedCommand = () => {
  const [open, setOpen] = useState(false);

  const commands = [
    {
      id: 'home',
      name: 'Home',
      description: 'Go to home page',
      icon: <HomeIcon widthHeight={16} />,
      shortcut: '⌘H',
      onSelect: () => console.log('Home selected'),
    },
    {
      id: 'settings',
      name: 'Settings',
      description: 'Open settings page',
      icon: <SettingsIcon widthHeight={16} />,
      shortcut: '⌘S',
      onSelect: () => console.log('Settings selected'),
    },
    {
      id: 'profile',
      name: 'Profile',
      description: 'View your profile',
      icon: <UserIcon widthHeight={16} />,
      shortcut: '⌘P',
      onSelect: () => console.log('Profile selected'),
    },
  ];

  const customEmptyState = (
    <Horizontal
      alignItems="center"
      justifyContent="center"
      padding="24px"
      flexDirection="column"
    >
      <Text fontSize="16px" fontWeight="bold" color="color-gray-600">
        No commands found
      </Text>
      <Text fontSize="14px" color="color-gray-500" marginTop="8px">
        Try a different search term
      </Text>
    </Horizontal>
  );

  const customFooter = (
    <Horizontal justifyContent="space-between" width="100%">
      <Text color="color-gray-500">Press ↑↓ to navigate</Text>
      <Text color="color-gray-500">Press Enter to select</Text>
      <Text color="color-gray-500">Press Esc to close</Text>
    </Horizontal>
  );

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Customized Command</Button>
      <Command
        open={open}
        onOpenChange={setOpen}
        commands={commands}
        placeholder="Search commands..."
        emptyState={customEmptyState}
        footer={customFooter}
        views={{
          container: {
            backgroundColor: 'color-blue-50',
            borderColor: 'color-blue-200',
            borderWidth: '2px',
            borderRadius: '12px',
          },
          searchInput: {
            container: {
              backgroundColor: 'color-white',
              borderBottomColor: 'color-blue-200',
            },
            input: {
              color: 'color-blue-800',
              fontWeight: 'medium',
            },
          },
          item: {
            backgroundColor: 'transparent',
            borderRadius: '8px',
            _hover: {
              backgroundColor: 'color-blue-100',
            },
          },
          selectedItem: {
            backgroundColor: 'color-blue-200',
            _hover: {
              backgroundColor: 'color-blue-300',
            },
          },
          name: {
            color: 'color-blue-800',
            fontWeight: 'bold',
          },
          description: {
            color: 'color-blue-600',
          },
          shortcut: {
            backgroundColor: 'color-white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: 'bold',
          },
          footer: {
            backgroundColor: 'color-white',
            borderTopColor: 'color-blue-200',
          },
        }}
      />
    </>
  );
};
