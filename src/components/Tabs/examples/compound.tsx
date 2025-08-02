import React from 'react';
import { View, Text } from 'app-studio';
import { Tabs } from '../Tabs';

/**
 * Example demonstrating the compound component pattern for Tabs
 */
export const CompoundTabs = () => {
  return (
    <View
      border="1px solid"
      borderColor="color.gray.200"
      borderRadius="8px"
      overflow="hidden"
    >
      <Tabs defaultValue="default">
        <Tabs.List>
          <Tabs.Trigger value="default">Default Usage</Tabs.Trigger>
          <Tabs.Trigger value="minimal">Minimal</Tabs.Trigger>
          <Tabs.Trigger value="customized">Customized</Tabs.Trigger>
          <Tabs.Trigger value="functions">Function Calls</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="default">
          <View>
            <Text fontSize={18} fontWeight="600" marginBottom={16}>
              Default Usage
            </Text>
            <Text color="color.gray.600">
              This demonstrates the default usage of the AgentChat component
              with all standard features enabled. The component provides a
              complete chat interface for interacting with ADK agents.
            </Text>
          </View>
        </Tabs.Content>

        <Tabs.Content value="minimal">
          <View>
            <Text fontSize={18} fontWeight="600" marginBottom={16}>
              Minimal Configuration
            </Text>
            <Text color="color.gray.600">
              This shows a minimal setup with only the essential features
              enabled. Perfect for simple chat interfaces where you don&apos;t
              need advanced features.
            </Text>
          </View>
        </Tabs.Content>

        <Tabs.Content value="customized">
          <View>
            <Text fontSize={18} fontWeight="600" marginBottom={16}>
              Customized Styling
            </Text>
            <Text color="color.gray.600">
              This example demonstrates how to customize the appearance and
              behavior of the AgentChat component to match your
              application&apos;s design system.
            </Text>
          </View>
        </Tabs.Content>

        <Tabs.Content value="functions">
          <View>
            <Text fontSize={18} fontWeight="600" marginBottom={16}>
              Function Calls Demo
            </Text>
            <Text color="color.gray.600">
              This showcases the function calling capabilities of the AgentChat
              component, including visualization of function calls and their
              results.
            </Text>
          </View>
        </Tabs.Content>
      </Tabs>
    </View>
  );
};
