/**
 * NavigationMenu Examples - Design System
 *
 * Showcases the NavigationMenu component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { NavigationMenu } from '../NavigationMenu';
import { Text, Vertical, View, Horizontal } from 'app-studio';
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  NotificationIcon,
  HelpIcon,
  DocumentIcon,
  SearchIcon,
  ChartIcon,
  StarIcon,
} from '../../Icon/Icon';

export const DesignSystemNavigationMenu = () => {
  // Common items for all examples
  const items = [
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon widthHeight={20} />,
      href: '/home',
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <ChartIcon widthHeight={20} />,
      href: '/dashboard',
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
      id: 'documents',
      label: 'Documents',
      icon: <DocumentIcon widthHeight={20} />,
      href: '/documents',
    },
    {
      id: 'search',
      label: 'Search',
      icon: <SearchIcon widthHeight={20} />,
      href: '/search',
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: <StarIcon widthHeight={20} />,
      href: '/favorites',
    },
    {
      id: 'help',
      label: 'Help',
      icon: <HelpIcon widthHeight={20} />,
      href: '/help',
      disabled: true,
    },
  ];

  return (
    <Vertical gap={32} width="100%">
      {/* Vertical Navigation Menu */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Vertical Navigation Menu (Default)
        </Text>
        <Horizontal gap={32} alignItems="flex-start">
          {/* Default Variant */}
          <Vertical gap={8} width="250px">
            <Text fontSize="14px" color="color-gray-600">
              Default Variant
            </Text>
            <View
              border="1px solid #e2e8f0"
              borderRadius="8px"
              overflow="hidden"
              backgroundColor="color-white"
            >
              <NavigationMenu
                items={items}
                defaultActiveItemId="home"
                defaultExpandedItemIds={['settings']}
                variant="default"
              />
            </View>
          </Vertical>

          {/* Filled Variant */}
          <Vertical gap={8} width="250px">
            <Text fontSize="14px" color="color-gray-600">
              Filled Variant
            </Text>
            <View
              border="1px solid #e2e8f0"
              borderRadius="8px"
              overflow="hidden"
            >
              <NavigationMenu
                items={items}
                defaultActiveItemId="dashboard"
                defaultExpandedItemIds={['settings']}
                variant="filled"
              />
            </View>
          </Vertical>

          {/* Outline Variant */}
          <Vertical gap={8} width="250px">
            <Text fontSize="14px" color="color-gray-600">
              Outline Variant
            </Text>
            <View borderRadius="8px" overflow="hidden">
              <NavigationMenu
                items={items}
                defaultActiveItemId="documents"
                variant="outline"
              />
            </View>
          </Vertical>
        </Horizontal>
      </View>

      {/* Horizontal Navigation Menu */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Horizontal Navigation Menu
        </Text>
        <Vertical gap={16}>
          {/* Default Variant */}
          <Vertical gap={8}>
            <Text fontSize="14px" color="color-gray-600">
              Default Variant
            </Text>
            <View
              border="1px solid #e2e8f0"
              borderRadius="8px"
              overflow="hidden"
              backgroundColor="color-white"
              padding="4px"
            >
              <NavigationMenu
                items={items.slice(0, 5)} // Using fewer items for horizontal layout
                orientation="horizontal"
                defaultActiveItemId="home"
                variant="default"
              />
            </View>
          </Vertical>

          {/* Filled Variant */}
          <Vertical gap={8}>
            <Text fontSize="14px" color="color-gray-600">
              Filled Variant
            </Text>
            <View
              borderRadius="8px"
              overflow="hidden"
              backgroundColor="color-gray-100"
              padding="4px"
            >
              <NavigationMenu
                items={items.slice(0, 5)} // Using fewer items for horizontal layout
                orientation="horizontal"
                defaultActiveItemId="dashboard"
                variant="filled"
              />
            </View>
          </Vertical>
        </Vertical>
      </View>

      {/* Size Variants */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Size Variants
        </Text>
        <Horizontal gap={32} alignItems="flex-start">
          {/* Small Size */}
          <Vertical gap={8} width="250px">
            <Text fontSize="14px" color="color-gray-600">
              Small Size
            </Text>
            <View
              border="1px solid #e2e8f0"
              borderRadius="8px"
              overflow="hidden"
              backgroundColor="color-white"
            >
              <NavigationMenu
                items={items.slice(0, 4)}
                defaultActiveItemId="home"
                size="sm"
              />
            </View>
          </Vertical>

          {/* Medium Size (Default) */}
          <Vertical gap={8} width="250px">
            <Text fontSize="14px" color="color-gray-600">
              Medium Size (Default)
            </Text>
            <View
              border="1px solid #e2e8f0"
              borderRadius="8px"
              overflow="hidden"
              backgroundColor="color-white"
            >
              <NavigationMenu
                items={items.slice(0, 4)}
                defaultActiveItemId="dashboard"
                size="md"
              />
            </View>
          </Vertical>

          {/* Large Size */}
          <Vertical gap={8} width="250px">
            <Text fontSize="14px" color="color-gray-600">
              Large Size
            </Text>
            <View
              border="1px solid #e2e8f0"
              borderRadius="8px"
              overflow="hidden"
              backgroundColor="color-white"
            >
              <NavigationMenu
                items={items.slice(0, 4)}
                defaultActiveItemId="settings"
                defaultExpandedItemIds={['settings']}
                size="lg"
              />
            </View>
          </Vertical>
        </Horizontal>
      </View>

      {/* Compound Component Pattern */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Compound Component Pattern
        </Text>
        <View
          border="1px solid #e2e8f0"
          borderRadius="8px"
          overflow="hidden"
          backgroundColor="color-white"
          width="300px"
        >
          <NavigationMenu defaultActiveItemId="home">
            <NavigationMenu.List>
              <NavigationMenu.Item value="home">
                <NavigationMenu.Link href="#">
                  <HomeIcon widthHeight={20} />
                  <Text marginLeft={8}>Home</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item value="dashboard">
                <NavigationMenu.Link href="#">
                  <ChartIcon widthHeight={20} />
                  <Text marginLeft={8}>Dashboard</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item value="settings">
                <NavigationMenu.Trigger itemId="settings">
                  <SettingsIcon widthHeight={20} />
                  <Text marginLeft={8}>Settings</Text>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content itemId="settings">
                  <NavigationMenu.List>
                    <NavigationMenu.Item value="profile">
                      <NavigationMenu.Link href="#">
                        <UserIcon widthHeight={20} />
                        <Text marginLeft={8}>Profile</Text>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item value="notifications">
                      <NavigationMenu.Link href="#">
                        <NotificationIcon widthHeight={20} />
                        <Text marginLeft={8}>Notifications</Text>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item value="help" isDisabled>
                <NavigationMenu.Link href="#">
                  <HelpIcon widthHeight={20} />
                  <Text marginLeft={8}>Help (Disabled)</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu>
        </View>
      </View>
    </Vertical>
  );
};
