/**
 * ChatWidgetWidget (React Native)
 *
 * The web widget uses `position: fixed` (unsupported on RN, so it never
 * floats), `backdropFilter: blur` and DOM element-selection. This native
 * variant is a self-contained floating chat: a circular FAB anchored to the
 * bottom-right of its container that opens/closes a chat panel on press, with
 * a scrollable message list and a text input. No DOM / fixed / blur.
 */

import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Vertical, Horizontal, Input } from 'app-studio';
import { PanelIcon, CloseIcon, SendIcon } from '../../Icon/Icon';
import type { Message } from '../ChatWidget/ChatWidget.type';

interface ChatWidgetWidgetProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string, contextElements: any[]) => void;
  bubbleSize?: 'sm' | 'md' | 'lg';
}

export const ChatWidgetWidget: React.FC<ChatWidgetWidgetProps> = ({
  initialMessages = [],
  onSendMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const handleSubmit = () => {
    const content = draft.trim();
    if (!content) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    } as Message;
    setMessages((prev) => [...prev, userMessage]);
    setDraft('');
    onSendMessage?.(content, []);

    // Simulated assistant echo so the demo is interactive.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `You said: "${content}"`,
          timestamp: new Date(),
        } as Message,
      ]);
      scrollRef.current?.scrollToEnd?.({ animated: true });
    }, 600);
  };

  return (
    <View
      position="absolute"
      bottom={24}
      right={24}
      zIndex={9999}
      alignItems="flex-end"
    >
      {/* Chat panel */}
      {isOpen && (
        <View
          width={300}
          height={420}
          marginBottom={16}
          backgroundColor="color-white"
          borderRadius={20}
          borderWidth={1}
          borderStyle="solid"
          borderColor="color-gray-200"
          overflow="hidden"
          shadow={0.25}
        >
          {/* Header */}
          <Horizontal
            padding={14}
            justifyContent="space-between"
            alignItems="center"
            borderBottomWidth={1}
            borderStyle="solid"
            borderColor="color-gray-100"
            backgroundColor="color-gray-50"
          >
            <Text fontWeight="700" color="color-gray-800">
              Assistant
            </Text>
            <View
              onPress={() => setIsOpen(false)}
              padding={4}
              borderRadius={999}
            >
              <CloseIcon widthHeight={18} color="color-gray-500" />
            </View>
          </Horizontal>

          {/* Messages */}
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 12 }}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd?.({ animated: true })
            }
          >
            <Vertical gap={8}>
              {messages.length === 0 && (
                <Text color="color-gray-400" fontSize={13}>
                  Send a message to start the conversation.
                </Text>
              )}
              {messages.map((m) => {
                const isUser = m.role === 'user';
                return (
                  <View
                    key={m.id}
                    alignSelf={isUser ? 'flex-end' : 'flex-start'}
                    maxWidth="80%"
                    paddingVertical={8}
                    paddingHorizontal={12}
                    borderRadius={14}
                    backgroundColor={
                      isUser ? 'theme-primary' : 'color-gray-100'
                    }
                  >
                    <Text
                      fontSize={14}
                      color={isUser ? 'color-white' : 'color-gray-800'}
                    >
                      {m.content}
                    </Text>
                  </View>
                );
              })}
            </Vertical>
          </ScrollView>

          {/* Input row */}
          <Horizontal
            gap={8}
            padding={10}
            alignItems="center"
            borderTopWidth={1}
            borderStyle="solid"
            borderColor="color-gray-100"
          >
            <Input
              flex={1}
              value={draft}
              onChangeText={setDraft}
              placeholder="Type a message…"
              placeholderTextColor="color-gray-400"
              paddingVertical={8}
              paddingHorizontal={12}
              borderRadius={999}
              borderWidth={1}
              borderStyle="solid"
              borderColor="color-gray-200"
              backgroundColor="color-white"
              color="color-gray-900"
              onSubmitEditing={handleSubmit}
              returnKeyType="send"
            />
            <View
              onPress={handleSubmit}
              widthHeight={40}
              borderRadius={999}
              backgroundColor="theme-primary"
              alignItems="center"
              justifyContent="center"
            >
              <SendIcon widthHeight={18} color="color-white" />
            </View>
          </Horizontal>
        </View>
      )}

      {/* Floating action button */}
      <View
        onPress={() => setIsOpen((v) => !v)}
        widthHeight={56}
        borderRadius={999}
        backgroundColor="theme-primary"
        alignItems="center"
        justifyContent="center"
        shadow={0.2}
      >
        {isOpen ? (
          <CloseIcon widthHeight={24} color="color-white" />
        ) : (
          <PanelIcon widthHeight={24} color="color-white" />
        )}
      </View>
    </View>
  );
};
