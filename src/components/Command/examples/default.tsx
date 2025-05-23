import React, { useState } from 'react';
import { Command } from '../Command';
import { Button } from '../../Button/Button';
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  InfoIcon,
  SearchIcon,
} from '../../Icon/Icon';

export const DefaultCommand = () => {
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
    {
      id: 'help',
      name: 'Help',
      description: 'Get help and support',
      icon: <InfoIcon widthHeight={16} />,
      shortcut: '⌘?',
      onSelect: () => console.log('Help selected'),
    },
    {
      id: 'search',
      name: 'Search',
      description: 'Search for content',
      icon: <SearchIcon widthHeight={16} />,
      shortcut: '⌘K',
      onSelect: () => console.log('Search selected'),
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
      <Command
        open={open}
        onOpenChange={setOpen}
        commands={commands}
        placeholder="Search commands..."
      />
    </>
  );
};
