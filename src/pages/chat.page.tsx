import React, { useState, useRef } from 'react';
import { View, Text, Vertical, Horizontal, Button } from 'app-studio';
import { ChatInput, ChatInputHandles } from '../components/ChatInput';
import { PromptExample } from '../components/ChatInput/ChatInput/ChatInput.type';

const ChatInputDemo = () => {
  const chatInputRef = useRef<ChatInputHandles>(null);

  // State for messages
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: 'user' | 'bot' }>
  >([{ text: 'Hello! How can I help you today?', sender: 'bot' }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAgentRunning, setIsAgentRunning] = useState(false);

  // State for features
  const [showGuideTip, setShowGuideTip] = useState(false);
  const [showReferenceImage, setShowReferenceImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Example prompt examples
  const promptExamples: PromptExample[] = [
    { id: '1', text: 'Tell me a joke' },
    { id: '2', text: 'What is the weather today?' },
    { id: '3', text: 'How do I create a React component?' },
    { id: '4', text: 'Write a poem about coding' },
  ];

  // Handle message submission
  const handleSubmit = (
    message: string,
    options?: { model_name?: string; enable_thinking?: boolean }
  ) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
    setInputValue('');

    // Simulate loading
    setIsLoading(true);

    // Simulate bot response after delay
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

  // Handle agent start/stop
  const handleAgentToggle = () => {
    if (isAgentRunning) {
      setIsAgentRunning(false);
    } else {
      setIsAgentRunning(true);
      setTimeout(() => {
        setIsAgentRunning(false);
        setMessages((prev) => [
          ...prev,
          { text: 'Agent has completed the task!', sender: 'bot' },
        ]);
      }, 5000);
    }
  };

  // Toggle feature buttons
  const toggleFeature = (feature: 'guide' | 'reference' | 'error') => {
    if (feature === 'guide') {
      setShowGuideTip(!showGuideTip);
    } else if (feature === 'reference') {
      setShowReferenceImage(!showReferenceImage);
    } else if (feature === 'error') {
      setErrorMessage(
        errorMessage ? '' : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <View width="100%" padding="24px">
      <Text fontSize="24px" fontWeight="bold" marginBottom="24px">
        Chat Input Component Demo
      </Text>

      {/* Feature Controls */}
      <Horizontal gap={8} marginBottom="16px">
        <Button onClick={handleAgentToggle}>
          {isAgentRunning ? 'Stop Agent' : 'Start Agent'}
        </Button>
        <Button onClick={() => toggleFeature('guide')}>
          {showGuideTip ? 'Hide Guide' : 'Show Guide'}
        </Button>
        <Button onClick={() => toggleFeature('reference')}>
          {showReferenceImage ? 'Hide Reference' : 'Show Reference'}
        </Button>
        <Button onClick={() => toggleFeature('error')}>
          {errorMessage ? 'Clear Error' : 'Show Error'}
        </Button>
      </Horizontal>

      {/* Chat Messages */}
      <View>
        <Vertical
          gap={16}
          height="400px"
          overflowY="auto"
          padding="16px"
          backgroundColor="color.gray.50"
        >
          {messages.map((message, index) => (
            <View
              key={index}
              alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              backgroundColor={
                message.sender === 'user' ? 'theme.primary' : 'color.white'
              }
              color={
                message.sender === 'user' ? 'color.white' : 'color.gray.900'
              }
              padding="12px 16px"
              borderRadius="12px"
              maxWidth="70%"
              boxShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
            >
              <Text>{message.text}</Text>
            </View>
          ))}
        </Vertical>

        {/* Chat Input */}
        <View padding="16px" borderTop="1px solid">
          <ChatInput
            ref={chatInputRef}
            onSubmit={handleSubmit}
            value={inputValue}
            onChange={setInputValue}
            loading={isLoading}
            isAgentRunning={isAgentRunning}
            onStopAgent={handleAgentToggle}
            showGuideTip={showGuideTip}
            onGuideClose={() => setShowGuideTip(false)}
            guideVideoUrl="https://example.com/guide-video.mp4"
            promptExamples={promptExamples}
            showReferenceImageButton={showReferenceImage}
            errorMessage={errorMessage}
            title="Chat Demo"
          />
        </View>
      </View>

      <Vertical gap={24}>
        <View gap={24}>
          <Text fontSize="16px" fontWeight="bold">
            Rounded Style
          </Text>
          <ChatInput
            onSubmit={handleSubmit}
            placeholder="Rounded input..."
            shape="rounded"
            variant="default"
            views={{
              container: {
                backgroundColor: 'color.blue.50',
                borderRadius: '16px',
              },
              submitButton: {
                backgroundColor: 'theme.secondary',
              },
            }}
          />
        </View>

        <View gap={24}>
          <Text fontSize="16px" fontWeight="bold">
            Pill Shaped Style
          </Text>
          <ChatInput
            onSubmit={handleSubmit}
            placeholder="Pill shaped input..."
            shape="pillShaped"
            variant="outline"
            views={{
              container: {
                backgroundColor: 'color.purple.50',
              },
              content: {
                borderColor: 'color.purple.200',
              },
              submitButton: {
                backgroundColor: 'color.purple.500',
              },
            }}
          />
        </View>

        <View gap={24}>
          <Text fontSize="16px" fontWeight="bold">
            Sharp Style
          </Text>
          <ChatInput
            onSubmit={handleSubmit}
            placeholder="Sharp corners input..."
            shape="sharp"
            variant="none"
            views={{
              container: {
                backgroundColor: 'color.gray.100',
              },
              content: {
                backgroundColor: 'color.white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
              submitButton: {
                backgroundColor: 'color.gray.800',
              },
            }}
          />
        </View>
      </Vertical>
    </View>
  );
};

export default ChatInputDemo;
