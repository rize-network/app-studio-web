import React from 'react';
import { View, Text, useTheme } from 'app-studio';
import {
  Default,
  StylesTabs,
  CompoundTabs,
  CustomHeaderExample,
  ControlledTabs,
} from 'src/components/Tabs/examples';

const TabsPage = () => {
  const { themeMode } = useTheme();

  const sections = {
    'Default Usage': <Default />,
    'Controlled Component': <ControlledTabs />,
    'Styled Variations': <StylesTabs />,
    'Compound Pattern': <CompoundTabs />,
    'Custom Header': <CustomHeaderExample />, // Added this since it was available but unused
  };

  return (
    <View padding={20} backgroundColor="theme-background" minHeight="100vh">
      <View gap={32} display="flex" flexDirection="column">
        {Object.entries(sections).map(([title, content]) => (
          <View
            key={title}
            backgroundColor={
              themeMode === 'light' ? 'color-white' : 'color-gray-900'
            }
            padding={32}
            borderRadius={16}
            boxShadow="0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.05)"
            borderWidth={1}
            borderColor={
              themeMode === 'light' ? 'color-gray-100' : 'color-gray-800'
            }
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
              backgroundColor={
                themeMode === 'light' ? 'color-gray-50' : 'color-gray-800'
              }
              padding={24}
              borderRadius={12}
              borderWidth={1}
              borderColor={
                themeMode === 'light' ? 'color-gray-100' : 'color-gray-700'
              }
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
