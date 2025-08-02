import React, { useState } from 'react';
import { View, Horizontal, Vertical, Text, Button } from 'app-studio';
import { AuthGuard, AuthStatus } from '../../components/AuthGuard';
import {
  AgentChat,
  AgentSession,
  AgentTrace,
  AgentEval,
  Tabs,
} from '../../components';
import type { AgentSessionType } from '../../components';
import { AdkProvider, useAgentService } from './providers';
import { ConnectionStatus } from 'src/pages/adk/services';

/**
 * Complete Agent Application Example
 *
 * This example demonstrates how to integrate all ADK components
 * into a complete agent application with proper service management,
 * state coordination, and user experience.
 */

interface CompleteAgentAppProps {
  appName: string;
  userId: string;
  apiBaseUrl: string;
}

/**
 * Main Agent Interface Component
 */
const AgentInterface: React.FC<CompleteAgentAppProps> = ({
  appName,
  userId,
  apiBaseUrl,
}) => {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const { isConnected, error } = useAgentService();

  /**
   * Handle session selection from AgentSession component
   */
  const handleSessionSelect = (session: AgentSessionType) => {
    setCurrentSessionId(session.id);
    setActiveTab('chat'); // Switch to chat when session is selected
  };

  /**
   * Handle new session creation from AgentChat component
   */
  const handleSessionCreate = (session: AgentSessionType) => {
    setCurrentSessionId(session.id);
  };

  return (
    <AuthGuard>
      <View height="100vh" display="flex" flexDirection="column">
        {/* Header with Connection Status */}
        <View
          padding={16}
          borderBottom="1px solid"
          borderBottomColor="color.gray.200"
          backgroundColor="color.white"
        >
          <Horizontal justifyContent="space-between" alignItems="center">
            <Vertical gap={4}>
              <Text fontSize="lg" fontWeight="600">
                ADK Agent Application
              </Text>
              <Text fontSize="sm" color="color.gray.600">
                {appName} • User: {userId}
              </Text>
            </Vertical>

            <Horizontal gap={12} alignItems="center">
              <AuthStatus />
              <ConnectionStatus showDetails={true} />
            </Horizontal>
          </Horizontal>
        </View>

        {/* Main Content Area */}
        <View flex={1} display="flex">
          <Horizontal height="100%">
            {/* Sidebar - Session Management */}
            <View
              width="320px"
              borderRight="1px solid"
              borderRightColor="color.gray.200"
              backgroundColor="color.gray.50"
              height="100%"
              overflowY="auto"
            >
              <AgentSession
                appName={appName}
                userId={userId}
                selectedSessionId={currentSessionId ?? undefined}
                onSessionSelect={handleSessionSelect}
                onSessionCreate={handleSessionCreate}
                showSessionHistory={true}
                enableSessionImport={true}
                enableSessionExport={true}
                enableSessionDelete={true}
                views={{
                  container: {
                    height: '100%',
                    border: 'none',
                    borderRadius: '0',
                  },
                }}
              />
            </View>

            {/* Main Content - Tabbed Interface */}
            <View flex={1} display="flex" flexDirection="column">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Trigger value="chat">💬 Chat</Tabs.Trigger>
                  <Tabs.Trigger value="trace" disabled={!currentSessionId}>
                    📊 Trace
                  </Tabs.Trigger>
                  <Tabs.Trigger value="eval">🧪 Evaluation</Tabs.Trigger>
                </Tabs.List>

                {/* Chat Interface */}
                <Tabs.Content value="chat">
                  {isConnected ? (
                    <AgentChat
                      appName={appName}
                      userId={userId}
                      sessionId={currentSessionId ?? undefined}
                      enableFileUpload={true}
                      enableStreaming={true}
                      enableThoughts={true}
                      enableFunctionCalls={true}
                      enableCodeExecution={true}
                      onSessionCreate={handleSessionCreate}
                      views={{
                        container: {
                          height: '100%',
                          border: 'none',
                          borderRadius: '0',
                        },
                      }}
                    />
                  ) : (
                    <View
                      flex={1}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      padding={32}
                    >
                      <Vertical gap={16} alignItems="center">
                        <Text fontSize="lg" color="color.gray.500">
                          Connection Required
                        </Text>
                        <Text
                          fontSize="sm"
                          color="color.gray.400"
                          textAlign="center"
                        >
                          Please check your connection to the ADK service
                        </Text>
                        {error && (
                          <Text
                            fontSize="sm"
                            color="color.red.600"
                            textAlign="center"
                          >
                            Error: {error}
                          </Text>
                        )}
                      </Vertical>
                    </View>
                  )}
                </Tabs.Content>

                {/* Trace Visualization */}
                <Tabs.Content value="trace">
                  {currentSessionId ? (
                    <AgentTrace
                      sessionId={currentSessionId}
                      userId={userId}
                      appName={appName}
                      showTimeline={true}
                      showMetrics={true}
                      showVisualization={true}
                      enableFiltering={true}
                      enableExport={true}
                      enableSearch={true}
                      enableAutoRefresh={true}
                      refreshInterval={5000}
                      views={{
                        container: {
                          height: '100%',
                          border: 'none',
                          borderRadius: '0',
                        },
                      }}
                    />
                  ) : (
                    <View
                      flex={1}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      padding={32}
                    >
                      <Vertical gap={16} alignItems="center">
                        <Text fontSize="lg" color="color.gray.500">
                          No Session Selected
                        </Text>
                        <Text
                          fontSize="sm"
                          color="color.gray.400"
                          textAlign="center"
                        >
                          Select a session from the sidebar to view trace data
                        </Text>
                        <Button
                          variant="outline"
                          onClick={() => setActiveTab('chat')}
                        >
                          Start New Chat
                        </Button>
                      </Vertical>
                    </View>
                  )}
                </Tabs.Content>

                {/* Evaluation Interface */}
                <Tabs.Content value="eval">
                  <AgentEval
                    appName={appName}
                    userId={userId}
                    enableBatchEvaluation={true}
                    enableMetricsComparison={true}
                    enableResultExport={true}
                    enableTemplates={true}
                    showEvaluationHistory={true}
                    showMetricsPanel={true}
                    showTestCaseDetails={true}
                    showProgressIndicators={true}
                    maxConcurrentEvals={3}
                    enableAutoRefresh={true}
                    refreshInterval={10000}
                    views={{
                      container: {
                        height: '100%',
                        border: 'none',
                        borderRadius: '0',
                      },
                    }}
                  />
                </Tabs.Content>
              </Tabs>
            </View>
          </Horizontal>
        </View>
      </View>
    </AuthGuard>
  );
};

/**
 * Complete Agent Application with Service Provider
 */
const CompleteAgentApp: React.FC<CompleteAgentAppProps> = (props) => {
  return (
    <AdkProvider>
      <AgentInterface {...props} />
    </AdkProvider>
  );
};

/**
 * Usage Example
 */
export const CompleteAgentAppExample = () => {
  return (
    <CompleteAgentApp
      appName="demo-agent"
      userId="user123"
      apiBaseUrl="http://localhost:3000/adk"
    />
  );
};

/**
 * Development Example with Local API
 */
export const DevelopmentExample = () => {
  return (
    <CompleteAgentApp
      appName="dev-agent"
      userId="developer"
      apiBaseUrl="http://localhost:3000/adk"
    />
  );
};

/**
 * Production Example with Environment Variables
 */
export const ProductionExample = () => {
  return (
    <CompleteAgentApp
      appName={process.env.REACT_APP_AGENT_NAME || 'production-agent'}
      userId={process.env.REACT_APP_USER_ID || 'user'}
      apiBaseUrl={process.env.REACT_APP_API_URL || 'https://api.example.com'}
    />
  );
};

export default CompleteAgentApp;
