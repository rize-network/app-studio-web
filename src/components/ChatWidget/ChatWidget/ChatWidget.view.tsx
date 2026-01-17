import React, { useCallback } from 'react';
import { View, Horizontal, Vertical, Text } from 'app-studio';
import type { ChatWidgetViewProps } from './ChatWidget.props';
import {
  DefaultChatWidgetStyles,
  Sizes,
  Variants,
  BubbleSizes,
  UserBubbleStyles,
  AssistantBubbleStyles,
} from './ChatWidget.style';
import {
  SendIcon,
  AttachmentIcon,
  LoadingSpinnerIcon,
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  ChevronIcon,
  SettingsIcon,
  MousePointerIcon,
} from '../../Icon/Icon';
import type { Message } from './ChatWidget.type';

/**
 * ChatWidget View Component
 * Presentational component for the ChatWidget interface
 */
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
  maxHeight = '600px',
  internalInputValue,
  handleInputChange,
  handleSubmit,
  inputRef,
  messagesRef,
  ...props
}) => {
  // Combine styles
  const containerStyles = {
    ...DefaultChatWidgetStyles.container,
    ...Variants[variant],
    ...styles.container,
  };

  const messagesContainerStyles = {
    ...DefaultChatWidgetStyles.messagesContainer,
    maxHeight,
    ...styles.messagesContainer,
  };

  const inputContainerStyles = {
    ...DefaultChatWidgetStyles.inputContainer,
    ...styles.inputContainer,
  };

  const inputStyles = {
    ...DefaultChatWidgetStyles.input,
    ...Sizes[size],
    ...styles.input,
  };

  // Auto-resize textarea
  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleInputChange(e.target.value);

      // Auto-resize
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    [handleInputChange]
  );

  // Handle Enter key to submit
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const hasText = internalInputValue.trim().length > 0;

  // Separate onSubmit from other props to avoid type conflict
  const { onSubmit: _, ...viewProps } = props;

  return (
    <View {...containerStyles} {...viewProps}>
      {/* Messages Container */}
      <View ref={messagesRef} {...messagesContainerStyles}>
        {messages.length === 0 ? (
          <View
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex={1}
            color="color-gray-400"
          >
            <Text fontSize="14px">No messages yet. Start a conversation!</Text>
          </View>
        ) : (
          messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              size={size}
              showTimestamp={showTimestamps}
              styles={{
                bubble: styles.bubble,
                userBubble: styles.userBubble,
                assistantBubble: styles.assistantBubble,
                timestamp: styles.timestamp,
                reasoningContainer: styles.reasoningContainer,
                reasoningContent: styles.reasoningContent,
                errorMessage: styles.errorMessage,
                systemMessage: styles.systemMessage,
                toolMessage: styles.toolMessage,
              }}
            />
          ))
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <Horizontal
            justifyContent="flex-start"
            alignItems="center"
            gap={8}
            marginTop="8px"
            {...styles.loadingIndicator}
          >
            <LoadingSpinnerIcon
              widthHeight={12}
              color="currentColor"
              filled={false}
              style={{ animation: 'spin 1s linear infinite' }}
            />
            <Text color="color-gray-500" fontSize="14px">
              {loadingText}
            </Text>
          </Horizontal>
        )}
      </View>

      {/* Input Area */}
      <View>
        {/* Context Chips */}
        {selectedContextElements.length > 0 && (
          <Horizontal
            gap={8}
            marginBottom="8px"
            flexWrap="wrap"
            paddingHorizontal="20px"
            {...styles.contextChipsContainer}
          >
            {selectedContextElements.map((element) => (
              <Horizontal
                key={element.id}
                backgroundColor="rgba(37, 99, 235, 0.1)"
                border="1px solid rgba(37, 99, 235, 0.2)"
                borderRadius="6px"
                padding="4px 8px"
                alignItems="center"
                gap={6}
              >
                <Text fontSize="12px" color="color-blue-700" fontWeight="500">
                  {element.name}
                </Text>
                <View
                  as="button"
                  type="button"
                  onClick={() => onRemoveContextElement?.(element.id)}
                  cursor="pointer"
                  border="none"
                  backgroundColor="transparent"
                  display="flex"
                  alignItems="center"
                >
                  <CloseIcon widthHeight={12} color="color-blue-700" />
                </View>
              </Horizontal>
            ))}
          </Horizontal>
        )}

        {/* Input Container */}
        <View as="form" onSubmit={handleSubmit} {...inputContainerStyles}>
          {/* Attachment Button */}
          {enableAttachments && (
            <View
              as="button"
              type="button"
              {...DefaultChatWidgetStyles.attachmentButton}
              {...styles.attachmentButton}
              _hover={{ backgroundColor: 'color-gray-100' }}
            >
              <AttachmentIcon widthHeight={16} color="color-gray-600" />
            </View>
          )}

          {/* Textarea */}
          <View
            as="textarea"
            ref={inputRef}
            value={internalInputValue}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={inputPlaceholder}
            disabled={disableInput || isLoading}
            {...inputStyles}
            style={{
              ...inputStyles,
              opacity: disableInput || isLoading ? 0.5 : 1,
            }}
          />

          <Vertical gap={4} alignItems="center">
            {/* Context Picker Button */}
            {enableContextPicker && (
              <View
                as="button"
                type="button"
                onClick={onContextPickerClick}
                {...DefaultChatWidgetStyles.attachmentButton}
                {...styles.contextPickerButton}
                _hover={{
                  backgroundColor: 'color-gray-100',
                  ...styles.contextPickerButton?._hover,
                }}
                title="Select element from page"
              >
                <MousePointerIcon widthHeight={16} color="color-gray-600" />
              </View>
            )}

            {/* Send Button */}
            <View
              as="button"
              type="submit"
              disabled={!hasText || disableInput || isLoading}
              {...DefaultChatWidgetStyles.sendButton}
              backgroundColor={hasText ? 'theme-primary' : 'color-gray-300'}
              _hover={{
                backgroundColor: hasText ? 'color-blue-600' : 'color-gray-300',
              }}
              {...styles.sendButton}
              style={{
                cursor: hasText ? 'pointer' : 'not-allowed',
                opacity: !hasText || disableInput || isLoading ? 0.6 : 1,
              }}
            >
              <SendIcon widthHeight={16} color="color-white" filled={false} />
            </View>
          </Vertical>
        </View>
      </View>
    </View>
  );
};

/**
 * Chat Bubble Component
 * Renders individual chat messages
 */
interface ChatBubbleProps {
  message: Message;
  size: 'sm' | 'md' | 'lg';
  showTimestamp: boolean;
  styles: {
    bubble?: any;
    userBubble?: any;
    assistantBubble?: any;
    timestamp?: any;
    reasoningContainer?: any;
    reasoningContent?: any;
    errorMessage?: any;
    systemMessage?: any;
    toolMessage?: any;
  };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  size,
  showTimestamp,
  styles,
}) => {
  const [showTimestampOverlay, setShowTimestampOverlay] = React.useState(false);
  const [isReasoningOpen, setIsReasoningOpen] = React.useState(false);

  const isUser = message.role === 'user';
  const isSystem = message.messageType === 'system';
  const isError = message.messageType === 'error';
  const isTool = message.messageType === 'tool';

  // System Message Rendering
  if (isSystem) {
    return (
      <View
        display="flex"
        justifyContent="center"
        padding="8px"
        width="100%"
        {...styles.systemMessage}
      >
        <Horizontal gap={6} alignItems="center" opacity={0.7}>
          <InfoIcon widthHeight={12} color="color-gray-600" />
          <Text fontSize="12px" color="color-gray-600" fontStyle="italic">
            {message.content}
          </Text>
        </Horizontal>
      </View>
    );
  }

  // Tool Message Rendering
  if (isTool) {
    return (
      <View
        display="flex"
        justifyContent="flex-start"
        padding="8px 16px"
        width="100%"
        {...styles.toolMessage}
      >
        <Horizontal
          gap={8}
          alignItems="center"
          backgroundColor="rgba(0,0,0,0.03)"
          padding="8px"
          borderRadius="8px"
          width="100%"
          border="1px solid rgba(0,0,0,0.05)"
        >
          <SettingsIcon widthHeight={14} color="color-gray-600" />
          <Vertical gap={2}>
            <Text fontSize="11px" fontWeight="600" color="color-gray-700">
              Tool Usage
            </Text>
            <Text fontSize="12px" color="color-gray-600" fontFamily="monospace">
              {message.content}
            </Text>
          </Vertical>
        </Horizontal>
      </View>
    );
  }

  // Bubble Styles construction
  const bubbleStyles = {
    ...DefaultChatWidgetStyles.bubble,
    ...BubbleSizes[size],
    ...(isUser ? UserBubbleStyles : AssistantBubbleStyles),
    // Error styles overrides
    ...(isError
      ? {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#b91c1c',
        }
      : {}),
    ...styles.bubble,
    ...(isUser ? styles.userBubble : styles.assistantBubble),
    ...(isError ? styles.errorMessage : {}),
  };

  const timestampStyles = {
    ...DefaultChatWidgetStyles.timestamp,
    [isUser ? 'right' : 'left']: '8px',
    opacity: showTimestampOverlay ? 1 : 0,
    ...styles.timestamp,
  };

  return (
    <View
      position="relative"
      onMouseEnter={() => setShowTimestampOverlay(true)}
      onMouseLeave={() => setShowTimestampOverlay(false)}
      display="flex"
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
    >
      <View {...bubbleStyles}>
        {/* Timestamp Overlay */}
        {showTimestamp && (
          <View {...timestampStyles}>
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </View>
        )}

        {/* Error Icon */}
        {isError && (
          <Horizontal gap={6} marginBottom="4px" alignItems="center">
            <ErrorIcon widthHeight={14} color="#b91c1c" />
            <Text fontWeight="600" fontSize="12px">
              Error
            </Text>
          </Horizontal>
        )}

        {/* Reasoning / Thinking Block */}
        {message.reasoning && (
          <View
            marginBottom="8px"
            borderBottom="1px solid rgba(0,0,0,0.05)"
            paddingBottom="8px"
            {...styles.reasoningContainer}
          >
            <Horizontal
              as="button"
              onClick={() => setIsReasoningOpen(!isReasoningOpen)}
              cursor="pointer"
              gap={4}
              alignItems="center"
              backgroundColor="transparent"
              border="none"
              padding={0}
            >
              <Text fontSize="11px" color="color-gray-500" fontWeight="600">
                Thinking Process
              </Text>
              <ChevronIcon
                orientation={isReasoningOpen ? 'down' : 'right'}
                widthHeight={10}
                color="color-gray-500"
              />
            </Horizontal>
            {isReasoningOpen && (
              <View
                padding="8px"
                backgroundColor="rgba(0,0,0,0.03)"
                borderRadius="8px"
                marginTop="4px"
                {...styles.reasoningContent}
              >
                <Text fontSize="12px" color="color-gray-600" fontStyle="italic">
                  {message.reasoning}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Message Content */}
        <View whiteSpace="pre-wrap" wordBreak="break-word">
          {message.content}
        </View>

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <Vertical gap={4} marginTop="8px">
            {message.attachments.map((attachment) => (
              <Horizontal
                key={attachment.id}
                gap={6}
                padding="6px 8px"
                backgroundColor="rgba(0, 0, 0, 0.05)"
                borderRadius="8px"
                fontSize="12px"
              >
                <AttachmentIcon widthHeight={14} />
                <Text>{attachment.name}</Text>
              </Horizontal>
            ))}
          </Vertical>
        )}

        {/* Context Elements */}
        {message.contextElements && message.contextElements.length > 0 && (
          <Vertical gap={4} marginTop="8px">
            <Text fontSize="11px" color="rgba(0,0,0,0.5)" fontWeight="600">
              Context:
            </Text>
            {message.contextElements.map((element) => (
              <Horizontal
                key={element.id}
                gap={6}
                padding="4px 8px"
                backgroundColor="rgba(37, 99, 235, 0.1)"
                borderRadius="6px"
                fontSize="11px"
                border="1px solid rgba(37, 99, 235, 0.2)"
              >
                <Text color="color-blue-700" fontWeight="500">
                  {element.name}
                </Text>
              </Horizontal>
            ))}
          </Vertical>
        )}
      </View>
    </View>
  );
};

export default ChatWidgetView;
