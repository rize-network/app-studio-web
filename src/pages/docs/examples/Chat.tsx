import React, { useState } from 'react';
import { ChatInput } from 'src/components/ChatInput/ChatInput';
import { Text, Vertical } from 'app-studio';

export function ChatExample() {
  const [message, setMessage] = useState('');
  return (
    <Vertical gap={16} width="100%">
      <ChatInput
        placeholder="Write a local message…"
        onSubmit={(value) => setMessage(value)}
      />
      <Text role="status">
        {message ? `Submitted: ${message}` : 'Messages stay in this example.'}
      </Text>
    </Vertical>
  );
}
