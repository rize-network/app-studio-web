import React, { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { Button } from '../../Button/Button';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { HomeIcon, SettingsIcon, UserIcon } from '../../Icon/Icon';
import { SideBarNavItem } from '../Sidebar/Sidebar.view';

export const ControlledSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View>
      <Horizontal gap={10} marginBottom={16}>
        <Button onClick={() => setIsExpanded(true)}>Expand Sidebar</Button>
        <Button onClick={() => setIsExpanded(false)}>Collapse Sidebar</Button>
        <Text>Current state: {isExpanded ? 'Expanded' : 'Collapsed'}</Text>
      </Horizontal>

      <View
        height="300px"
        position="relative"
        border="1px solid #e2e8f0"
        borderRadius="8px"
        overflow="hidden"
      >
        <Horizontal width="100%" height="100%">
          <Sidebar
            expanded={isExpanded}
            onExpandedChange={setIsExpanded}
            fixed={false}
          >
            <Sidebar.Header>
              <Text fontWeight="bold">Controlled Sidebar</Text>
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
            <Sidebar.Footer>
              <Text size="sm" color="color.gray.500">
                Controlled via state
              </Text>
            </Sidebar.Footer>
          </Sidebar>
          <View flex="1" padding="16px" backgroundColor="color.gray.50">
            <Text>Main Content</Text>
            <Text marginTop={8}>
              The sidebar is controlled via external state. Use the buttons
              above to control it.
            </Text>
          </View>
        </Horizontal>
      </View>
    </View>
  );
};
