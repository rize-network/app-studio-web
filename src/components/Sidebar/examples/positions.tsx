import React from 'react';
import { Sidebar } from '../Sidebar';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { HomeIcon, SettingsIcon, UserIcon } from '../../Icon/Icon';
import { SideBarNavItem } from '../Sidebar/Sidebar.view';

export const SidebarPositions = () => {
  return (
    <Vertical gap={30} width="100%">
      <View>
        <Text fontWeight="bold" marginBottom={10}>
          Left Position (Default)
        </Text>
        <View
          height="300px"
          position="relative"
          border="1px solid #e2e8f0"
          borderRadius="8px"
          overflow="hidden"
        >
          <Horizontal width="100%" height="100%">
            <Sidebar position="left" fixed={false}>
              <Sidebar.Header>
                <Text fontWeight="bold">Left Sidebar</Text>
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
                    icon={<SettingsIcon widthHeight={20} />}
                    label="Settings"
                  />
                </Vertical>
              </Sidebar.Content>
            </Sidebar>
            <View flex="1" padding="16px" backgroundColor="color-gray-50">
              <Text>Main Content</Text>
            </View>
          </Horizontal>
        </View>
      </View>

      <View>
        <Text fontWeight="bold" marginBottom={10}>
          Right Position
        </Text>
        <View
          height="300px"
          position="relative"
          border="1px solid #e2e8f0"
          borderRadius="8px"
          overflow="hidden"
        >
          <Horizontal width="100%" height="100%">
            <View flex="1" padding="16px" backgroundColor="color-gray-50">
              <Text>Main Content</Text>
            </View>
            <Sidebar position="right" fixed={false}>
              <Sidebar.Header>
                <Text fontWeight="bold">Right Sidebar</Text>
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
                    icon={<SettingsIcon widthHeight={20} />}
                    label="Settings"
                  />
                </Vertical>
              </Sidebar.Content>
            </Sidebar>
          </Horizontal>
        </View>
      </View>
    </Vertical>
  );
};
