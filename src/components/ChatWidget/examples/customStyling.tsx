import React from 'react';
import { ChatWidget } from '../ChatWidget';
import type { Message } from '../ChatWidget/ChatWidget.type';

const messagesWithAttachments: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'I have some files to share',
    timestamp: new Date(Date.now() - 120000),
    attachments: [
      {
        id: 'att1',
        name: 'document.pdf',
        size: 1024000,
        type: 'application/pdf',
      },
      {
        id: 'att2',
        name: 'image.png',
        size: 512000,
        type: 'image/png',
      },
    ],
  },
  {
    id: '2',
    role: 'assistant',
    content:
      "I can see you've shared some files. How can I help you with them?",
    timestamp: new Date(Date.now() - 60000),
  },
];

export function CustomStylingDemo() {
  return (
    <ChatWidget
      messages={messagesWithAttachments}
      variant="glassy"
      maxHeight="400px"
      enableAttachments
      styles={{
        container: {
          borderRadius: '24px',
          border: '2px solid #3b82f6',
        },
        userBubble: {
          backgroundColor: '#10b981',
        },
        assistantBubble: {
          backgroundColor: '#f59e0b20',
          border: '1px solid #f59e0b',
        },
        sendButton: {
          backgroundColor: '#10b981',
        },
      }}
      inputPlaceholder="Custom styled chat..."
    />
  );
}
