import React from 'react';
import {
  MoonIcon,
  ShareIcon,
  PanelIcon,
  SaveIcon,
  PauseIcon,
} from '../../Icon/Icon';
import { Text, View, useTheme } from 'app-studio';
import { Tabs } from '../Tabs';

// Example demonstrating basic usage of the Tabs component.
export const Default = () => {
  const { themeMode } = useTheme();

  const contentBg = themeMode === 'light' ? 'color-white' : 'color-gray-800';
  const dummyBg = themeMode === 'light' ? 'color-gray-100' : 'color-gray-900';
  const textColor = themeMode === 'light' ? 'color-gray-900' : 'color-gray-100';

  const renderContent = (title: string) => (
    <View
      padding={24}
      backgroundColor={contentBg}
      borderRadius={8}
      border="1px solid"
      borderColor={themeMode === 'light' ? 'color-gray-200' : 'color-gray-700'}
    >
      <Text heading="h5" color={textColor} marginBottom={16}>
        {title}
      </Text>
      <View
        height="200px"
        backgroundColor={dummyBg}
        borderRadius={8}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px dashed"
        borderColor={
          themeMode === 'light' ? 'color-gray-300' : 'color-gray-700'
        }
      >
        <Text color="color-gray-500">Dummy Content Area</Text>
      </View>
    </View>
  );

  return (
    <Tabs
      tabs={[
        {
          title: 'Product',
          icon: <MoonIcon />,
          content: renderContent('Product Tab Content'),
        },
        {
          title: 'Services',
          icon: <ShareIcon />,
          content: renderContent('Services Tab Content'),
        },
        {
          title: 'Playground',
          icon: <PanelIcon />,
          content: renderContent('Playground Tab Content'),
        },
        {
          title: 'Content',
          icon: <SaveIcon />,
          content: renderContent('Content Tab Content'),
        },
        {
          title: 'Random',
          icon: <PauseIcon />,
          content: renderContent('Random Tab Content'),
        },
      ]}
      defaultValue="Services"
      onTabChange={(activeTab) => console.log('Active Tab:', activeTab.title)}
    />
  );
};
