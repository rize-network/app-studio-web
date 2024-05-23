# Tabs

Provides an interactive tab interface for content organization

### **Import**
  ```tsx static
  import { Tabs } from '@app-studio/web';
  ```

### **Default**
```tsx
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

```

### **styles**
"Allows for optional styling to be applied to the tabs via a TabsStyles object."

```tsx
import React from 'react';
import { Text } from 'src/components/Text/Text';
import { Tabs } from 'src/components/Tabs/Tabs';

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

```

