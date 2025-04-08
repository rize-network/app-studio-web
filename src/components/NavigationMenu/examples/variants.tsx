import React from 'react';
import { NavigationMenu } from '../NavigationMenu';
import { Text, Vertical, View } from 'app-studio';
import { 
  HomeIcon, 
  SettingsIcon, 
  UserIcon 
} from '../../Icon/Icon';

export const NavigationMenuVariants = () => {
  const items = [
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon widthHeight={20} />,
      href: '/home'
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
          href: '/profile'
        }
      ]
    }
  ];

  return (
    <Vertical gap={30} width="100%" maxWidth={300}>
      <Vertical gap={10}>
        <Text fontWeight="bold">Default Variant</Text>
        <View border="1px solid #e2e8f0" borderRadius={8} overflow="hidden">
          <NavigationMenu 
            items={items} 
            variant="default"
            defaultActiveItemId="home"
          />
        </View>
      </Vertical>
      
      <Vertical gap={10}>
        <Text fontWeight="bold">Filled Variant</Text>
        <View borderRadius={8} overflow="hidden">
          <NavigationMenu 
            items={items} 
            variant="filled"
            defaultActiveItemId="settings"
            defaultExpandedItemIds={['settings']}
          />
        </View>
      </Vertical>
      
      <Vertical gap={10}>
        <Text fontWeight="bold">Outline Variant</Text>
        <View borderRadius={8} overflow="hidden">
          <NavigationMenu 
            items={items} 
            variant="outline"
            defaultActiveItemId="home"
          />
        </View>
      </Vertical>
    </Vertical>
  );
};
