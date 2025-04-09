import React, { useState } from 'react';
import { Command } from '../Command';
import { Button } from '../../Button/Button';
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  InfoIcon,
  SearchIcon,
  EditIcon,
  DustBinIcon,
  CopyIcon,
  PlayIcon,
  PauseIcon,
} from '../../Icon/Icon';

export const GroupedCommand = () => {
  const [open, setOpen] = useState(false);

  const groups = [
    {
      id: 'navigation',
      name: 'Navigation',
      commands: [
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
      ],
    },
    {
      id: 'actions',
      name: 'Actions',
      commands: [
        {
          id: 'edit',
          name: 'Edit',
          description: 'Edit current document',
          icon: <EditIcon widthHeight={16} />,
          shortcut: '⌘E',
          onSelect: () => console.log('Edit selected'),
        },
        {
          id: 'delete',
          name: 'Delete',
          description: 'Delete current document',
          icon: <DustBinIcon widthHeight={16} />,
          shortcut: '⌘⌫',
          onSelect: () => console.log('Delete selected'),
        },
        {
          id: 'copy',
          name: 'Copy',
          description: 'Copy to clipboard',
          icon: <CopyIcon widthHeight={16} />,
          shortcut: '⌘C',
          onSelect: () => console.log('Copy selected'),
        },
      ],
    },
    {
      id: 'media',
      name: 'Media Controls',
      commands: [
        {
          id: 'play',
          name: 'Play',
          description: 'Play media',
          icon: <PlayIcon widthHeight={16} />,
          shortcut: 'Space',
          onSelect: () => console.log('Play selected'),
        },
        {
          id: 'pause',
          name: 'Pause',
          description: 'Pause media',
          icon: <PauseIcon widthHeight={16} />,
          shortcut: 'Space',
          onSelect: () => console.log('Pause selected'),
        },
      ],
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Grouped Command Palette
      </Button>
      <Command
        open={open}
        onOpenChange={setOpen}
        groups={groups}
        placeholder="Search commands..."
      />
    </>
  );
};
