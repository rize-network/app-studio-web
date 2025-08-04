import React, { useEffect } from 'react';
import { View, Vertical, Horizontal, Text } from 'app-studio';
import { ChatInput } from '../../../ChatInput/ChatInput';
import { AgentChatProps } from './AgentChat.props';
import { useAgentChat } from './AgentChat.state';
import { DefaultAgentChatStyles } from './AgentChat.style';
import { AgentMessage } from './AgentMessage';
import { AgentTypingIndicator } from './AgentTypingIndicator';
import { MessageAttachmentPreview } from './MessageAttachmentPreview';
import { Loader } from '../../../Loader/Loader';
import { Alert } from '../../../Alert/Alert';

export interface AgentChatViewProps
  extends Omit<AgentChatProps, 'sessionId'>,
    ReturnType<typeof useAgentChat> {}

/**
 * AgentChat View Component
 *
 * Renders the complete chat interface with message list, input area, and controls
 */
const AgentChatView: React.FC<AgentChatViewProps> = ({
  // Props
  placeholder = 'Type your message...',
  showTimestamps = true,
  showAvatars = true,
  showTypingIndicator = true,
  autoScroll = true,
  enableFileUpload = true,
  enableAudioRecording = false,
  enableVideoRecording = false,
  views,
  containerProps,
  colorScheme = 'blue',
  compact = false,
  rounded = true,
  ariaLabel = 'Agent Chat',
  ariaDescribedBy,

  // State from hook
  messages,
  currentSession,
  isLoading,
  isTyping,
  error,
  inputValue,
  selectedFiles,
  sessionId,
  sendMessage,
  setInputValue,
  handleFileSelect,
  removeFile,
  messagesEndRef,
  setError,
  setSelectedFiles,

  ...props
}) => {
  /**
   * Auto-scroll to bottom when new messages arrive
   */
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  /**
   * Handle message send from ChatInput
   */
  const handleSubmit = async (
    message: string,
    _options?: { model_name?: string; enable_thinking?: boolean }
  ) => {
    if (message.trim() || selectedFiles.length > 0) {
      await sendMessage(message, selectedFiles);
    }
  };

  /**
   * Get pending files for ChatInput
   */
  const getPendingFiles = () => {
    return selectedFiles.map((f) => f.file);
  };

  /**
   * Clear pending files for ChatInput
   */
  const clearPendingFiles = () => {
    selectedFiles.forEach((file) => URL.revokeObjectURL(file.url));
    setSelectedFiles([]);
  };

  /**
   * Get dynamic styles based on theme props
   */
  const getThemeStyles = () => {
    const baseStyles = {
      borderRadius: rounded ? '12px' : '4px',
      padding: compact ? '8px' : '16px',
    };

    const colorStyles = {
      blue: { borderColor: 'color.blue.200' },
      purple: { borderColor: 'color.purple.200' },
      green: { borderColor: 'color.green.200' },
      orange: { borderColor: 'color.orange.200' },
      red: { borderColor: 'color.red.200' },
      gray: { borderColor: 'color.gray.200' },
    };

    return {
      ...baseStyles,
      ...colorStyles[colorScheme],
    };
  };

  return (
    <View
      {...DefaultAgentChatStyles.container}
      {...getThemeStyles()}
      {...containerProps}
      {...views?.container}
      {...props}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {/* Header */}
      <View {...DefaultAgentChatStyles.header} {...views?.header}>
        <Horizontal justifyContent="space-between" alignItems="center">
          <Vertical gap={4}>
            <Text fontSize="lg" fontWeight="600">
              Agent Chat
            </Text>
            {currentSession && (
              <Text fontSize="sm" color="color.gray.600">
                Session: {sessionId?.slice(0, 8)}...
              </Text>
            )}
          </Vertical>

          {isLoading && (
            <Horizontal alignItems="center" gap={8}>
              <Loader size="sm" />
              <Text fontSize="sm" color="color.gray.600">
                Processing...
              </Text>
            </Horizontal>
          )}
        </Horizontal>
      </View>

      {/* Error Display */}
      {error && (
        <Alert
          variant="error"
          title=""
          description={error}
          onClose={() => setError?.(null)}
        >
          {error}
        </Alert>
      )}

      {/* Message List */}
      <View {...DefaultAgentChatStyles.messageList} {...views?.messageList}>
        <Vertical gap={16} padding={16}>
          {messages.length === 0 ? (
            <View {...DefaultAgentChatStyles.emptyState}>
              <Text color="color.gray.500" textAlign="center">
                Start a conversation with the agent
              </Text>
            </View>
          ) : (
            messages.map((message, index) => (
              <AgentMessage
                key={message.id}
                message={message}
                showTimestamp={showTimestamps}
                showAvatar={showAvatars}
                isLast={index === messages.length - 1}
                views={{
                  container:
                    message.role === 'user'
                      ? views?.userMessage
                      : views?.botMessage,
                  ...views?.message,
                }}
              />
            ))
          )}

          {/* Typing Indicator */}
          {showTypingIndicator && isTyping && <AgentTypingIndicator />}

          {/* Loading Message */}
          {isLoading && (
            <AgentMessage
              message={{
                id: 'loading',
                role: 'bot',
                text: '',
                timestamp: Date.now(),
                isLoading: true,
              }}
              showTimestamp={false}
              showAvatar={showAvatars}
              isLast={true}
            />
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </Vertical>
      </View>

      {/* File Attachments Preview */}
      {selectedFiles.length > 0 && (
        <View
          {...DefaultAgentChatStyles.attachmentArea}
          {...views?.attachmentArea}
        >
          <Horizontal gap={8} flexWrap="wrap">
            {selectedFiles.map((file, index) => (
              <MessageAttachmentPreview
                key={index}
                attachment={file}
                onRemove={() => removeFile(index)}
              />
            ))}
          </Horizontal>
        </View>
      )}

      {/* Input Area */}
      <View {...DefaultAgentChatStyles.inputArea} {...views?.inputArea}>
        <ChatInput
          onSubmit={handleSubmit}
          getPendingFiles={getPendingFiles}
          clearPendingFiles={clearPendingFiles}
          value={inputValue}
          onChange={setInputValue}
          placeholder={placeholder}
          loading={isLoading}
          disabled={isLoading}
          hideAttachments={!enableFileUpload}
          views={{
            container: views?.inputField,
          }}
        />
      </View>
    </View>
  );
};

export default AgentChatView;
