import React from 'react';
import { View, Text, useTheme } from 'app-studio';
import {
  DefaultDemo,
  DesignSystemAlerts,
  IconDemo,
  StylesDemo,
  VariantDemo,
} from 'src/components/Alert/examples';

const AlertPage = () => {
  const { themeMode } = useTheme();

  const sections = {
    'Design System Alerts': <DesignSystemAlerts />,
    'Default Alert': <DefaultDemo />,
    'Icon Support': <IconDemo />,
    'Variant Styles': <VariantDemo />,
    'Custom Styling': <StylesDemo />,
  };

  return (
    <View padding={20} backgroundColor="theme.background" minHeight="100vh">
      <View gap={32} display="flex" flexDirection="column">
        {Object.entries(sections).map(([title, content]) => (
          <View
            key={title}
            backgroundColor={
              themeMode === 'light' ? 'color.white' : 'color.gray.900'
            }
            padding={32}
            borderRadius={16}
            boxShadow="0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.05)"
            borderWidth={1}
            borderColor={
              themeMode === 'light' ? 'color.gray.100' : 'color.gray.800'
            }
          >
            <Text
              fontSize={20}
              marginBottom={24}
              fontWeight="600"
              color="theme.primary"
            >
              {title}
            </Text>
            <View
              backgroundColor={
                themeMode === 'light' ? 'color.gray.50' : 'color.gray.800'
              }
              padding={24}
              borderRadius={12}
              borderWidth={1}
              borderColor={
                themeMode === 'light' ? 'color.gray.100' : 'color.gray.700'
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

export default AlertPage;
