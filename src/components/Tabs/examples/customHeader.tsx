import React from 'react';
import { View, Text } from 'app-studio';
import { Tabs } from '../Tabs';
import { HomeIcon, SettingsIcon, UserIcon } from '../../Icon/Icon';

export const CustomHeaderExample = () => {
  const tabs = [
    {
      title: 'Home',
      icon: <HomeIcon widthHeight={16} />,
      content: (
        <View padding={20}>
          <Text fontSize="lg" fontWeight="bold">
            Home Content
          </Text>
          <Text marginTop={10}>This is the home tab content.</Text>
        </View>
      ),
    },
    {
      title: 'Profile',
      icon: <UserIcon widthHeight={16} />,
      content: (
        <View padding={20}>
          <Text fontSize="lg" fontWeight="bold">
            Profile Content
          </Text>
          <Text marginTop={10}>This is the profile tab content.</Text>
        </View>
      ),
    },
    {
      title: 'Settings',
      icon: <SettingsIcon widthHeight={16} />,
      content: (
        <View padding={20}>
          <Text fontSize="lg" fontWeight="bold">
            Settings Content
          </Text>
          <Text marginTop={10}>This is the settings tab content.</Text>
        </View>
      ),
    },
  ];

  return (
    <View border="1px solid color.gray.200" borderRadius={4} overflow="hidden">
      <Tabs
        tabs={tabs}
        iconPosition="left"
        views={{
          container: {
            height: 300,
          },
          headerTabs: {
            backgroundColor: 'color.gray.100',
            padding: '8px 8px 0',
          },
          tab: {
            minWidth: 120,
            textAlign: 'center',
          },
          activeTab: {
            backgroundColor: 'color.white',
            borderColor: 'color.gray.200',
          },
          activeText: {
            color: 'theme.primary',
            fontWeight: 'bold',
          },
          content: {
            backgroundColor: 'color.white',
            padding: 16,
          },
        }}
      />
    </View>
  );
};
