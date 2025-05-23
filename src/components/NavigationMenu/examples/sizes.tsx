import React from 'react';
import { NavigationMenu } from '../NavigationMenu';
import { Text, Vertical, View } from 'app-studio';
import { HomeIcon, SettingsIcon } from '../../Icon/Icon';

export const NavigationMenuSizes = () => {
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
      href: '/settings',
    },
  ];

  return (
    <Vertical gap={30} width="100%" maxWidth={300}>
      <Vertical gap={10}>
        <Text fontWeight="bold">Small Size</Text>
        <View border="1px solid #e2e8f0" borderRadius={8} overflow="hidden">
          <NavigationMenu items={items} size="sm" defaultActiveItemId="home" />
        </View>
      </Vertical>

      <Vertical gap={10}>
        <Text fontWeight="bold">Medium Size (Default)</Text>
        <View border="1px solid #e2e8f0" borderRadius={8} overflow="hidden">
          <NavigationMenu
            items={items}
            size="md"
            defaultActiveItemId="settings"
          />
        </View>
      </Vertical>

      <Vertical gap={10}>
        <Text fontWeight="bold">Large Size</Text>
        <View border="1px solid #e2e8f0" borderRadius={8} overflow="hidden">
          <NavigationMenu items={items} size="lg" defaultActiveItemId="home" />
        </View>
      </Vertical>
    </Vertical>
  );
};
