import React, { useEffect, useState } from 'react';
import { View, Vertical, Text, Horizontal, Button } from 'app-studio';
import { AuthGuard, AuthStatus } from '../../components/AuthGuard';
import { AdkProvider, useAdkContext } from './providers';
import { AgentChat } from '../../components/adk/AgentChat/AgentChat';
import type {
  AgentMessage,
  AgentSession,
} from '../../components/adk/AgentChat/AgentChat/AgentChat.props';
import type {
  CreateSessionParams,
  AgentRunRequest,
  SessionResponse,
} from '../../services/api';

/**
 * ADK Integration Example Component
 *
 * Demonstrates real integration with the ADK API services
 */
const AdkIntegrationExample: React.FC = () => {
  const {
    // State
    isAuthenticated,
    user,
    currentSessionId,
    sessions,

    // Actions
    createSession,
    loadSessions,
    runAgent,
    checkHealth,
    setCurrentSessionId,

    // Loading states
    isCreatingSession,
    isLoadingSessions,
    isCheckingHealth,

    // Data
    agentResponse,

    // Errors
    createSessionError,
    runAgentError,
    healthError,
  } = useAdkContext();

  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [currentSession, setCurrentSession] = useState<AgentSession | null>(
    null
  );
  const [selectedSession, setSelectedSession] =
    useState<SessionResponse | null>(null);

  // Initialize ADK services
  useEffect(() => {
    if (isAuthenticated) {
      checkHealth();
      loadSessions();
    }
  }, [isAuthenticated]);

  // Handle session creation
  const handleCreateSession = () => {
    const sessionParams: CreateSessionParams = {
      appName: 'ADK Integration Example',
      userId: user?.id || 'anonymous',
      metadata: {
        createdAt: new Date().toISOString(),
        source: 'web-app',
      },
    };

    createSession(sessionParams);
  };

  // Handle message sending
  const handleMessageSent = (message: AgentMessage) => {
    console.log('Message sent:', message);
    setMessages((prev) => [...prev, message]);

    // Send message to ADK agent
    if (currentSessionId) {
      const agentRequest: AgentRunRequest = {
        appName: 'ADK Integration Example',
        userId: user?.id || 'anonymous',
        sessionId: currentSessionId,
        newMessage: {
          role: 'user',
          parts: [
            {
              type: 'text',
              content: message.text || '',
            },
          ],
          metadata: {
            timestamp: Date.now(),
            messageId: message.id,
          },
        },
        streaming: false,
      };

      runAgent(agentRequest);
    }
  };

  // Handle agent response
  useEffect(() => {
    if (agentResponse) {
      const agentMessage: AgentMessage = {
        id: `agent-${Date.now()}`,
        text: agentResponse.response || 'Agent response received',
        role: 'bot',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }
  }, [agentResponse]);

  return (
    <View padding={20} backgroundColor="color.gray.100" minHeight="100vh">
      <Vertical gap={32} maxWidth="1200px" margin="0 auto">
        {/* Header */}
        <Vertical gap={16}>
          <Horizontal justifyContent="space-between" alignItems="flex-start">
            <Vertical gap={8}>
              <Text fontSize={32} fontWeight="700" color="color.gray.900">
                ADK Integration Example
              </Text>
              <Text fontSize={18} color="color.gray.600" lineHeight={1.6}>
                Real integration with ADK API services using the existing auth
                store and API services.
              </Text>
            </Vertical>
            <AuthStatus />
          </Horizontal>
        </Vertical>

        {/* Status Section */}
        <View
          padding={20}
          backgroundColor="color.white"
          borderRadius="8px"
          border="1px solid"
          borderColor="color.gray.200"
        >
          <Vertical gap={16}>
            <Text fontSize={18} fontWeight="600">
              ADK Service Status
            </Text>

            <Horizontal gap={16} flexWrap="wrap">
              <View
                padding="8px 12px"
                backgroundColor={
                  healthError ? 'color.red.50' : 'color.green.50'
                }
                border="1px solid"
                borderColor={healthError ? 'color.red.200' : 'color.green.200'}
                borderRadius="6px"
              >
                <Text
                  fontSize="sm"
                  color={healthError ? 'color.red.700' : 'color.green.700'}
                >
                  Health: {healthError ? 'Error' : 'OK'}
                </Text>
              </View>

              <View
                padding="8px 12px"
                backgroundColor="color.blue.50"
                border="1px solid"
                borderColor="color.blue.200"
                borderRadius="6px"
              >
                <Text fontSize="sm" color="color.blue.700">
                  Sessions: {sessions.length}
                </Text>
              </View>

              <View
                padding="8px 12px"
                backgroundColor={
                  currentSessionId ? 'color.green.50' : 'color.gray.50'
                }
                border="1px solid"
                borderColor={
                  currentSessionId ? 'color.green.200' : 'color.gray.200'
                }
                borderRadius="6px"
              >
                <Text
                  fontSize="sm"
                  color={
                    currentSessionId ? 'color.green.700' : 'color.gray.700'
                  }
                >
                  Current Session: {currentSessionId || 'None'}
                </Text>
              </View>
            </Horizontal>

            <Horizontal gap={12}>
              <Button
                variant="outline"
                onClick={checkHealth}
                disabled={isCheckingHealth}
              >
                {isCheckingHealth ? 'Checking...' : 'Check Health'}
              </Button>

              <Button
                variant="filled"
                onClick={handleCreateSession}
                disabled={isCreatingSession}
              >
                {isCreatingSession ? 'Creating...' : 'Create Session'}
              </Button>

              <Button
                variant="outline"
                onClick={() => loadSessions()}
                disabled={isLoadingSessions}
              >
                {isLoadingSessions ? 'Loading...' : 'Refresh Sessions'}
              </Button>
            </Horizontal>

            {/* Session Selector */}
            {sessions.length > 0 && (
              <View>
                <Text fontSize="sm" fontWeight="600" marginBottom={8}>
                  Available Sessions:
                </Text>
                <Vertical gap={8}>
                  {sessions.map((session) => (
                    <View
                      key={session.id}
                      padding={12}
                      backgroundColor={
                        currentSessionId === session.id
                          ? 'color.blue.50'
                          : 'color.gray.50'
                      }
                      border="1px solid"
                      borderColor={
                        currentSessionId === session.id
                          ? 'color.blue.200'
                          : 'color.gray.200'
                      }
                      borderRadius="6px"
                      cursor="pointer"
                      onClick={() => {
                        setCurrentSessionId(session.id);
                        setSelectedSession(session);
                      }}
                    >
                      <Horizontal
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Vertical gap={4}>
                          <Text fontSize="sm" fontWeight="500">
                            {session.appName}
                          </Text>
                          <Text fontSize="xs" color="color.gray.600">
                            Created:{' '}
                            {new Date(session.createdAt).toLocaleString()}
                          </Text>
                        </Vertical>
                        <Text fontSize="xs" color="color.gray.500">
                          {session.id.slice(0, 8)}...
                        </Text>
                      </Horizontal>
                    </View>
                  ))}
                </Vertical>
              </View>
            )}

            {/* Error Display */}
            {(createSessionError || runAgentError || healthError) && (
              <View
                padding={12}
                backgroundColor="color.red.50"
                border="1px solid"
                borderColor="color.red.200"
                borderRadius="6px"
              >
                <Text fontSize="sm" color="color.red.700">
                  Error:{' '}
                  {createSessionError?.message ||
                    runAgentError?.message ||
                    healthError?.message}
                </Text>
              </View>
            )}
          </Vertical>
        </View>

        {/* Chat Interface */}
        {currentSessionId && (
          <View
            backgroundColor="color.white"
            borderRadius="8px"
            border="1px solid"
            borderColor="color.gray.200"
            overflow="hidden"
          >
            <AgentChat
              appName="ADK Integration Example"
              userId={user?.id || 'anonymous'}
              sessionId={currentSessionId}
              initialMessages={messages}
              initialSession={currentSession || undefined}
              onMessageSent={handleMessageSent}
              onSessionCreate={(session) => setCurrentSession(session)}
              onSessionUpdate={(session) => setCurrentSession(session)}
              onError={(error) => console.error('Chat error:', error)}
              placeholder="Type your message to the ADK agent..."
            />
          </View>
        )}

        {/* Instructions */}
        <View
          padding={20}
          backgroundColor="color.blue.50"
          borderRadius="8px"
          border="1px solid"
          borderColor="color.blue.200"
        >
          <Vertical gap={12}>
            <Text fontSize={16} fontWeight="600" color="color.blue.900">
              How to use this integration:
            </Text>
            <Vertical gap={8}>
              <Text fontSize="sm" color="color.blue.800">
                1. Check the ADK service health status
              </Text>
              <Text fontSize="sm" color="color.blue.800">
                2. Create a new session to start chatting
              </Text>
              <Text fontSize="sm" color="color.blue.800">
                3. Send messages to interact with the ADK agent
              </Text>
              <Text fontSize="sm" color="color.blue.800">
                4. View real-time responses from the agent
              </Text>
            </Vertical>
          </Vertical>
        </View>
      </Vertical>
    </View>
  );
};

/**
 * ADK Integration Page with Provider
 */
const AdkIntegrationPage: React.FC = () => {
  return (
    <AuthGuard>
      <AdkProvider>
        <AdkIntegrationExample />
      </AdkProvider>
    </AuthGuard>
  );
};

export default AdkIntegrationPage;
