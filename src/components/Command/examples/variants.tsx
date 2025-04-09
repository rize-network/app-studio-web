import React, { useState } from 'react';
import { Command } from '../Command';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { HomeIcon, SettingsIcon, UserIcon } from '../../Icon/Icon';

export const CommandVariants = () => {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [filledOpen, setFilledOpen] = useState(false);
  const [outlineOpen, setOutlineOpen] = useState(false);

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
      <Button onClick={() => setDefaultOpen(true)}>Default Variant</Button>
      <Button onClick={() => setFilledOpen(true)}>Filled Variant</Button>
      <Button onClick={() => setOutlineOpen(true)}>Outline Variant</Button>

      <Command
        open={defaultOpen}
        onOpenChange={setDefaultOpen}
        commands={commands}
        variant="default"
        placeholder="Search commands..."
      />

      <Command
        open={filledOpen}
        onOpenChange={setFilledOpen}
        commands={commands}
        variant="filled"
        placeholder="Search commands..."
      />

      <Command
        open={outlineOpen}
        onOpenChange={setOutlineOpen}
        commands={commands}
        variant="outline"
        placeholder="Search commands..."
      />
    </Horizontal>
  );
};
