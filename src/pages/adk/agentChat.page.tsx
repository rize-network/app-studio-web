import React from 'react';
import { View, Vertical, Text, Horizontal } from 'app-studio';
import { AuthGuard, AuthStatus } from '../../components/AuthGuard';
import {
  DefaultDemo,
  MinimalDemo,
  CustomizedDemo,
  FunctionCallsDemo,
} from '../../components/adk/AgentChat/examples/default';
import { Tabs } from 'src/components';

/**
 * AgentChat Component Demo Page
 *
 * Showcases the AgentChat component with various configurations and use cases
 */
const AgentChatPage: React.FC = () => {
  return (
    <AuthGuard>
      <View padding={20} backgroundColor="color.gray.100" minHeight="100vh">
        <Vertical gap={32} maxWidth="1200px" margin="0 auto">
          {/* Header */}
          <Vertical gap={16}>
            <Horizontal justifyContent="space-between" alignItems="flex-start">
              <Vertical gap={8}>
                <Text fontSize={32} fontWeight="700" color="color.gray.900">
                  AgentChat Component
                </Text>
                <Text fontSize={18} color="color.gray.600" lineHeight={1.6}>
                  A comprehensive chat interface for interacting with ADK (Agent
                  Development Kit) agents. Supports real-time messaging, file
                  uploads, function calls, code execution, and more.
                </Text>
              </Vertical>
              <AuthStatus />
            </Horizontal>
          </Vertical>

          {/* Features Overview */}
          <View
            padding={24}
            backgroundColor="color.white"
            borderRadius="12px"
            border="1px solid"
            borderColor="color.gray.200"
          >
            <Text fontSize={20} fontWeight="600" marginBottom={16}>
              Key Features
            </Text>
            <Vertical gap={12}>
              <Horizontal gap={12} alignItems="center">
                <Text fontSize={16}>💬</Text>
                <Text>
                  Real-time chat with ADK agents via Server-Sent Events (SSE)
                </Text>
              </Horizontal>
              <Horizontal gap={12} alignItems="center">
                <Text fontSize={16}>📎</Text>
                <Text>
                  File upload support (images, videos, audio, documents)
                </Text>
              </Horizontal>
              <Horizontal gap={12} alignItems="center">
                <Text fontSize={16}>🔧</Text>
                <Text>Function call visualization and execution</Text>
              </Horizontal>
              <Horizontal gap={12} alignItems="center">
                <Text fontSize={16}>💻</Text>
                <Text>Code execution and result display</Text>
              </Horizontal>
              <Horizontal gap={12} alignItems="center">
                <Text fontSize={16}>💭</Text>
                <Text>Agent thought process visualization</Text>
              </Horizontal>
              <Horizontal gap={12} alignItems="center">
                <Text fontSize={16}>📊</Text>
                <Text>Evaluation and scoring support</Text>
              </Horizontal>
              <Horizontal gap={12} alignItems="center">
                <Text fontSize={16}>🎨</Text>
                <Text>Fully customizable styling and theming</Text>
              </Horizontal>
              <Horizontal gap={12} alignItems="center">
                <Text fontSize={16}>♿</Text>
                <Text>Accessibility-first design</Text>
              </Horizontal>
            </Vertical>
          </View>

          {/* Examples */}
          <View
            backgroundColor="color.white"
            borderRadius="12px"
            border="1px solid"
            borderColor="color.gray.200"
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
                <DefaultDemo />
              </Tabs.Content>

              <Tabs.Content value="minimal">
                <MinimalDemo />
              </Tabs.Content>

              <Tabs.Content value="customized">
                <CustomizedDemo />
              </Tabs.Content>

              <Tabs.Content value="functions">
                <FunctionCallsDemo />
              </Tabs.Content>
            </Tabs>
          </View>

          {/* API Reference */}
          <View
            padding={24}
            backgroundColor="color.white"
            borderRadius="12px"
            border="1px solid"
            borderColor="color.gray.200"
          >
            <Text fontSize={20} fontWeight="600" marginBottom={16}>
              API Reference
            </Text>

            <Vertical gap={16}>
              <View>
                <Text fontSize={16} fontWeight="600" marginBottom={8}>
                  Required Props
                </Text>
                <View
                  padding={16}
                  backgroundColor="color.gray.50"
                  borderRadius="8px"
                >
                  <Vertical gap={8}>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        appName
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        string
                      </Text>
                      <Text fontSize={14}>
                        Name of the ADK agent application
                      </Text>
                    </Horizontal>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        userId
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        string
                      </Text>
                      <Text fontSize={14}>Unique identifier for the user</Text>
                    </Horizontal>
                  </Vertical>
                </View>
              </View>

              <View>
                <Text fontSize={16} fontWeight="600" marginBottom={8}>
                  Optional Configuration
                </Text>
                <View
                  padding={16}
                  backgroundColor="color.gray.50"
                  borderRadius="8px"
                >
                  <Vertical gap={8}>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        sessionId
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        string
                      </Text>
                      <Text fontSize={14}>Existing session ID to resume</Text>
                    </Horizontal>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        apiBaseUrl
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        string
                      </Text>
                      <Text fontSize={14}>Base URL for ADK API endpoints</Text>
                    </Horizontal>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        enableFileUpload
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        boolean
                      </Text>
                      <Text fontSize={14}>
                        Enable file attachment functionality
                      </Text>
                    </Horizontal>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        enableStreaming
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        boolean
                      </Text>
                      <Text fontSize={14}>
                        Enable real-time streaming responses
                      </Text>
                    </Horizontal>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        enableThoughts
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        boolean
                      </Text>
                      <Text fontSize={14}>Show agent thought processes</Text>
                    </Horizontal>
                  </Vertical>
                </View>
              </View>

              <View>
                <Text fontSize={16} fontWeight="600" marginBottom={8}>
                  Event Handlers
                </Text>
                <View
                  padding={16}
                  backgroundColor="color.gray.50"
                  borderRadius="8px"
                >
                  <Vertical gap={8}>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        onSessionCreate
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        (session) =&gt; void
                      </Text>
                      <Text fontSize={14}>
                        Called when a new session is created
                      </Text>
                    </Horizontal>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        onMessageSent
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        (message) =&gt; void
                      </Text>
                      <Text fontSize={14}>
                        Called when user sends a message
                      </Text>
                    </Horizontal>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        onMessageReceived
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        (message) =&gt; void
                      </Text>
                      <Text fontSize={14}>Called when agent responds</Text>
                    </Horizontal>
                    <Horizontal gap={16}>
                      <Text fontSize={14} fontWeight="600" minWidth="120px">
                        onError
                      </Text>
                      <Text fontSize={14} color="color.gray.600">
                        (error) =&gt; void
                      </Text>
                      <Text fontSize={14}>Called when an error occurs</Text>
                    </Horizontal>
                  </Vertical>
                </View>
              </View>
            </Vertical>
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
              fontSize={20}
              fontWeight="600"
              marginBottom={16}
              color="color.blue.900"
            >
              Integration with ADK Backend
            </Text>

            <Vertical gap={12}>
              <Text color="color.blue.800">
                The AgentChat component is designed to work seamlessly with the
                ADK (Agent Development Kit) backend. It follows the same
                patterns and protocols used in the original adk-web Angular
                application.
              </Text>

              <Text fontSize={16} fontWeight="600" color="color.blue.900">
                Required Backend Endpoints:
              </Text>

              <View
                padding={16}
                backgroundColor="color.white"
                borderRadius="8px"
              >
                <Vertical gap={8}>
                  <Text fontSize={14} fontFamily="Monaco, Consolas, monospace">
                    POST /sessions - Create new agent session
                  </Text>
                  <Text fontSize={14} fontFamily="Monaco, Consolas, monospace">
                    POST /run_sse - Send message with streaming response
                  </Text>
                  <Text fontSize={14} fontFamily="Monaco, Consolas, monospace">
                    POST /run - Send message with regular response
                  </Text>
                  <Text fontSize={14} fontFamily="Monaco, Consolas, monospace">
                    GET /sessions/:id - Get session details
                  </Text>
                </Vertical>
              </View>

              <Text color="color.blue.800">
                The component automatically handles session management, message
                formatting, file uploads, and real-time streaming according to
                ADK specifications.
              </Text>
            </Vertical>
          </View>
        </Vertical>
      </View>
    </AuthGuard>
  );
};

export default AgentChatPage;
