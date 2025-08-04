import React, { useState } from 'react';
import { View, Vertical, Text, Horizontal } from 'app-studio';
import { AgentChat } from '../AgentChat';
import { AgentSession, AgentMessage } from '../AgentChat/AgentChat.props';

/**
 * Default AgentChat Example
 *
 * Demonstrates basic usage of the AgentChat component with ADK agents
 */
export const DefaultDemo = () => {
  const [currentSession, setCurrentSession] = useState<AgentSession | null>(
    null
  );
  const [messages, setMessages] = useState<AgentMessage[]>([]);

  const handleSessionCreate = (session: AgentSession) => {
    console.log('Session created:', session);
    setCurrentSession(session);
  };

  const handleSessionUpdate = (session: AgentSession) => {
    console.log('Session updated:', session);
    setCurrentSession(session);
  };

  const handleMessageSent = (message: AgentMessage) => {
    console.log('Message sent:', message);
    setMessages((prev) => [...prev, message]);
  };

  const handleMessageReceived = (message: AgentMessage) => {
    console.log('Message received:', message);
    setMessages((prev) => [...prev, message]);
  };

  const handleError = (error: Error) => {
    console.error('AgentChat error:', error);
  };

  return (
    <Vertical gap={32} padding={20}>
      <Text fontSize={20} fontWeight="600">
        AgentChat Component - Default Example
      </Text>

      <Text color="color.gray.600">
        A complete chat interface for interacting with ADK agents. Supports
        real-time messaging, file uploads, function calls, code execution, and
        more.
      </Text>

      {/* Session Info */}
      {currentSession && (
        <View
          padding={16}
          backgroundColor="color.blue.50"
          borderRadius="8px"
          border="1px solid"
          borderColor="color.blue.200"
        >
          <Text fontSize={14} fontWeight="600" color="color.blue.800">
            Active Session
          </Text>
          <Text fontSize={12} color="color.blue.600">
            ID: {currentSession.id}
          </Text>
          <Text fontSize={12} color="color.blue.600">
            App: {currentSession.appName}
          </Text>
        </View>
      )}

      {/* AgentChat Component */}
      <View
        height="600px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="12px"
      >
        <AgentChat
          appName="demo-agent"
          userId="demo-user"
          apiBaseUrl="http://localhost:3000/adk"
          placeholder="Ask the agent anything..."
          enableFileUpload={true}
          enableStreaming={true}
          enableThoughts={true}
          showTimestamps={true}
          showAvatars={true}
          showTypingIndicator={true}
          autoScroll={true}
          maxFileSize={10 * 1024 * 1024} // 10MB
          maxFiles={5}
          allowedFileTypes={[
            'image/*',
            'video/*',
            'audio/*',
            'application/pdf',
            'text/*',
          ]}
          onSessionCreate={handleSessionCreate}
          onSessionUpdate={handleSessionUpdate}
          onMessageSent={handleMessageSent}
          onMessageReceived={handleMessageReceived}
          onError={handleError}
          views={{
            container: {
              height: '100%',
            },
            messageList: {
              backgroundColor: 'color.gray.100',
            },
            inputArea: {
              backgroundColor: 'color.white',
            },
          }}
        />
      </View>

      {/* Message Log */}
      {messages.length > 0 && (
        <View>
          <Text fontSize={16} fontWeight="600" marginBottom={16}>
            Message Log ({messages.length} messages)
          </Text>
          <View
            maxHeight="200px"
            overflowY="auto"
            padding={16}
            backgroundColor="color.gray.50"
            borderRadius="8px"
          >
            <Vertical gap={8}>
              {messages.map((message, index) => (
                <View
                  key={message.id}
                  padding={8}
                  backgroundColor="color.white"
                  borderRadius="4px"
                >
                  <Horizontal
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text
                      fontSize={12}
                      fontWeight="600"
                      color={
                        message.role === 'user'
                          ? 'color.blue.600'
                          : 'color.green.600'
                      }
                    >
                      {message.role === 'user' ? '👤 User' : '🤖 Agent'}
                    </Text>
                    <Text fontSize={10} color="color.gray.500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </Text>
                  </Horizontal>
                  <Text fontSize={12} marginTop={4}>
                    {message.text || '[Non-text content]'}
                  </Text>
                  {message.thought && (
                    <Text
                      fontSize={10}
                      color="color.yellow.600"
                      fontStyle="italic"
                    >
                      💭 Thought
                    </Text>
                  )}
                </View>
              ))}
            </Vertical>
          </View>
        </View>
      )}
    </Vertical>
  );
};

/**
 * Minimal AgentChat Example
 *
 * Shows the simplest possible usage
 */
export const MinimalDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Minimal AgentChat Example
      </Text>

      <View
        height="400px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentChat appName="simple-agent" userId="user123" />
      </View>
    </Vertical>
  );
};

/**
 * Customized AgentChat Example
 *
 * Shows advanced customization options with enhanced views prop
 */
export const CustomizedDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Customized AgentChat Example - Enhanced Views
      </Text>

      <Text color="color.gray.600" fontSize={14}>
        Demonstrates comprehensive customization using the enhanced views prop
        and container props for complete control over appearance.
      </Text>

      <View
        height="500px"
        border="1px solid"
        borderColor="color.purple.200"
        borderRadius="12px"
      >
        <AgentChat
          appName="custom-agent"
          userId="user123"
          placeholder="Chat with our custom AI assistant..."
          enableFileUpload={true}
          enableThoughts={true}
          showAvatars={true}
          colorScheme="purple"
          compact={false}
          rounded={true}
          containerProps={{
            backgroundColor: 'color.purple.25',
            border: '2px solid',
            borderColor: 'color.purple.300',
          }}
          views={{
            // Main areas
            container: {
              backgroundColor: 'color.purple.25',
            },
            header: {
              backgroundColor: 'color.purple.500',
              color: 'white',
              padding: '16px',
              borderRadius: '12px 12px 0 0',
            },
            messageList: {
              backgroundColor: 'color.white',
              padding: '20px',
            },
            inputArea: {
              backgroundColor: 'color.purple.50',
              padding: '16px',
              borderRadius: '0 0 12px 12px',
            },

            // Message styling
            userMessage: {
              backgroundColor: 'color.purple.500',
              color: 'white',
              borderRadius: '18px 18px 4px 18px',
              padding: '12px 16px',
              marginLeft: '40px',
            },
            botMessage: {
              backgroundColor: 'color.purple.100',
              color: 'color.purple.900',
              borderRadius: '18px 18px 18px 4px',
              padding: '12px 16px',
              marginRight: '40px',
            },
            messageTimestamp: {
              color: 'color.purple.600',
              fontSize: '12px',
            },
            messageAvatar: {
              borderRadius: '50%',
              border: '2px solid',
              borderColor: 'color.purple.300',
            },

            // Input components
            inputField: {
              borderRadius: '24px',
              border: '2px solid',
              borderColor: 'color.purple.200',
              backgroundColor: 'white',
            },
            sendButton: {
              backgroundColor: 'color.purple.500',
              borderRadius: '50%',
              padding: '12px',
            },
            attachButton: {
              color: 'color.purple.500',
              borderRadius: '8px',
            },

            // State indicators
            typingIndicator: {
              color: 'color.purple.600',
              backgroundColor: 'color.purple.100',
              borderRadius: '16px',
              padding: '8px 12px',
            },
            loadingIndicator: {
              color: 'color.purple.500',
            },

            // Attachment components
            attachmentArea: {
              backgroundColor: 'color.purple.50',
              borderRadius: '8px',
              padding: '12px',
              border: '1px dashed',
              borderColor: 'color.purple.300',
            },
            attachmentPreview: {
              borderRadius: '8px',
              border: '1px solid',
              borderColor: 'color.purple.200',
            },

            // Function call components
            functionCall: {
              backgroundColor: 'color.purple.50',
              border: '1px solid',
              borderColor: 'color.purple.200',
              borderRadius: '8px',
              padding: '12px',
            },

            // Code components
            codeBlock: {
              backgroundColor: 'color.gray.900',
              color: 'color.gray.100',
              borderRadius: '8px',
              padding: '16px',
            },

            // Thought components
            thoughtBubble: {
              backgroundColor: 'color.purple.25',
              border: '1px dashed',
              borderColor: 'color.purple.300',
              borderRadius: '12px',
              padding: '12px',
              fontStyle: 'italic',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * Agent with Function Calls Example
 *
 * Demonstrates function call capabilities
 */
export const FunctionCallsDemo = () => {
  const initialMessages: AgentMessage[] = [
    {
      id: '1',
      role: 'user',
      text: "What's the weather like in San Francisco?",
      timestamp: Date.now() - 60000,
    },
    {
      id: '2',
      role: 'bot',
      text: "I'll check the weather for you.",
      timestamp: Date.now() - 50000,
      functionCall: {
        id: 'call_1',
        name: 'get_weather',
        args: { location: 'San Francisco, CA' },
      },
    },
    {
      id: '3',
      role: 'bot',
      text: 'The weather in San Francisco is currently 68°F with partly cloudy skies.',
      timestamp: Date.now() - 40000,
      functionResponse: {
        id: 'call_1',
        name: 'get_weather',
        response: { temperature: 68, condition: 'partly cloudy', humidity: 65 },
      },
    },
  ];

  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        AgentChat with Function Calls
      </Text>

      <View
        height="500px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentChat
          appName="function-agent"
          userId="user123"
          initialMessages={initialMessages}
          enableFunctionCalls={true}
          enableCodeExecution={true}
        />
      </View>
    </Vertical>
  );
};
