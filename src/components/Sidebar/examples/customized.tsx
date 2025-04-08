import React from 'react';
import { Sidebar } from '../Sidebar';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { HomeIcon, SettingsIcon, UserIcon } from '../../Icon/Icon';

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
              color: 'white',
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
              _hover: { backgroundColor: 'color.blue.600' },
            },
            toggleButtonIcon: {
              color: 'white',
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
              <CustomNavItem
                icon={<HomeIcon widthHeight={20} color="white" />}
                label="Home"
                isActive
              />
              <CustomNavItem
                icon={<UserIcon widthHeight={20} color="white" />}
                label="Profile"
              />
              <CustomNavItem
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

const CustomNavItem = ({ icon, label, isActive = false }: any) => (
  <Horizontal
    alignItems="center"
    gap={12}
    padding="10px 14px"
    borderRadius="6px"
    backgroundColor={isActive ? 'color.blue.600' : 'transparent'}
    color="white"
    fontWeight={isActive ? 'bold' : 'normal'}
    cursor="pointer"
    _hover={{ backgroundColor: isActive ? 'color.blue.600' : 'color.blue.700' }}
  >
    {icon}
    <Text>{label}</Text>
  </Horizontal>
);
