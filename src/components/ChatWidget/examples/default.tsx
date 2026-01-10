import React from 'react';
import { ChatWidget } from '../ChatWidget';
import type { Message } from '../ChatWidget/ChatWidget.type';

const sampleMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hello! Can you help me with something?',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
  },
  {
    id: '2',
    role: 'assistant',
    content:
      "Of course! I'd be happy to help. What do you need assistance with?",
    timestamp: new Date(Date.now() - 240000), // 4 minutes ago
  },
  {
    id: '3',
    role: 'user',
    content: 'I need to create a new component for my project.',
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
  },
  {
    id: '4',
    role: 'assistant',
    content:
      'Great! I can help you with that. What kind of component do you want to create? Please provide some details about its purpose and functionality.',
    timestamp: new Date(Date.now() - 120000), // 2 minutes ago
  },
];

export function DefaultDemo() {
  const [messages, setMessages] = React.useState<Message[]>(sampleMessages);

  const handleSubmit = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'I received your message. In a real application, this would be processed by an AI assistant.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <ChatWidget
      messages={messages}
      onSubmit={handleSubmit}
      maxHeight="500px"
      inputPlaceholder="Type your message..."
    />
  );
}
