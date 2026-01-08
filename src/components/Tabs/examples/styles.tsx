import React from 'react';
import { Text, useTheme } from 'app-studio'; // Adjust path as needed
import { Tabs } from '../../Tabs/Tabs'; // Adjust path as needed

// Example demonstrating how to style the Tabs component using the 'styles' prop.
export const StylesTabs = () => {
  const { themeMode } = useTheme();

  // Custom styling tokens based on theme
  const customColors =
    themeMode === 'light'
      ? {
          containerBg: 'color.indigo.50',
          headerBg: 'color.indigo.100',
          tabColor: 'color.indigo.600',
          activeTabBg: 'color.white',
          activeTabColor: 'color.indigo.600',
          contentBg: 'color.white',
          contentBorder: 'color.indigo.200',
        }
      : {
          containerBg: 'color.gray.900',
          headerBg: 'color.gray.800',
          tabColor: 'color.gray.400',
          activeTabBg: 'color.gray.700',
          activeTabColor: 'color.white',
          contentBg: 'color.gray.800',
          contentBorder: 'color.gray.700',
        };

  const tabs = [
    {
      title: 'Product',
      value: 'product',
      content: (
        <Text
          heading="h5"
          color={themeMode === 'light' ? 'color.gray.800' : 'color.white'}
        >
          Product Tab Content
        </Text>
      ),
    },
    {
      title: 'Services',
      value: 'services',
      content: (
        <Text
          heading="h5"
          color={themeMode === 'light' ? 'color.gray.800' : 'color.white'}
        >
          Services Tab Content
        </Text>
      ),
    },
    {
      title: 'Playground',
      value: 'playground',
      content: (
        <Text
          heading="h5"
          color={themeMode === 'light' ? 'color.gray.800' : 'color.white'}
        >
          Playground Tab Content
        </Text>
      ),
    },
    {
      title: 'Content',
      value: 'content',
      content: (
        <Text
          heading="h5"
          color={themeMode === 'light' ? 'color.gray.800' : 'color.white'}
        >
          Content Tab Content
        </Text>
      ),
    },
    {
      title: 'Random',
      value: 'random',
      content: (
        <Text
          heading="h5"
          color={themeMode === 'light' ? 'color.gray.800' : 'color.white'}
        >
          Random Tab Content
        </Text>
      ),
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      defaultValue="playground"
      views={{
        container: {
          backgroundColor: customColors.containerBg,
          borderRadius: '16px',
          padding: '8px',
          border: '1px solid',
          borderColor: customColors.contentBorder,
        },
        headerTabs: {
          backgroundColor: customColors.headerBg,
          width: '100%',
          borderRadius: '12px',
          padding: '4px',
          display: 'flex',
          gap: '4px',
        },
        // Styles for each individual tab button (inactive state)
        tab: {
          borderRadius: '8px',
          backgroundColor: 'transparent',
          color: customColors.tabColor,
          flexGrow: 1,
          padding: '8px 16px',
          transition: 'all 0.2s',
        },
        // Styles specifically for the active tab button (merged with 'tab' styles)
        activeTab: {
          backgroundColor: customColors.activeTabBg,
          color: customColors.activeTabColor,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
        // Styles for the text inside any tab button
        title: {
          fontWeight: '500',
        },
        // Styles specifically for the text inside the active tab button (merged with 'title' styles)
        activeText: {
          fontWeight: '600',
        },
        // Styles for the content area below the tabs
        content: {
          height: '200px',
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: customColors.contentBg,
          borderRadius: '12px',
          border: '1px solid',
          borderColor: customColors.contentBorder,
        },
      }}
    />
  );
};
