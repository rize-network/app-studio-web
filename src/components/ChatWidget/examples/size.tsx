import React from 'react';
import { Vertical } from 'app-studio';
import { Title } from '../../Title/Title';
import { ChatWidget } from '../ChatWidget';
import type { Message } from '../ChatWidget/ChatWidget.type';

const sampleMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'What sizes are available?',
    timestamp: new Date(),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'You can choose from small, medium, and large sizes!',
    timestamp: new Date(),
  },
];

export function SizeDemo() {
  return (
    <Vertical gap={32}>
      <Vertical gap={8}>
        <Title level={3}>Small Size</Title>
        <ChatWidget
          messages={sampleMessages}
          size="sm"
          variant="glassy"
          maxHeight="250px"
        />
      </Vertical>

      <Vertical gap={8}>
        <Title level={3}>Medium Size (Default)</Title>
        <ChatWidget
          messages={sampleMessages}
          size="md"
          variant="glassy"
          maxHeight="300px"
        />
      </Vertical>

      <Vertical gap={8}>
        <Title level={3}>Large Size</Title>
        <ChatWidget
          messages={sampleMessages}
          size="lg"
          variant="glassy"
          maxHeight="350px"
        />
      </Vertical>
    </Vertical>
  );
}
