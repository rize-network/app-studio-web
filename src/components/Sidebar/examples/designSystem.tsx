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
                <Text
                  fontWeight="600"
                  size="lg"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                >
                  Design System
                </Text>
              </Sidebar.Header>
              <Sidebar.Content>
                <Vertical gap={8}>
                  <NavItem
                    icon={<HomeIcon widthHeight={20} />}
                    label="Home"
                    isActive
                  />
                  <NavItem
                    icon={<ChartIcon widthHeight={20} />}
                    label="Dashboard"
                  />
                  <NavItem
                    icon={<UserIcon widthHeight={20} />}
                    label="Profile"
                  />
                  <NavItem
                    icon={<NotificationIcon widthHeight={20} />}
                    label="Notifications"
                  />
                  <NavItem
                    icon={<SettingsIcon widthHeight={20} />}
                    label="Settings"
                  />
                  <NavItem
                    icon={<DocumentIcon widthHeight={20} />}
                    label="Documents"
                  />
                  <NavItem
                    icon={<SearchIcon widthHeight={20} />}
                    label="Search"
                  />
                  <NavItem
                    icon={<StarIcon widthHeight={20} />}
                    label="Favorites"
                  />
                  <NavItem
                    icon={<HelpIcon widthHeight={20} />}
                    label="Help"
                    isDisabled
                  />
                </Vertical>
              </Sidebar.Content>
              <Sidebar.Footer>
                <Text
                  size="sm"
                  color="color.gray.500"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                >
                  © 2023 Design System
                </Text>
              </Sidebar.Footer>
            </Sidebar>
            <View flex="1" padding="16px" backgroundColor="color.gray.50">
              <Text
                fontWeight="600"
                size="xl"
                marginBottom="16px"
                fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
              >
                Main Content
              </Text>
              <Text fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif">
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
                  <NavItem
                    icon={<HomeIcon widthHeight={16} />}
                    label="Home"
                    isActive
                    size="sm"
                  />
                  <NavItem
                    icon={<UserIcon widthHeight={16} />}
                    label="Profile"
                    size="sm"
                  />
                  <NavItem
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
                  <NavItem
                    icon={<HomeIcon widthHeight={24} />}
                    label="Home"
                    isActive
                    size="lg"
                  />
                  <NavItem
                    icon={<UserIcon widthHeight={24} />}
                    label="Profile"
                    size="lg"
                  />
                  <NavItem
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

// NavItem component with design system styling
const NavItem = ({
  icon,
  label,
  isActive = false,
  isDisabled = false,
  size = 'md',
}: any) => {
  // Size-based styles
  const sizeStyles: any = {
    sm: {
      padding: '6px 10px', // 1.5×4px and 2.5×4px grid
      gap: 8, // 2×4px grid
      fontSize: '14px',
    },
    md: {
      padding: '8px 12px', // 2×4px and 3×4px grid
      gap: 12, // 3×4px grid
      fontSize: '16px',
    },
    lg: {
      padding: '10px 16px', // 2.5×4px and 4×4px grid
      gap: 16, // 4×4px grid
      fontSize: '18px',
    },
  };

  return (
    <Horizontal
      alignItems="center"
      gap={sizeStyles[size].gap}
      padding={sizeStyles[size].padding}
      borderRadius="4px"
      backgroundColor={isActive ? 'color.blue.50' : 'transparent'}
      color={
        isActive
          ? 'color.blue.700'
          : isDisabled
          ? 'color.gray.400'
          : 'color.gray.700'
      }
      fontWeight={isActive ? '600' : '500'}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      opacity={isDisabled ? 0.6 : 1}
      transition="all 0.2s ease"
      borderLeftWidth={isActive ? '3px' : '0px'}
      borderLeftStyle="solid"
      borderLeftColor="color.blue.600"
      fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
      fontSize={sizeStyles[size].fontSize}
      _hover={
        !isDisabled
          ? {
              backgroundColor: isActive ? 'color.blue.50' : 'color.gray.100',
            }
          : {}
      }
    >
      <View
        color={
          isActive
            ? 'color.blue.600'
            : isDisabled
            ? 'color.gray.400'
            : 'color.gray.500'
        }
        transition="color 0.2s ease"
      >
        {icon}
      </View>
      <Text>{label}</Text>
    </Horizontal>
  );
};
