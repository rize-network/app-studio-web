import React from 'react';
import {
  MoonIcon,
  ShareIcon,
  PanelIcon,
  SaveIcon,
  PauseIcon,
} from '../../Icon/Icon'; // Assuming components are exported from index
import { Text, View } from 'app-studio';
import { Tabs } from '../Tabs';

// Example demonstrating basic usage of the Tabs component.
export const Default = () => (
  <Tabs
    // Add a unique 'value' to each tab
    tabs={[
      {
        title: 'Product',
        icon: <MoonIcon />,
        content: (
          <View backgroundColor={'purple'} padding="20px 20px 0">
            <Text heading="h5" color="white">
              Product Tab Content
            </Text>
            <DummyContent />
          </View>
        ),
      },
      {
        title: 'Services',
        icon: <ShareIcon />,
        content: (
          <View backgroundColor={'purple'} padding="20px 20px 0">
            <Text heading="h5" color="white">
              Services Tab Content
            </Text>
            <DummyContent />
          </View>
        ),
      },
      {
        title: 'Playground',
        icon: <PanelIcon />,
        content: (
          <View backgroundColor={'purple'} padding="20px 20px 0">
            <Text heading="h5" color="white">
              Playground Tab Content
            </Text>
            <DummyContent />
          </View>
        ),
      },
      {
        title: 'Content',
        icon: <SaveIcon />,
        content: (
          <View backgroundColor={'purple'} padding="20px 20px 0">
            <Text heading="h5" color="white">
              Content Tab Content
            </Text>
            <DummyContent />
          </View>
        ),
      },
      {
        title: 'Random',
        icon: <PauseIcon />,
        content: (
          <View backgroundColor={'purple'} padding="20px 20px 0">
            <Text heading="h5" color="white">
              Random Tab Content
            </Text>
            <DummyContent />
          </View>
        ),
      },
    ]}
    // Optionally set the initially active tab
    defaultValue="Services"
    // Optionally listen for tab changes
    onTabChange={(activeTab) => console.log('Active Tab:', activeTab.title)}
  />
);

// Simple placeholder content component
const DummyContent = () => {
  return (
    <View
      marginTop="20px"
      borderRadius="8px"
      height="300px"
      backgroundColor={'black'}
      // Added content for visibility
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="grey">Dummy Content Area</Text>
    </View>
  );
};
