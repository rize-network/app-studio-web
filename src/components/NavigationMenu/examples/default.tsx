import React from 'react';
import { NavigationMenu } from '../NavigationMenu';
import { Text, Vertical, View } from 'app-studio';
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  NotificationIcon,
  HelpIcon,
} from '../../Icon/Icon';

export const DefaultNavigationMenu = () => {
  const items = [
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon widthHeight={20} />,
      href: '/home',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon widthHeight={20} />,
      items: [
        {
          id: 'profile',
          label: 'Profile',
          icon: <UserIcon widthHeight={20} />,
          href: '/profile',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: <NotificationIcon widthHeight={20} />,
          href: '/notifications',
        },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      icon: <HelpIcon widthHeight={20} />,
      href: '/help',
    },
    {
      id: 'disabled',
      label: 'Disabled Item',
      disabled: true,
      href: '/disabled',
    },
  ];

  return (
    <Vertical gap={20} width="100%" maxWidth={300}>
      <Text marginBottom={10}>Default Navigation Menu (Vertical)</Text>
      <View border="1px solid #e2e8f0" borderRadius={8} overflow="hidden">
        <NavigationMenu
          items={items}
          defaultActiveItemId="home"
          defaultExpandedItemIds={['settings']}
        />
      </View>
    </Vertical>
  );
};
