import React from 'react';
import { Sidebar } from '../Sidebar';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { HomeIcon, SettingsIcon, UserIcon } from '../../Icon/Icon';

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
                  <NavItem
                    icon={<HomeIcon widthHeight={20} />}
                    label="Home"
                    isActive
                  />
                  <NavItem
                    icon={<UserIcon widthHeight={20} />}
                    label="Profile"
                  />
                  <NavItem
                    icon={<SettingsIcon widthHeight={20} />}
                    label="Settings"
                  />
                </Vertical>
              </Sidebar.Content>
            </Sidebar>
            <View flex="1" padding="16px" backgroundColor="color.gray.50">
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
            <View flex="1" padding="16px" backgroundColor="color.gray.50">
              <Text>Main Content</Text>
            </View>
            <Sidebar position="right" fixed={false}>
              <Sidebar.Header>
                <Text fontWeight="bold">Right Sidebar</Text>
              </Sidebar.Header>
              <Sidebar.Content>
                <Vertical gap={8}>
                  <NavItem
                    icon={<HomeIcon widthHeight={20} />}
                    label="Home"
                    isActive
                  />
                  <NavItem
                    icon={<UserIcon widthHeight={20} />}
                    label="Profile"
                  />
                  <NavItem
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
