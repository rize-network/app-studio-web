import React from 'react';
import { View, Text } from 'app-studio';
import {
  Default,
  StylesTabs,
  CompoundTabs,
  CustomHeaderExample,
  ControlledTabs,
} from 'src/components/Tabs/examples';

const TabsPage = () => {
  // App-studio inverts the gray scale (and color-white / color-black) in dark
  // mode automatically — no theme branching needed.
  const sections = {
    'Default Usage': <Default />,
    'Controlled Component': <ControlledTabs />,
    'Styled Variations': <StylesTabs />,
    'Compound Pattern': <CompoundTabs />,
    'Custom Header': <CustomHeaderExample />,
  };

  return (
    <View
      padding={20}
      minHeight="100vh"
      backgroundColor="color-white"
      color="color-black"
    >
      <View gap={32} display="flex" flexDirection="column">
        {Object.entries(sections).map(([title, content]) => (
          <View
            key={title}
            backgroundColor="color-white"
            padding={32}
            borderRadius={16}
            boxShadow="0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.05)"
            borderWidth={1}
            borderColor="color-gray-100"
          >
            <Text
              fontSize={20}
              marginBottom={24}
              fontWeight="600"
              color="theme-primary"
            >
              {title}
            </Text>
            <View
              backgroundColor="color-gray-50"
              padding={24}
              borderRadius={12}
              borderWidth={1}
              borderColor="color-gray-100"
              borderStyle="dashed"
            >
              {content}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TabsPage;
