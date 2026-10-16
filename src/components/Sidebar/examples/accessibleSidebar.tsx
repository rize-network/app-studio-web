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
  HelpIcon,
  NotificationIcon,
} from '../../Icon/Icon';
import { Separator } from '../../Separator/Separator';
import { SideBarNavItem } from '../Sidebar/Sidebar.view';

export const AccessibleSidebar = () => {
  return (
    <View
      height="500px"
      position="relative"
      border="1px solid #e2e8f0"
      borderRadius="8px"
      overflow="hidden"
    >
      <Horizontal width="100%" height="100%">
        <Sidebar
          fixed={false}
          variant="subtle"
          elevation="medium"
          transitionPreset="bounce"
          ariaLabel="Main navigation"
          views={{
            container: {
              borderRight: 'none',
            },
            content: {
              padding: '12px',
            },
            divider: {
              marginTop: '12px',
            },
            navItem: {
              padding: '10px 12px',
              borderRadius: '6px',
              marginBottom: '4px',
              transition: 'all 0.2s ease',
            },
            navItemActive: {
              backgroundColor: 'color-blue-50',
              color: 'color-blue-600',
            },
            navItemIcon: {
              color: 'color-gray-500',
              marginRight: '12px',
            },
            navItemText: {
              fontWeight: 'medium',
            },
          }}
        >
          <Sidebar.Header>
            <Text fontWeight="bold" size="lg">
              Enhanced Sidebar
            </Text>
          </Sidebar.Header>
          <Sidebar.Content>
            <Vertical gap={2}>
              <Text
                color="color-gray-500"
                fontWeight="medium"
                marginBottom="8px"
              >
                MAIN NAVIGATION
              </Text>

              <SideBarNavItem
                icon={<HomeIcon widthHeight={20} />}
                label="Dashboard"
                isActive
                ariaLabel="Go to Dashboard"
              />
              <SideBarNavItem
                icon={<UserIcon widthHeight={20} />}
                label="Profile"
                ariaLabel="Go to Profile"
              />
              <SideBarNavItem
                icon={<NotificationIcon widthHeight={20} />}
                label="Notifications"
                ariaLabel="Go to Notifications"
                badge={3}
              />

              <Separator marginTop="12px" />

              <Text color="color-gray-500" fontWeight="medium" marginTop="8px">
                SETTINGS
              </Text>

              <SideBarNavItem
                icon={<SettingsIcon widthHeight={20} />}
                label="Preferences"
                ariaLabel="Go to Preferences"
              />
              <SideBarNavItem
                icon={<HelpIcon widthHeight={20} />}
                label="Help & Support"
                ariaLabel="Go to Help and Support"
              />
            </Vertical>
          </Sidebar.Content>
          <Sidebar.Footer>
            <Horizontal alignItems="center" gap={8}>
              <View
                width="32px"
                height="32px"
                borderRadius="full"
                backgroundColor="color-blue-100"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontWeight="bold" color="color-blue-600">
                  JS
                </Text>
              </View>
              <Vertical gap={0}>
                <Text fontWeight="medium" size="sm">
                  John Smith
                </Text>
                <Text size="xs" color="color-gray-500">
                  john@example.com
                </Text>
              </Vertical>
            </Horizontal>
          </Sidebar.Footer>
        </Sidebar>
        <View flex="1" padding="24px" backgroundColor="color-gray-50">
          <Text fontWeight="bold" size="xl" marginBottom="16px">
            Enhanced Sidebar Example
          </Text>
          <Text marginBottom="12px">
            This sidebar demonstrates the following enhancements:
          </Text>
          <Vertical gap={8} marginLeft="16px">
            <Text>• Improved accessibility with ARIA attributes</Text>
            <Text>• Custom animation with bounce transition preset</Text>
            <Text>• Medium elevation shadow effect</Text>
            <Text>• Subtle variant with section Separators</Text>
            <Text>• Enhanced navigation items with badges</Text>
          </Vertical>
        </View>
      </Horizontal>
    </View>
  );
};
