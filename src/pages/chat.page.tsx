import React, { useState, useRef } from 'react';
import { View, Text, Vertical, Horizontal, Button } from 'app-studio';
import { ChatInput } from '../components/ChatInput';
import { PromptExample } from '../components/ChatInput/ChatInput/ChatInput.type';
import { AudioWaveformChatInputDemo } from '../components/ChatInput/examples/AudioWaveformChatInput';

const ChatInputDemo = () => {
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

  // Example mention data for @ auto-completion
  const mentionData = [
    {
      id: '1',
      name: 'john_doe',
      description: 'Frontend Developer',
    },
    {
      id: '2',
      name: 'jane_smith',
      description: 'UI/UX Designer',
    },
    {
      id: '3',
      name: 'mike_wilson',
      description: 'Backend Developer',
    },
    {
      id: '4',
      name: 'sarah_jones',
      description: 'Product Manager',
    },
    {
      id: '5',
      name: 'alex_brown',
      description: 'DevOps Engineer',
    },
    {
      id: '6',
      name: 'lisa_davis',
      description: 'QA Engineer',
    },
    {
      id: '7',
      name: 'david_kim',
      description: 'Data Scientist',
    },
    {
      id: '8',
      name: 'emma_white',
      description: 'Marketing Manager',
    },
  ];

  // State for mentions
  const [selectedMentions, setSelectedMentions] = useState<any[]>([]);

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

  // Handle mention selection
  const handleMentionSelect = (mention: any) => {
    setSelectedMentions((prev) => [...prev, mention]);
    console.log('Mentioned user:', mention);
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

  // Simulate upload functionality like in upload.page.tsx
  const simulateUpload = () => {
    // Create some mock files for demonstration
    const mockFiles = [
      new File(['mock content 1'], 'document.pdf', { type: 'application/pdf' }),
      new File(['mock content 2'], 'image.jpg', { type: 'image/jpeg' }),
      new File(['mock content 3'], 'spreadsheet.xlsx', {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
    ];

    // Log file info for debugging
    console.log(
      'Simulating upload of files:',
      mockFiles.map((f) => ({
        name: f.name,
        type: f.type,
        size: f.size,
      }))
    );

    setIsSimulatingUpload(true);
    setSimulationProgress(0);

    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulatingUpload(false);

          // Add a message to show the upload completed
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: `Upload simulation completed! Files: ${mockFiles
                .map((f) => f.name)
                .join(', ')}`,
              sender: 'bot',
            },
          ]);

          return 100;
        }
        return prev + 10;
      });
    }, 300); // Same timing as upload.page.tsx
  };

  // Toggle feature buttons
  const toggleFeature = (feature: 'guide' | 'error') => {
    if (feature === 'guide') {
      setShowGuideTip(!showGuideTip);
    } else if (feature === 'error') {
      setErrorMessage(
        errorMessage ? '' : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <View width="100%" padding="24px">
      <Text fontSize="24px" fontWeight="bold" marginBottom="24px">
        Chat Input Component Demo with @ Mentions
      </Text>

      {/* Mention Info */}
      <View
        padding="12px"
        backgroundColor="color.blue.50"
        border="1px solid"
        borderColor="color.blue.200"
        borderRadius="8px"
        marginBottom="16px"
      >
        <Text
          fontSize="14px"
          fontWeight="medium"
          color="color.blue.800"
          marginBottom="4px"
        >
          💡 Try typing &quot;@&quot; in the chat input to see mention
          auto-completion!
        </Text>
        <Text fontSize="12px" color="color.blue.700">
          Available team members: @john_doe, @jane_smith, @mike_wilson,
          @sarah_jones, @alex_brown, @lisa_davis, @david_kim, @emma_white
        </Text>
        {selectedMentions.length > 0 && (
          <View marginTop="8px">
            <Text fontSize="12px" color="color.blue.700" marginBottom="4px">
              Recently mentioned:
            </Text>
            <Horizontal gap={4} flexWrap="wrap">
              {selectedMentions.slice(-5).map((mention, index) => (
                <View
                  key={`${mention.id}-${index}`}
                  padding="2px 6px"
                  backgroundColor="color.blue.100"
                  borderRadius="4px"
                  border="1px solid"
                  borderColor="color.blue.300"
                >
                  <Text fontSize="11px" color="color.blue.800">
                    @{mention.name}
                  </Text>
                </View>
              ))}
            </Horizontal>
          </View>
        )}
      </View>

      {/* Feature Controls */}
      <Horizontal gap={8} marginBottom="16px">
        <Button onClick={handleAgentToggle}>
          {isAgentRunning ? 'Stop Agent' : 'Start Agent'}
        </Button>
        <Button onClick={() => toggleFeature('guide')}>
          {showGuideTip ? 'Hide Guide' : 'Show Guide'}
        </Button>
        <Button onClick={() => toggleFeature('error')}>
          {errorMessage ? 'Clear Error' : 'Show Error'}
        </Button>
        <Button
          onClick={simulateUpload}
          disabled={isSimulatingUpload}
          variant={isSimulatingUpload ? 'filled' : 'outline'}
        >
          {isSimulatingUpload
            ? `Uploading... ${simulationProgress}%`
            : 'Simulate Upload'}
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
            errorMessage={errorMessage}
            title="Chat Demo"
            mentionData={mentionData}
            mentionTrigger="@"
            onMentionSelect={handleMentionSelect}
            placeholder="Type your message here... Use @ to mention team members"
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

        <View gap={24}>
          <Text fontSize="16px" fontWeight="bold">
            Multiple File Upload Demo
          </Text>
          <Text fontSize="14px" color="color.gray.600" marginBottom="8px">
            This ChatInput demonstrates multiple file upload capabilities. Try
            uploading multiple files at once!
          </Text>
          <ChatInput
            onSubmit={(
              message: string,
              options?: { model_name?: string; enable_thinking?: boolean }
            ) => {
              console.log('Message with files:', message);
              console.log('Options:', options);
              handleSubmit(message, options);
            }}
            placeholder="Upload multiple files and send a message..."
            shape="rounded"
            variant="outline"
            views={{
              container: {
                backgroundColor: 'color.green.50',
                borderRadius: '12px',
              },
              content: {
                borderColor: 'color.green.200',
                minHeight: '80px',
              },
              submitButton: {
                backgroundColor: 'color.green.500',
              },
              fileButton: {
                color: 'color.green.600',
                _hover: {
                  backgroundColor: 'color.green.100',
                },
              },
            }}
          />
        </View>

        <View gap={24}>
          <Text fontSize="16px" fontWeight="bold">
            @ Mention Auto-completion Demo
          </Text>
          <Text fontSize="14px" color="color.gray.600" marginBottom="8px">
            This ChatInput demonstrates @ mention functionality. Type @ to see
            team member suggestions with auto-completion.
          </Text>
          <ChatInput
            onSubmit={(message: string) => {
              console.log('Message with mentions:', message);
              setMessages((prev) => [
                ...prev,
                { text: message, sender: 'user' },
              ]);
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    text: `I received your message with mentions: "${message}"`,
                    sender: 'bot',
                  },
                ]);
              }, 1000);
            }}
            placeholder="Try typing @ to mention team members..."
            mentionData={mentionData}
            mentionTrigger="@"
            onMentionSelect={handleMentionSelect}
            shape="rounded"
            variant="outline"
            views={{
              container: {
                backgroundColor: 'color.purple.50',
                borderRadius: '12px',
              },
              content: {
                borderColor: 'color.purple.200',
                minHeight: '60px',
              },
              submitButton: {
                backgroundColor: 'color.purple.500',
              },
            }}
          />
        </View>

        <View gap={24}>
          <Text fontSize="16px" fontWeight="bold">
            File Upload Guidelines
          </Text>
          <View
            padding="16px"
            backgroundColor="color.blue.50"
            borderRadius="8px"
          >
            <Text fontSize="14px" fontWeight="600" marginBottom="8px">
              Multiple File Upload Features:
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Select multiple files at once using Ctrl/Cmd + click
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Drag and drop multiple files into the chat input
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Maximum file size: 50MB per file
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Supports all file types: images, documents, videos, etc.
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Files are validated before upload
            </Text>
            <Text color="color.gray.700">
              • Preview and remove files before sending
            </Text>
          </View>
        </View>

        <View gap={24}>
          <Text fontSize="16px" fontWeight="bold">
            @ Mention Features
          </Text>
          <View
            padding="16px"
            backgroundColor="color.purple.50"
            borderRadius="8px"
          >
            <Text fontSize="14px" fontWeight="600" marginBottom="8px">
              @ Mention Auto-completion Features:
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Type @ to trigger mention suggestions
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Real-time filtering as you type after @
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Keyboard navigation with Arrow keys
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Select with Tab, Enter, or mouse click
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Escape to close suggestions
            </Text>
            <Text color="color.gray.700" marginBottom="4px">
              • Proper cursor positioning after selection
            </Text>
            <Text color="color.gray.700">
              • Customizable mention data and trigger character
            </Text>
          </View>
        </View>

        <View gap={24}>
          <Text fontSize="16px" fontWeight="bold">
            Audio Waveform Chat Input Example
          </Text>
          <AudioWaveformChatInputDemo />
        </View>
      </Vertical>
    </View>
  );
};

export default ChatInputDemo;
