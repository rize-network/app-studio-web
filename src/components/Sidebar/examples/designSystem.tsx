/**
 * Sidebar Examples - Design System
 *
 * Showcases the Sidebar component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Sidebar } from '../Sidebar';
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
import { SideBarNavItem } from '../Sidebar/Sidebar.view';

export const DesignSystemSidebar = () => {
  return (
    <Vertical gap={32} width="100%">
      {/* Basic Sidebar with Design System Styling */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Basic Sidebar
        </Text>
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
                <Text fontWeight="600" size="lg">
                  Design System
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
                    icon={<ChartIcon widthHeight={20} />}
                    label="Dashboard"
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
                    icon={<DocumentIcon widthHeight={20} />}
                    label="Documents"
                  />
                  <SideBarNavItem
                    icon={<SearchIcon widthHeight={20} />}
                    label="Search"
                  />
                  <SideBarNavItem
                    icon={<StarIcon widthHeight={20} />}
                    label="Favorites"
                  />
                  <SideBarNavItem
                    icon={<HelpIcon widthHeight={20} />}
                    label="Help"
                    isDisabled
                  />
                </Vertical>
              </Sidebar.Content>
              <Sidebar.Footer>
                <Text size="sm" color="color-gray-500">
                  © 2023 Design System
                </Text>
              </Sidebar.Footer>
            </Sidebar>
            <View flex="1" padding="16px" backgroundColor="color-gray-50">
              <Text fontWeight="600" size="xl" marginBottom="16px">
                Main Content
              </Text>
              <Text>
                This is the main content area. It will adjust based on the
                sidebar state. The sidebar follows the design system guidelines
                with consistent typography, spacing, colors, and animations.
              </Text>
            </View>
          </Horizontal>
        </View>
      </View>

      {/* Sidebar Variants */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Sidebar Variants
        </Text>
        <Horizontal gap={16} alignItems="flex-start">
          {/* Default Variant */}
          <View
            height="400px"
            width="250px"
            position="relative"
            border="1px solid #e2e8f0"
            borderRadius="8px"
            overflow="hidden"
          >
            <Sidebar
              variant="default"
              fixed={false}
              defaultExpanded={true}
              expandedWidth="250px"
            >
              <Sidebar.Header>
                <Text fontWeight="600">Default</Text>
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
          </View>

          {/* Filled Variant */}
          <View
            height="400px"
            width="250px"
            position="relative"
            border="1px solid #e2e8f0"
            borderRadius="8px"
            overflow="hidden"
          >
            <Sidebar
              variant="filled"
              fixed={false}
              defaultExpanded={true}
              expandedWidth="250px"
            >
              <Sidebar.Header>
                <Text fontWeight="600">Filled</Text>
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
          </View>

          {/* Outline Variant */}
          <View
            height="400px"
            width="250px"
            position="relative"
            border="1px solid #e2e8f0"
            borderRadius="8px"
            overflow="hidden"
          >
            <Sidebar
              variant="outline"
              fixed={false}
              defaultExpanded={true}
              expandedWidth="250px"
            >
              <Sidebar.Header>
                <Text fontWeight="600">Outline</Text>
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
          </View>
        </Horizontal>
      </View>

      {/* Sidebar Sizes */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Sidebar Sizes
        </Text>
        <Horizontal gap={16} alignItems="flex-start">
          {/* Small Size */}
          <View
            height="400px"
            width="220px"
            position="relative"
            border="1px solid #e2e8f0"
            borderRadius="8px"
            overflow="hidden"
          >
            <Sidebar
              size="sm"
              fixed={false}
              defaultExpanded={true}
              expandedWidth="220px"
            >
              <Sidebar.Header>
                <Text fontWeight="600">Small</Text>
              </Sidebar.Header>
              <Sidebar.Content>
                <Vertical gap={8}>
                  <SideBarNavItem
                    icon={<HomeIcon widthHeight={16} />}
                    label="Home"
                    isActive
                    size="sm"
                  />
                  <SideBarNavItem
                    icon={<UserIcon widthHeight={16} />}
                    label="Profile"
                    size="sm"
                  />
                  <SideBarNavItem
                    icon={<SettingsIcon widthHeight={16} />}
                    label="Settings"
                    size="sm"
                  />
                </Vertical>
              </Sidebar.Content>
            </Sidebar>
          </View>

          {/* Medium Size */}
          <View
            height="400px"
            width="280px"
            position="relative"
            border="1px solid #e2e8f0"
            borderRadius="8px"
            overflow="hidden"
          >
            <Sidebar
              size="md"
              fixed={false}
              defaultExpanded={true}
              expandedWidth="280px"
            >
              <Sidebar.Header>
                <Text fontWeight="600">Medium</Text>
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
          </View>

          {/* Large Size */}
          <View
            height="400px"
            width="320px"
            position="relative"
            border="1px solid #e2e8f0"
            borderRadius="8px"
            overflow="hidden"
          >
            <Sidebar
              size="lg"
              fixed={false}
              defaultExpanded={true}
              expandedWidth="320px"
            >
              <Sidebar.Header>
                <Text fontWeight="600">Large</Text>
              </Sidebar.Header>
              <Sidebar.Content>
                <Vertical gap={8}>
                  <SideBarNavItem
                    icon={<HomeIcon widthHeight={24} />}
                    label="Home"
                    isActive
                    size="lg"
                  />
                  <SideBarNavItem
                    icon={<UserIcon widthHeight={24} />}
                    label="Profile"
                    size="lg"
                  />
                  <SideBarNavItem
                    icon={<SettingsIcon widthHeight={24} />}
                    label="Settings"
                    size="lg"
                  />
                </Vertical>
              </Sidebar.Content>
            </Sidebar>
          </View>
        </Horizontal>
      </View>

      {/* Collapsed State */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Collapsed State
        </Text>
        <View
          height="400px"
          position="relative"
          border="1px solid #e2e8f0"
          borderRadius="8px"
          overflow="hidden"
        >
          <Horizontal width="100%" height="100%">
            <Sidebar defaultExpanded={false} fixed={false}>
              <Sidebar.Header>
                <Text fontWeight="600">App</Text>
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
              <Text fontWeight="600" size="xl" marginBottom="16px">
                Main Content
              </Text>
              <Text>
                The sidebar is collapsed by default. Click the toggle button to
                expand it.
              </Text>
            </View>
          </Horizontal>
        </View>
      </View>
    </Vertical>
  );
};
