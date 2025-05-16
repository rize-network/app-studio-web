import React from 'react';
import { NavigationMenu } from '../NavigationMenu';
import { Text, View } from 'app-studio';
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  NotificationIcon,
  HelpIcon,
} from '../../Icon/Icon';

export const CompoundNavigationMenu = () => {
  return (
    <View padding={4} maxWidth={600}>
      <Text marginBottom={4} fontWeight="bold">
        Compound Component Pattern
      </Text>
      <View border="1px solid #e2e8f0" borderRadius={8} padding={2}>
        <NavigationMenu defaultActiveItemId="home" orientation="horizontal">
          <NavigationMenu.List>
            <NavigationMenu.Item value="home">
              <NavigationMenu.Link href="#">
                <HomeIcon widthHeight={20} />
                <Text marginLeft={2}>Home</Text>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item value="settings">
              <NavigationMenu.Link href="#">
                <SettingsIcon widthHeight={20} />
                <Text marginLeft={2}>Settings</Text>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item value="profile">
              <NavigationMenu.Link href="#">
                <UserIcon widthHeight={20} />
                <Text marginLeft={2}>Profile</Text>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item value="help" isDisabled>
              <NavigationMenu.Link href="#">
                <HelpIcon widthHeight={20} />
                <Text marginLeft={2}>Help (Disabled)</Text>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      </View>

      <View
        border="1px solid #e2e8f0"
        borderRadius={8}
        padding={2}
        marginTop={4}
        display="flex"
      >
        <View width={200} marginRight={4}>
          <NavigationMenu
            defaultActiveItemId="dashboard"
            orientation="vertical"
          >
            <NavigationMenu.List>
              <NavigationMenu.Item value="dashboard">
                <NavigationMenu.Link href="#">
                  <HomeIcon widthHeight={20} />
                  <Text marginLeft={2}>Dashboard</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item value="settings">
                <NavigationMenu.Link href="#">
                  <SettingsIcon widthHeight={20} />
                  <Text marginLeft={2}>Settings</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item value="notifications">
                <NavigationMenu.Link href="#">
                  <NotificationIcon widthHeight={20} />
                  <Text marginLeft={2}>Notifications</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item value="help" isDisabled>
                <NavigationMenu.Link href="#">
                  <HelpIcon widthHeight={20} />
                  <Text marginLeft={2}>Help (Disabled)</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu>
        </View>

        <View
          flex={1}
          padding={4}
          backgroundColor="color.gray.50"
          borderRadius={4}
        >
          <Text>Content area</Text>
          <Text color="color.gray.600">
            The navigation menu on the left uses the compound component pattern.
          </Text>
        </View>
      </View>
    </View>
  );
};
