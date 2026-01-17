import React, { useState, useRef } from 'react';
import { View, Text, Vertical, Horizontal, Button, useTheme } from 'app-studio';
import { ChatInput } from '../components/ChatInput';
import { PromptExample } from '../components/ChatInput/ChatInput/ChatInput.type';
import { AudioWaveformChatInputDemo } from '../components/ChatInput/examples/AudioWaveformChatInput';

const ChatInputDemo = () => {
  const { themeMode } = useTheme();
  const chatInputRef = useRef<any>(null);

  // State for messages
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: 'user' | 'bot' }>
  >([{ text: 'Hello! How can I help you today?', sender: 'bot' }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAgentRunning, setIsAgentRunning] = useState(false);

  // State for features
  const [showGuideTip, setShowGuideTip] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // State for upload simulation
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  // Example prompt examples
  const promptExamples: PromptExample[] = [
    { id: '1', text: 'Tell me a joke' },
    { id: '2', text: 'What is the weather today?' },
    { id: '3', text: 'How do I create a React component?' },
    { id: '4', text: 'Write a poem about coding' },
  ];

  // Example mention data
  const mentionData = [
    { id: '1', name: 'john_doe', description: 'Frontend Developer' },
    { id: '2', name: 'jane_smith', description: 'UI/UX Designer' },
  ];

  // State for mentions
  const [selectedMentions, setSelectedMentions] = useState<any[]>([]);

  // Handle message submission
  const handleSubmit = (
    message: string,
    options?: { model_name?: string; enable_thinking?: boolean }
  ) => {
    setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `I received your message: "${message}". ${
            options?.model_name ? `Using model: ${options.model_name}` : ''
          }${options?.enable_thinking ? ' with thinking enabled.' : ''}`,
          sender: 'bot',
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const simulateUpload = () => {
    setIsSimulatingUpload(true);
    setSimulationProgress(0);
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulatingUpload(false);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Files uploaded successfully!`, sender: 'bot' },
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <View
      width="100%"
      padding={40}
      backgroundColor="theme-background"
      minHeight="100vh"
    >
      <Text
        fontSize={28}
        fontWeight="bold"
        marginBottom={24}
        color="theme-primary"
      >
        Chat Experience
      </Text>

      {/* Main Chat Container */}
      <View
        backgroundColor={
          themeMode === 'light' ? 'color-white' : 'color-gray-900'
        }
        borderRadius={16}
        boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        borderWidth={1}
        borderColor={
          themeMode === 'light' ? 'color-gray-100' : 'color-gray-800'
        }
        overflow="hidden"
        marginBottom={40}
      >
        {/* Info Bar */}
        <View
          padding={12}
          backgroundColor="color-blue-50"
          borderBottomWidth={1}
          borderColor="color-blue-100"
        >
          <Text fontSize={12} color="color-blue-700" fontWeight="500">
            💡 Try typing @ to see mention auto-completion! (e.g., @john_doe)
          </Text>
        </View>

        {/* Messages Layout */}
        <Vertical
          gap={16}
          height={400}
          overflowY="auto"
          padding={24}
          backgroundColor={
            themeMode === 'light' ? 'color-gray-50' : 'color-gray-900'
          }
        >
          {messages.map((message, index) => (
            <View
              key={index}
              alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              backgroundColor={
                message.sender === 'user'
                  ? 'theme-primary'
                  : themeMode === 'light'
                  ? 'color-white'
                  : 'color-gray-800'
              }
              color={
                message.sender === 'user'
                  ? 'color-white'
                  : themeMode === 'light'
                  ? 'color-gray-900'
                  : 'color-gray-100'
              }
              padding="12px 16px"
              borderRadius="12px"
              maxWidth="80%"
              boxShadow="0 1px 2px rgba(0, 0, 0, 0.05)"
            >
              <Text>{message.text}</Text>
            </View>
          ))}
          {isLoading && (
            <Text fontSize={12} color="color-gray-500" fontStyle="italic">
              AI is thinking...
            </Text>
          )}
        </Vertical>

        {/* Input Controls */}
        <View
          padding={24}
          borderTopWidth={1}
          borderColor={
            themeMode === 'light' ? 'color-gray-100' : 'color-gray-800'
          }
        >
          <Horizontal gap={8} marginBottom={16}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAgentRunning(!isAgentRunning)}
            >
              {isAgentRunning ? 'Stop Agent' : 'Start Agent'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowGuideTip(!showGuideTip)}
            >
              {showGuideTip ? 'Hide Guide' : 'Show Guide'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={simulateUpload}
              disabled={isSimulatingUpload}
            >
              {isSimulatingUpload
                ? `Uploading ${simulationProgress}%`
                : 'Upload Simulation'}
            </Button>
          </Horizontal>

          <ChatInput
            ref={chatInputRef}
            onSubmit={handleSubmit}
            value={inputValue}
            onChange={setInputValue}
            loading={isLoading}
            isAgentRunning={isAgentRunning}
            showGuideTip={showGuideTip}
            onGuideClose={() => setShowGuideTip(false)}
            promptExamples={promptExamples}
            errorMessage={errorMessage}
            mentionData={mentionData}
            placeholder="Type your message... use @ to mention"
            getPendingFiles={() => []}
            clearPendingFiles={() => {}}
          />
        </View>
      </View>

      <Text
        fontSize={20}
        fontWeight="600"
        marginBottom={24}
        color="theme-primary"
      >
        Styling Variations
      </Text>

      <Vertical gap={24}>
        <View
          backgroundColor={
            themeMode === 'light' ? 'color-white' : 'color-gray-900'
          }
          padding={32}
          borderRadius={16}
          borderWidth={1}
          borderColor={
            themeMode === 'light' ? 'color-gray-100' : 'color-gray-800'
          }
        >
          <Text
            fontSize={16}
            fontWeight="bold"
            marginBottom={16}
            color="theme-primary"
          >
            Rounded & Minimal
          </Text>
          <ChatInput
            onSubmit={handleSubmit}
            placeholder="Minimal style..."
            shape="rounded"
            variant="default"
            getPendingFiles={() => []}
            clearPendingFiles={() => {}}
            views={{
              container: {
                backgroundColor: 'color-gray-50',
                borderRadius: '12px',
              },
            }}
          />
        </View>

        <View
          backgroundColor={
            themeMode === 'light' ? 'color-white' : 'color-gray-900'
          }
          padding={32}
          borderRadius={16}
          borderWidth={1}
          borderColor={
            themeMode === 'light' ? 'color-gray-100' : 'color-gray-800'
          }
        >
          <Text
            fontSize={16}
            fontWeight="bold"
            marginBottom={16}
            color="theme-primary"
          >
            Audio Experience
          </Text>
          <AudioWaveformChatInputDemo />
        </View>
      </Vertical>
    </View>
  );
};

export default ChatInputDemo;
