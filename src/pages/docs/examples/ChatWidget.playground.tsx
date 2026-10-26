import React, { useState } from 'react';
import { ChatWidget } from 'src/components/ChatWidget/ChatWidget';

export function ChatWidgetPlayground() {
  const [input, setInput] = useState('');
  return (
    <ChatWidget
      inputValue={input}
      onInputChange={setInput}
      inputPlaceholder="Write a local message…"
      onSubmit={() => setInput('')}
      messages={[
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Hello! This example stays local.',
          timestamp: new Date(),
        },
      ]}
      maxHeight={280}
    />
  );
}
