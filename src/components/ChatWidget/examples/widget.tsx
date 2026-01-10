import React, { useState } from 'react';
import { View, Button, Text, Vertical } from 'app-studio';
import { ChatWidgetWidget } from '../Widget/ChatWidgetWidget';

export function WidgetDemo() {
  const [showWidget, setShowWidget] = useState(true);

  return (
    <View
      height="400px"
      position="relative"
      border="1px dashed #ccc"
      borderRadius="12px"
      padding="24px"
    >
      <Vertical gap={16}>
        <Text fontSize="18px" fontWeight="bold">
          Interactive Widget Demo
        </Text>
        <Text color="color.gray.600">
          The widget is fixed to the bottom-right of this container (visually
          simulating a page). Click the floating action button to open the chat.
        </Text>
        <Text color="color.gray.600">
          Try the &quot;Plus&quot; icon in the chat input to enter &quot;Context
          Selection Mode&quot; and pick elements on this page.
        </Text>

        <Button onClick={() => setShowWidget(!showWidget)} width="fit-content">
          {showWidget ? 'Hide Widget' : 'Show Widget'}
        </Button>

        {/* Dummy elements to pick */}
        <View display="flex" gap="16px" flexWrap="wrap" marginTop="24px">
          <View
            padding="16px"
            backgroundColor="color.blue.100"
            borderRadius="8px"
            id="box-1"
          >
            Pick me (Box 1)
          </View>
          <View
            padding="16px"
            backgroundColor="color.green.100"
            borderRadius="8px"
            id="box-2"
          >
            Pick me (Box 2)
          </View>
          <View
            padding="16px"
            backgroundColor="color.purple.100"
            borderRadius="8px"
            id="text-element"
          >
            <Text>Text Element</Text>
          </View>
        </View>
      </Vertical>

      {/* Render widget inside this relative container for demo purposes (usually it's fixed to body) */}
      {showWidget && (
        <View
          position="absolute"
          bottom={0}
          right={0}
          width="100%"
          height="100%"
          pointerEvents="none"
        >
          <View pointerEvents="auto">
            <ChatWidgetWidget
              bubbleSize="md"
              initialMessages={[
                {
                  id: 'welcome',
                  role: 'assistant',
                  content:
                    'Hi! Click the + button to select an element from the page.',
                  timestamp: new Date(),
                },
                {
                  id: 'system-msg',
                  role: 'assistant',
                  messageType: 'system',
                  content: 'System: Context selection mode enabled',
                  timestamp: new Date(),
                },
                {
                  id: 'reasoning-demo',
                  role: 'assistant',
                  content: 'I can also show my thinking process!',
                  reasoning:
                    'The user might want to know about internal logic. I should demonstrate the reasoning block.',
                  timestamp: new Date(),
                },
                {
                  id: 'tool-call',
                  role: 'assistant',
                  messageType: 'tool',
                  content: 'Called function: getElementById("box-1")',
                  timestamp: new Date(),
                },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );
}
