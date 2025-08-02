import React from 'react';
import { View, Vertical, Text, Horizontal } from 'app-studio';
import { AuthGuard, AuthStatus } from '../../components/AuthGuard';
import {
  DefaultDemo as AgentChatDemo,
  MinimalDemo as AgentChatMinimal,
  CustomizedDemo as AgentChatCustomized,
  FunctionCallsDemo as AgentChatFunctions,
} from '../../components/adk/AgentChat/examples/default';

import {
  DefaultDemo as AgentSessionDemo,
  CompactDemo as AgentSessionCompact,
  CustomizedDemo as AgentSessionCustomized,
  MockDataDemo as AgentSessionMockData,
} from '../../components/adk/AgentSession/examples/default';

import {
  DefaultDemo as AgentTraceDemo,
  MockDataDemo as AgentTraceMockData,
  CompactDemo as AgentTraceCompact,
  CustomizedDemo as AgentTraceCustomized,
} from '../../components/adk/AgentTrace/examples/default';

import {
  DefaultDemo as AgentEvalDemo,
  MockDataDemo as AgentEvalMockData,
  CompactDemo as AgentEvalCompact,
  CustomizedDemo as AgentEvalCustomized,
} from '../../components/adk/AgentEval/examples/default';
import { Tabs } from 'src/components';

/**
 * ADK Components Demo Page
 *
 * Comprehensive showcase of all ADK-compatible React components
 */
const ADKComponentsPage: React.FC = () => {
  return (
    <AuthGuard>
      <View padding={20} backgroundColor="color.gray.100" minHeight="100vh">
        <Vertical gap={32} maxWidth="1400px" margin="0 auto">
          {/* Header */}
          <Vertical gap={16}>
            <Horizontal justifyContent="space-between" alignItems="flex-start">
              <Vertical gap={8}>
                <Text fontSize={36} fontWeight="700" color="color.gray.900">
                  ADK Agent Components
                </Text>
                <Text fontSize={20} color="color.gray.600" lineHeight={1.6}>
                  Complete React component library for building ADK-compatible
                  applications. These components provide seamless integration
                  with the Agent Development Kit (ADK) ecosystem.
                </Text>
              </Vertical>
              <AuthStatus />
            </Horizontal>
          </Vertical>

          {/* Overview */}
          <View
            padding={24}
            backgroundColor="color.white"
            borderRadius="12px"
            border="1px solid"
            borderColor="color.gray.200"
          >
            <Text fontSize={24} fontWeight="600" marginBottom={16}>
              Component Overview
            </Text>

            <Vertical gap={16}>
              <Horizontal gap={16} alignItems="flex-start">
                <View
                  width="60px"
                  height="60px"
                  backgroundColor="color.blue.500"
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={24}>💬</Text>
                </View>
                <Vertical gap={4} flex={1}>
                  <Text fontSize={18} fontWeight="600">
                    AgentChat
                  </Text>
                  <Text color="color.gray.600">
                    Complete chat interface for ADK agents with real-time
                    messaging, file uploads, function calls, code execution, and
                    streaming responses.
                  </Text>
                </Vertical>
              </Horizontal>

              <Horizontal gap={16} alignItems="flex-start">
                <View
                  width="60px"
                  height="60px"
                  backgroundColor="color.green.500"
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={24}>📋</Text>
                </View>
                <Vertical gap={4} flex={1}>
                  <Text fontSize={18} fontWeight="600">
                    AgentSession
                  </Text>
                  <Text color="color.gray.600">
                    Session management interface for creating, listing,
                    importing, exporting, and organizing agent conversations and
                    interactions.
                  </Text>
                </Vertical>
              </Horizontal>

              <Horizontal gap={16} alignItems="flex-start">
                <View
                  width="60px"
                  height="60px"
                  backgroundColor="color.purple.500"
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={24}>📊</Text>
                </View>
                <Vertical gap={4} flex={1}>
                  <Text fontSize={18} fontWeight="600">
                    AgentTrace
                  </Text>
                  <Text color="color.gray.600">
                    Comprehensive trace visualization for monitoring agent
                    execution, performance metrics, event timelines, and
                    debugging information.
                  </Text>
                </Vertical>
              </Horizontal>

              <Horizontal gap={16} alignItems="flex-start">
                <View
                  width="60px"
                  height="60px"
                  backgroundColor="color.orange.500"
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={24}>🧪</Text>
                </View>
                <Vertical gap={4} flex={1}>
                  <Text fontSize={18} fontWeight="600">
                    AgentEval
                  </Text>
                  <Text color="color.gray.600">
                    Evaluation framework for testing agent performance, running
                    test suites, analyzing results, and comparing different
                    agent configurations.
                  </Text>
                </Vertical>
              </Horizontal>
            </Vertical>
          </View>

          {/* Component Demos */}
          <View
            backgroundColor="color.white"
            borderRadius="12px"
            border="1px solid"
            borderColor="color.gray.200"
            overflow="hidden"
          >
            <Tabs defaultValue="agentchat">
              <Tabs.List>
                <Tabs.Trigger value="agentchat">AgentChat</Tabs.Trigger>
                <Tabs.Trigger value="agentsession">AgentSession</Tabs.Trigger>
                <Tabs.Trigger value="agenttrace">AgentTrace</Tabs.Trigger>
                <Tabs.Trigger value="agenteval">AgentEval</Tabs.Trigger>
              </Tabs.List>

              {/* AgentChat Demos */}
              <Tabs.Content value="agentchat">
                <Tabs defaultValue="default">
                  <Tabs.List>
                    <Tabs.Trigger value="default">Default</Tabs.Trigger>
                    <Tabs.Trigger value="minimal">Minimal</Tabs.Trigger>
                    <Tabs.Trigger value="customized">Customized</Tabs.Trigger>
                    <Tabs.Trigger value="functions">
                      Function Calls
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="default">
                    <AgentChatDemo />
                  </Tabs.Content>

                  <Tabs.Content value="minimal">
                    <AgentChatMinimal />
                  </Tabs.Content>

                  <Tabs.Content value="customized">
                    <AgentChatCustomized />
                  </Tabs.Content>

                  <Tabs.Content value="functions">
                    <AgentChatFunctions />
                  </Tabs.Content>
                </Tabs>
              </Tabs.Content>

              {/* AgentSession Demos */}
              <Tabs.Content value="agentsession">
                <Tabs defaultValue="default">
                  <Tabs.List>
                    <Tabs.Trigger value="default">Default</Tabs.Trigger>
                    <Tabs.Trigger value="compact">Compact</Tabs.Trigger>
                    <Tabs.Trigger value="customized">Customized</Tabs.Trigger>
                    <Tabs.Trigger value="mockdata">Mock Data</Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="default">
                    <AgentSessionDemo />
                  </Tabs.Content>

                  <Tabs.Content value="compact">
                    <AgentSessionCompact />
                  </Tabs.Content>

                  <Tabs.Content value="customized">
                    <AgentSessionCustomized />
                  </Tabs.Content>

                  <Tabs.Content value="mockdata">
                    <AgentSessionMockData />
                  </Tabs.Content>
                </Tabs>
              </Tabs.Content>

              {/* AgentTrace Demos */}
              <Tabs.Content value="agenttrace">
                <Tabs defaultValue="default">
                  <Tabs.List>
                    <Tabs.Trigger value="default">Default</Tabs.Trigger>
                    <Tabs.Trigger value="mockdata">Mock Data</Tabs.Trigger>
                    <Tabs.Trigger value="compact">Compact</Tabs.Trigger>
                    <Tabs.Trigger value="customized">Customized</Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="default">
                    <AgentTraceDemo />
                  </Tabs.Content>

                  <Tabs.Content value="mockdata">
                    <AgentTraceMockData />
                  </Tabs.Content>

                  <Tabs.Content value="compact">
                    <AgentTraceCompact />
                  </Tabs.Content>

                  <Tabs.Content value="customized">
                    <AgentTraceCustomized />
                  </Tabs.Content>
                </Tabs>
              </Tabs.Content>

              {/* AgentEval Demos */}
              <Tabs.Content value="agenteval">
                <Tabs defaultValue="default">
                  <Tabs.List>
                    <Tabs.Trigger value="default">Default</Tabs.Trigger>
                    <Tabs.Trigger value="mockdata">Mock Data</Tabs.Trigger>
                    <Tabs.Trigger value="compact">Compact</Tabs.Trigger>
                    <Tabs.Trigger value="customized">Customized</Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="default">
                    <AgentEvalDemo />
                  </Tabs.Content>

                  <Tabs.Content value="mockdata">
                    <AgentEvalMockData />
                  </Tabs.Content>

                  <Tabs.Content value="compact">
                    <AgentEvalCompact />
                  </Tabs.Content>

                  <Tabs.Content value="customized">
                    <AgentEvalCustomized />
                  </Tabs.Content>
                </Tabs>
              </Tabs.Content>
            </Tabs>
          </View>

          {/* Integration Guide */}
          <View
            padding={24}
            backgroundColor="color.blue.50"
            borderRadius="12px"
            border="1px solid"
            borderColor="color.blue.200"
          >
            <Text
              fontSize={24}
              fontWeight="600"
              marginBottom={16}
              color="color.blue.900"
            >
              Quick Start Integration
            </Text>

            <Vertical gap={16}>
              <Text color="color.blue.800">
                Get started with ADK components in your React application:
              </Text>

              <View
                padding={16}
                backgroundColor="color.white"
                borderRadius="8px"
                fontFamily="Monaco, Consolas, monospace"
                fontSize="14px"
              >
                <Text>
                  {`// 1. Import components
import { AgentChat, AgentSession, AgentTrace, AgentEval } from '@app-studio/web';

// 2. Use in your application
function MyApp() {
  return (
    <div>
      <AgentChat
        appName="my-agent"
        userId="user123"
        enableFileUpload={true}
        enableStreaming={true}
      />
    </div>
  );
}`}
                </Text>
              </View>

              <Text color="color.blue.800">
                All components are fully compatible with the ADK backend and
                follow the same API patterns as the original adk-web Angular
                application.
              </Text>
            </Vertical>
          </View>
        </Vertical>
      </View>
    </AuthGuard>
  );
};

export default ADKComponentsPage;
