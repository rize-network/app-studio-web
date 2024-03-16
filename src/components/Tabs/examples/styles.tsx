import React from 'react';
import { Tabs, Text } from 'src/components';

export const StylesTabs = () => {
  const tabs = [
    {
      title: 'Product',
      value: 'product',
      content: (
        <Text heading="h5" color="white">
          Product Tab
        </Text>
      ),
    },
    {
      title: 'Services',
      value: 'services',
      content: (
        <Text heading="h5" color="white">
          Services tab
        </Text>
      ),
    },
    {
      title: 'Playground',
      value: 'playground',
      content: (
        <Text heading="h5" color="white">
          Playground tab
        </Text>
      ),
    },
    {
      title: 'Content',
      value: 'content',
      content: (
        <Text heading="h5" color="white">
          Content tab
        </Text>
      ),
    },
    {
      title: 'Random',
      value: 'random',
      content: (
        <Text heading="h5" color="white">
          Random tab
        </Text>
      ),
    },
  ];
  return (
    <Tabs
      tabs={tabs}
      styles={{
        container: { backgroundColor: 'black', borderRadius: '20px' },
        headerTabs: {
          backgroundColor: 'purple',
          width: '100%',
          borderRadius: '20px 20px 0 0',
          padding: '10px 0',
        },
        tab: {
          shape: 'rounded',
        },
        title: {
          color: 'white',
        },
        content: {
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
        activeTab: {
          variant: 'ghost',
        },
        activeText: {
          weight: 'bold',
          size: 'lg',
        },
      }}
    />
  );
};
