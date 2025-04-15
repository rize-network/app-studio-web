import React, { useState } from 'react';
import { Command } from '../Command';
import { Button } from '../../Button/Button';
import { Horizontal } from 'app-studio';
import { HomeIcon, SettingsIcon, UserIcon } from '../../Icon/Icon';

export const CommandSizes = () => {
  const [smallOpen, setSmallOpen] = useState(false);
  const [mediumOpen, setMediumOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);

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

  return (
    <Horizontal gap={10}>
      <Button onClick={() => setSmallOpen(true)}>Small Size</Button>
      <Button onClick={() => setMediumOpen(true)}>Medium Size</Button>
      <Button onClick={() => setLargeOpen(true)}>Large Size</Button>

      <Command
        open={smallOpen}
        onOpenChange={setSmallOpen}
        commands={commands}
        size="sm"
        placeholder="Search commands..."
      />

      <Command
        open={mediumOpen}
        onOpenChange={setMediumOpen}
        commands={commands}
        size="md"
        placeholder="Search commands..."
      />

      <Command
        open={largeOpen}
        onOpenChange={setLargeOpen}
        commands={commands}
        size="lg"
        placeholder="Search commands..."
      />
    </Horizontal>
  );
};
