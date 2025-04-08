import React from 'react';
import { Sidebar } from '../Sidebar';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  NotificationIcon,
  HelpIcon,
} from '../../Icon/Icon';

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
              <NavItem
                icon={<HomeIcon widthHeight={20} />}
                label="Home"
                isActive
              />
              <NavItem icon={<UserIcon widthHeight={20} />} label="Profile" />
              <NavItem
                icon={<NotificationIcon widthHeight={20} />}
                label="Notifications"
              />
              <NavItem
                icon={<SettingsIcon widthHeight={20} />}
                label="Settings"
              />
              <NavItem icon={<HelpIcon widthHeight={20} />} label="Help" />
            </Vertical>
          </Sidebar.Content>
          <Sidebar.Footer>
            <Text size="sm" color="color.gray.500">
              © 2023 App Studio
            </Text>
          </Sidebar.Footer>
        </Sidebar>
        <View flex="1" padding="16px" backgroundColor="color.gray.50">
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

const NavItem = ({ icon, label, isActive = false }: any) => (
  <Horizontal
    alignItems="center"
    gap={12}
    padding="8px 12px"
    borderRadius="4px"
    backgroundColor={isActive ? 'color.blue.50' : 'transparent'}
    color={isActive ? 'color.blue.600' : 'color.gray.700'}
    fontWeight={isActive ? 'bold' : 'normal'}
    cursor="pointer"
    _hover={{ backgroundColor: isActive ? 'color.blue.50' : 'color.gray.100' }}
  >
    {icon}
    <Text>{label}</Text>
  </Horizontal>
);
