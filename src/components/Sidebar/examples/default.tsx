import React from 'react';
import { Sidebar } from '../Sidebar';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  NotificationIcon,
  HelpIcon,
} from '../../Icon/Icon';
import { SideBarNavItem } from '../Sidebar/Sidebar.view';

export const DefaultSidebar = () => {
  return (
    <View
      height="500px"
      position="relative"
      border="1px solid #e2e8f0"
      borderRadius="8px"
      overflow="hidden"
    >
      <Horizontal width="100%" height="100%">
        <Sidebar defaultExpanded={true} fixed={false}>
          <Sidebar.Header>
            <Text fontWeight="bold" size="lg">
              App Name
            </Text>
          </Sidebar.Header>
          <Sidebar.Content>
            <Vertical gap={8}>
              <SideBarNavItem
                icon={<HomeIcon widthHeight={20} />}
                label="Home"
                isActive
              />
              <SideBarNavItem
                icon={<UserIcon widthHeight={20} />}
                label="Profile"
              />
              <SideBarNavItem
                icon={<NotificationIcon widthHeight={20} />}
                label="Notifications"
              />
              <SideBarNavItem
                icon={<SettingsIcon widthHeight={20} />}
                label="Settings"
              />
              <SideBarNavItem
                icon={<HelpIcon widthHeight={20} />}
                label="Help"
              />
            </Vertical>
          </Sidebar.Content>
          <Sidebar.Footer>
            <Text size="sm" color="color-gray-500">
              © 2023 App Studio
            </Text>
          </Sidebar.Footer>
        </Sidebar>
        <View flex="1" padding="16px" backgroundColor="color-gray-50">
          <Text fontWeight="bold" size="xl" marginBottom="16px">
            Main Content
          </Text>
          <Text>
            This is the main content area. It will adjust based on the sidebar
            state.
          </Text>
        </View>
      </Horizontal>
    </View>
  );
};
