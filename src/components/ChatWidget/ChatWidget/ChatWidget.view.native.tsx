/**
 * ChatWidgetView (React Native)
 *
 * The web view's input is `<View as="textarea">` — on native `as` is ignored,
 * so it renders a non-editable View and the chat isn't interactive. This native
 * variant mirrors the same surface (messages list, context chips, attachment /
 * context-picker / send buttons) but uses app-studio's `Input` (a real
 * TextInput) wired to `internalInputValue` / `handleInputChange` /
 * `handleSubmit`, so you can type and send on native.
 */

import React from 'react';
import { ScrollView } from 'react-native';
import { View, Horizontal, Vertical, Text, Input } from 'app-studio';
import type { ChatWidgetViewProps } from './ChatWidget.props';
import { Variants, BubbleSizes } from './ChatWidget.style';
import {
  SendIcon,
  AttachmentIcon,
  CloseIcon,
  MousePointerIcon,
} from '../../Icon/Icon';
import type { Message } from './ChatWidget.type';

const formatTime = (ts?: Date) => {
  try {
    const d = ts instanceof Date ? ts : ts ? new Date(ts) : null;
    if (!d) return '';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
};

const ChatWidgetView: React.FC<ChatWidgetViewProps> = ({
  messages = [],
  inputPlaceholder = 'Type a message...',
  disableInput = false,
  variant = 'default',
  size = 'md',
  showTimestamps = true,
  enableAttachments = false,
  enableContextPicker = false,
  selectedContextElements = [],
  onContextPickerClick,
  onRemoveContextElement,
  isLoading = false,
  loadingText = 'Loading...',
  styles = {},
  maxHeight = 600,
  internalInputValue,
  handleInputChange,
  handleSubmit,
  messagesRef,
  ...props
}) => {
  const value = internalInputValue ?? '';
  const hasText = value.trim().length > 0;
  const canSend = hasText && !disableInput && !isLoading;
  const scrollRef = React.useRef<ScrollView>(null);

  const submit = () => {
    if (canSend) handleSubmit?.();
  };

  return (
    <Vertical
      backgroundColor="color-white"
      borderRadius={12}
      borderWidth={1}
      borderStyle="solid"
      borderColor="color-gray-200"
      overflow="hidden"
      {...(Variants as any)[variant]}
      {...styles.container}
      {...(props as any)}
    >
      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={{ maxHeight: typeof maxHeight === 'number' ? maxHeight : 360 }}
        contentContainerStyle={{ padding: 12 }}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd?.({ animated: true })
        }
      >
        {messages.length === 0 ? (
          <Text color="color-gray-500" fontSize={14}>
            No messages yet. Start a conversation.
          </Text>
        ) : (
          <Vertical gap={8}>
            {messages.map((message: Message) => {
              const isUser = message.role === 'user';
              return (
                <Vertical
                  key={message.id}
                  alignSelf={isUser ? 'flex-end' : 'flex-start'}
                  maxWidth="85%"
                  gap={2}
                >
                  <View
                    paddingVertical={8}
                    paddingHorizontal={12}
                    borderRadius={14}
                    backgroundColor={isUser ? 'theme-primary' : 'color-gray-100'}
                  >
                    <Text
                      fontSize={(BubbleSizes as any)?.[size]?.fontSize ?? 14}
                      color={isUser ? 'color-white' : 'color-gray-800'}
                    >
                      {message.content}
                    </Text>
                  </View>
                  {showTimestamps && message.timestamp && (
                    <Text
                      fontSize={10}
                      color="color-gray-400"
                      alignSelf={isUser ? 'flex-end' : 'flex-start'}
                    >
                      {formatTime(message.timestamp as any)}
                    </Text>
                  )}
                </Vertical>
              );
            })}
            {isLoading && (
              <Text color="color-gray-500" fontSize={13}>
                {loadingText}
              </Text>
            )}
          </Vertical>
        )}
      </ScrollView>

      {/* Context chips */}
      {selectedContextElements.length > 0 && (
        <Horizontal gap={8} flexWrap="wrap" paddingHorizontal={12} paddingBottom={8}>
          {selectedContextElements.map((element: any) => (
            <Horizontal
              key={element.id}
              backgroundColor="color-blue-50"
              borderWidth={1}
              borderStyle="solid"
              borderColor="color-blue-200"
              borderRadius={999}
              paddingVertical={6}
              paddingHorizontal={10}
              alignItems="center"
              gap={6}
            >
              <Text fontSize={12} color="color-blue-700" fontWeight="500">
                {element.name}
              </Text>
              <View onPress={() => onRemoveContextElement?.(element.id)}>
                <CloseIcon widthHeight={12} color="color-blue-700" />
              </View>
            </Horizontal>
          ))}
        </Horizontal>
      )}

      {/* Input row */}
      <Horizontal
        gap={8}
        padding={10}
        alignItems="flex-end"
        borderTopWidth={1}
        borderStyle="solid"
        borderColor="color-gray-100"
        {...styles.inputContainer}
      >
        {enableAttachments && (
          <View
            widthHeight={36}
            borderRadius={8}
            alignItems="center"
            justifyContent="center"
            backgroundColor="color-gray-50"
          >
            <AttachmentIcon widthHeight={16} color="color-gray-600" />
          </View>
        )}
        <Input
          flex={1}
          multiline
          value={value}
          onChangeText={(t: string) => handleInputChange?.(t)}
          onSubmitEditing={submit}
          editable={!disableInput && !isLoading}
          placeholder={inputPlaceholder}
          placeholderTextColor="color-gray-400"
          paddingVertical={8}
          paddingHorizontal={12}
          borderRadius={18}
          borderWidth={1}
          borderStyle="solid"
          borderColor="color-gray-200"
          backgroundColor="color-white"
          color="color-gray-900"
          maxHeight={100}
          opacity={disableInput || isLoading ? 0.5 : 1}
        />
        {enableContextPicker && (
          <View
            onPress={onContextPickerClick}
            widthHeight={36}
            borderRadius={8}
            alignItems="center"
            justifyContent="center"
            backgroundColor="color-gray-50"
          >
            <MousePointerIcon widthHeight={16} color="color-gray-600" />
          </View>
        )}
        <View
          onPress={submit}
          widthHeight={40}
          borderRadius={999}
          alignItems="center"
          justifyContent="center"
          backgroundColor={canSend ? 'theme-primary' : 'color-gray-300'}
          opacity={canSend ? 1 : 0.6}
          {...styles.sendButton}
        >
          <SendIcon widthHeight={16} color="color-white" filled={false} />
        </View>
      </Horizontal>
    </Vertical>
  );
};

export default ChatWidgetView;
