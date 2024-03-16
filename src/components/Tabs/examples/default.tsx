import React from 'react';
import { Tabs, View, Text } from 'src/components';

export const Default = () => (
  <Tabs
    tabs={[
      {
        title: 'Product',
        value: 'product',
        content: (
          <View
            backgroundColor={'purple'}
            borderRadius={10}
            padding="20px 20px 0"
          >
            <Text heading="h5" color="white">
              Product Tab
            </Text>
            <DummyContent />
          </View>
        ),
      },
      {
        title: 'Services',
        value: 'services',
        content: (
          <View
            backgroundColor={'purple'}
            borderRadius={10}
            padding="20px 20px 0"
          >
            <Text heading="h5" color="white">
              Services tab
            </Text>
            <DummyContent />
          </View>
        ),
      },
      {
        title: 'Playground',
        value: 'playground',
        content: (
          <View
            backgroundColor={'purple'}
            borderRadius={10}
            padding="20px 20px 0"
          >
            <Text heading="h5" color="white">
              Playground tab
            </Text>
            <DummyContent />
          </View>
        ),
      },
      {
        title: 'Content',
        value: 'content',
        content: (
          <View
            backgroundColor={'purple'}
            borderRadius={10}
            padding="20px 20px 0"
          >
            <Text heading="h5" color="white">
              Content tab
            </Text>
            <DummyContent />
          </View>
        ),
      },
      {
        title: 'Random',
        value: 'random',
        content: (
          <View
            backgroundColor={'purple'}
            borderRadius={10}
            padding="20px 20px 0"
          >
            <Text heading="h5" color="white">
              Random tab
            </Text>
            <DummyContent />
          </View>
        ),
      },
    ]}
  />
);

const DummyContent = () => {
  return (
    <View
      marginTop="20px"
      borderRadius="8px"
      height="300px"
      backgroundColor={'black'}
    ></View>
  );
};
