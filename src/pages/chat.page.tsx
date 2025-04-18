import React, { useState } from 'react';
import { View } from 'app-studio';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from '../components/Text/Text';
import * as AIComponents from '../components/Chat';

const AIChatPage: React.FC = () => {
  // Sample AI models
  const models = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      description: 'Advanced language model with strong reasoning capabilities',
      capabilities: ['text', 'code', 'reasoning'],
      isAvailable: true,
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      provider: 'Anthropic',
      description: 'Balanced model with good instruction following',
      capabilities: ['text', 'code', 'reasoning'],
      isAvailable: true,
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'Google',
      description: "Google's multimodal AI model",
      capabilities: ['text', 'code', 'vision'],
      isAvailable: true,
    },
  ];

  // Sample AI tools
  const tools = [
    {
      id: 'web-search',
      name: 'Web Search',
      description: 'Search the web for information',
      icon: '🔍',
      category: 'Research',
      isEnabled: true,
    },
    {
      id: 'code-interpreter',
      name: 'Code Interpreter',
      description: 'Execute code and return results',
      icon: '💻',
      category: 'Development',
      isEnabled: true,
    },
    {
      id: 'image-generation',
      name: 'Image Generation',
      description: 'Generate images from text descriptions',
      icon: '🖼️',
      category: 'Creative',
      isEnabled: true,
    },
  ];

  // Sample settings
  const settings = [
    {
      id: 'temperature',
      label: 'Temperature',
      description: 'Controls randomness of responses',
      type: 'slider',
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
      category: 'Generation',
    },
    {
      id: 'max-tokens',
      label: 'Max Tokens',
      description: 'Maximum length of generated responses',
      type: 'select',
      value: '1024',
      options: [
        { label: '256 tokens', value: '256' },
        { label: '512 tokens', value: '512' },
        { label: '1024 tokens', value: '1024' },
        { label: '2048 tokens', value: '2048' },
      ],
      category: 'Generation',
    },
    {
      id: 'streaming',
      label: 'Streaming Responses',
      description: 'Show responses as they are generated',
      type: 'toggle',
      value: true,
      category: 'Interface',
    },
  ];

  // State
  const [messages, setMessages] = useState<AIComponents.Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to the AI Chat Demo. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [selectedModelId, setSelectedModelId] = useState('gpt-4');
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([
    'web-search',
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    AIComponents.UploadedFile[]
  >([]);

  // Handlers
  const handleSubmit = (message: string) => {
    // Add user message
    const userMessage: AIComponents.Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: AIComponents.Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `This is a simulated response to your message: "${message}"\n\nHere's some code:\n\`\`\`javascript\nconst greeting = "Hello, world!";\nconsole.log(greeting);\n\`\`\``,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSettingChange = (id: string, value: any) => {
    console.log(`Setting ${id} changed to:`, value);
  };

  const handleToolToggle = (toolId: string) => {
    setSelectedToolIds((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      } else {
        return [...prev, toolId];
      }
    });
  };

  const handleFilesAdded = (files: File[]) => {
    const newFiles: AIComponents.UploadedFile[] = files.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file,
      progress: 100,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  return (
    <View padding="xl" height="100vh" backgroundColor="color.gray.100">
      <Text size="xl" fontWeight="bold" marginBottom="lg">
        AI Chat Demo
      </Text>

      <Horizontal height="calc(100% - 60px)" gap="md">
        {/* Main Chat Area */}
        <Vertical flex={1} height="100%">
          <AIComponents.ChatInterface
            messages={messages}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="Ask me anything..."
            enableFileUpload={true}
            enableVoiceInput={true}
            enableSuggestions={true}
            height="100%"
          />
        </Vertical>

        {/* Sidebar */}
        <Vertical width="300px" gap="md" height="100%" overflowY="auto">
          <AIComponents.ModelSelector
            models={models}
            selectedModelId={selectedModelId}
            onModelSelect={setSelectedModelId}
            showModelDetails={true}
            groupByProvider={true}
          />

          <AIComponents.ToolSelector
            tools={tools}
            selectedToolIds={selectedToolIds}
            onToolToggle={handleToolToggle}
            groupByCategory={true}
            showDescriptions={true}
          />

          <AIComponents.FileUploader
            files={uploadedFiles}
            onFilesAdded={handleFilesAdded}
            onFileRemove={handleFileRemove}
            maxFiles={5}
            accept="image/*,application/pdf,.txt"
          />

          <AIComponents.SettingsPanel
            title="AI Settings"
            settings={settings as any}
            onSettingChange={handleSettingChange}
            groupByCategory={true}
          />
        </Vertical>
      </Horizontal>
    </View>
  );
};

export default AIChatPage;
