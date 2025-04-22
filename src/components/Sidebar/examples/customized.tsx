import React from 'react';
import { Sidebar } from '../Sidebar';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { HomeIcon, SettingsIcon, UserIcon } from '../../Icon/Icon';
import { SideBarNavItem } from '../Sidebar/Sidebar.view';

export const CustomizedSidebar = () => {
  return (
    <View
      height="400px"
      position="relative"
      border="1px solid #e2e8f0"
      borderRadius="8px"
      overflow="hidden"
    >
      <Horizontal width="100%" height="100%">
        <Sidebar
          fixed={false}
          expandedWidth="300px"
          collapsedWidth="80px"
          views={{
            container: {
              backgroundColor: 'color.blue.800',
              color: 'color.white',
              borderRight: 'none',
            },
            header: {
              borderBottomColor: 'color.blue.700',
              backgroundColor: 'color.blue.900',
            },
            content: {
              padding: '20px',
            },
            footer: {
              borderTopColor: 'color.blue.700',
              backgroundColor: 'color.blue.900',
            },
            toggleButton: {
              backgroundColor: 'color.blue.700',
              on: {
                hover: { backgroundColor: 'color.blue.600' },
              },
            },
            toggleButtonIcon: {
              color: 'color.white',
            },
          }}
        >
          <Sidebar.Header>
            <Text fontWeight="bold" size="lg">
              Custom Theme
            </Text>
          </Sidebar.Header>
          <Sidebar.Content>
            <Vertical gap={12}>
              <SideBarNavItem
                icon={<HomeIcon widthHeight={20} color="white" />}
                label="Home"
                isActive
              />
              <SideBarNavItem
                icon={<UserIcon widthHeight={20} color="white" />}
                label="Profile"
              />
              <SideBarNavItem
                icon={<SettingsIcon widthHeight={20} color="white" />}
                label="Settings"
              />
            </Vertical>
          </Sidebar.Content>
          <Sidebar.Footer>
            <Text size="sm" color="color.blue.300">
              Custom themed sidebar
            </Text>
          </Sidebar.Footer>
        </Sidebar>
        <View flex="1" padding="16px" backgroundColor="color.gray.50">
          <Text fontWeight="bold" size="xl" marginBottom="16px">
            Main Content
          </Text>
          <Text>
            This sidebar has custom styling applied through the views prop.
          </Text>
        </View>
      </Horizontal>
    </View>
  );
};
