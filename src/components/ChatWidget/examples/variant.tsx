import React from 'react';
import { Vertical } from 'app-studio';
import { Title } from '../../Title/Title';
import { ChatWidget } from '../ChatWidget';
import type { Message } from '../ChatWidget/ChatWidget.type';

const sampleMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Show me the different variants',
    timestamp: new Date(),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Here are the available variants: default, glassy, and minimal.',
    timestamp: new Date(),
  },
];

export function VariantDemo() {
  return (
    <Vertical gap={32}>
      <Vertical gap={8}>
        <Title level={3}>Default Variant</Title>
        <ChatWidget
          messages={sampleMessages}
          variant="default"
          maxHeight="300px"
        />
      </Vertical>

      <Vertical gap={8}>
        <Title level={3}>Glassy Variant</Title>
        <ChatWidget
          messages={sampleMessages}
          variant="glassy"
          maxHeight="300px"
        />
      </Vertical>

      <Vertical gap={8}>
        <Title level={3}>Minimal Variant</Title>
        <ChatWidget
          messages={sampleMessages}
          variant="minimal"
          maxHeight="300px"
        />
      </Vertical>
    </Vertical>
  );
}
