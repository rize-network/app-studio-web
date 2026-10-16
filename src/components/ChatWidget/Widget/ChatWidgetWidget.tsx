import React, { useState } from 'react';
import { View, Text } from 'app-studio';
import { ChatWidget } from '../ChatWidget';
import { PanelIcon, CloseIcon } from '../../Icon/Icon';
import {
  useContextSelector,
  ContextOverlay,
  ContextElement,
} from './useContextSelector';
import type { Message } from '../ChatWidget/ChatWidget.type';

interface ChatWidgetWidgetProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string, contextElements: ContextElement[]) => void;
  bubbleSize?: 'sm' | 'md' | 'lg';
}

/**
 * ChatWidget Widget Component
 * A floating chat widget with DOM element selection capabilities.
 */
export const ChatWidgetWidget: React.FC<ChatWidgetWidgetProps> = ({
  initialMessages = [],
  onSendMessage,
  bubbleSize = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContextPickerActive, setIsContextPickerActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [contextElements, setContextElements] = useState<ContextElement[]>([]);

  // Hook for context selection
  const { highlightedElement } = useContextSelector({
    active: isContextPickerActive,
    onSelect: (element) => {
      setContextElements((prev) => [...prev, element]);
      setIsContextPickerActive(false);
      setIsOpen(true); // Re-open chat after selection
    },
    onCancel: () => {
      setIsContextPickerActive(false);
      setIsOpen(true);
    },
  });

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleContextPickerClick = () => {
    setIsContextPickerActive(true);
    setIsOpen(false); // Minimize chat while picking
  };

  const handleRemoveContextElement = (id: string) => {
    setContextElements((prev) => prev.filter((el) => el.id !== id));
  };

  const handleSubmit = (content: string) => {
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      contextElements: [...contextElements],
    };

    setMessages((prev) => [...prev, newMessage]);
    onSendMessage?.(content, contextElements);

    // Clear context after sending
    setContextElements([]);

    // Simulate assistant response
    setTimeout(() => {
      const isToolCall = Math.random() > 0.7;
      const hasReasoning = Math.random() > 0.4;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        timestamp: new Date(),
        content: isToolCall
          ? 'I will highlight the selected element.'
          : `I received your message regarding: ${
              newMessage.contextElements?.map((e) => e.name).join(', ') ||
              'general context'
            }. How can I assist you further?`,
        messageType: isToolCall ? 'tool' : 'text',
        reasoning: hasReasoning
          ? 'Analyzing the user input and context... The user seems to be asking about specific elements. I should tailor my response to the selected context.'
          : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (isToolCall) {
        // Add a follow-up system message after a tool call
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 2).toString(),
              role: 'assistant',
              messageType: 'system',
              content: 'Tool "highlightElement" executed successfully.',
              timestamp: new Date(),
            },
          ]);
        }, 800);
      }
    }, 1000);
  };

  return (
    <View position="fixed" bottom={24} right={24} zIndex={9999}>
      {/* Context Picker Overlay */}
      <ContextOverlay element={highlightedElement} />

      {/* Picking Mode Indicator (when chat is hidden) */}
      {isContextPickerActive && (
        <View
          position="fixed"
          top={24}
          left="50%"
          transform="translateX(-50%)"
          backgroundColor="rgba(0,0,0,0.8)"
          color="white"
          padding="8px 16px"
          borderRadius="24px"
          zIndex={10000}
          boxShadow="0 4px 6px rgba(0,0,0,0.1)"
        >
          <Text fontWeight="600" fontSize="14px">
            Click an element to select it. Press ESC to cancel.
          </Text>
        </View>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <View
          position="absolute"
          bottom={60}
          right={0}
          width="400px"
          height="600px"
          marginBottom="16px"
          backgroundColor="rgba(255, 255, 255, 0.8)"
          backdropFilter="blur(20px)"
          borderRadius="24px"
          border="1px solid rgba(255, 255, 255, 0.4)"
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          overflow="hidden"
          animation="slideUp 0.3s ease-out"
          style={{
            animation: 'fadeIn 0.2s ease-out',
            transformOrigin: 'bottom right',
          }}
        >
          {/* Header */}
          <View
            padding="16px"
            borderBottom="1px solid rgba(0,0,0,0.05)"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontWeight="bold" color="color-gray-800">
              ChatWidget Assistant
            </Text>
            <View
              as="button"
              onClick={() => setIsOpen(false)}
              cursor="pointer"
              padding="4px"
              borderRadius="50%"
              border="none"
              backgroundColor="transparent"
              _hover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
            >
              <CloseIcon widthHeight={16} color="color-gray-500" />
            </View>
          </View>

          {/* Chat Component */}
          <ChatWidget
            messages={messages}
            onSubmit={handleSubmit}
            size={bubbleSize}
            variant="minimal"
            enableContextPicker
            selectedContextElements={contextElements}
            onContextPickerClick={handleContextPickerClick}
            onRemoveContextElement={handleRemoveContextElement}
            styles={{
              container: {
                height: 'calc(100% - 60px)',
                backgroundColor: 'transparent',
              },
              inputContainer: {
                backgroundColor: 'white',
                margin: '0 16px 16px 16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        </View>
      )}

      {/* Floating Toggle Button */}
      {!isContextPickerActive && (
        <View
          as="button"
          onClick={toggleOpen}
          width="56px"
          height="56px"
          borderRadius="50%"
          backgroundColor="theme-primary"
          border="none"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="transform 0.2s ease"
          _hover={{ transform: 'scale(1.05)' }}
          _active={{ transform: 'scale(0.95)' }}
          data-chatwidget-ignore="true" // Ignore clicks on the widget itself for context picking
        >
          {isOpen ? (
            <CloseIcon widthHeight={24} color="white" />
          ) : (
            <PanelIcon widthHeight={24} color="white" />
          )}
        </View>
      )}
    </View>
  );
};
