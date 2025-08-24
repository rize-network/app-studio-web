import React from 'react';
import { View, Horizontal, Vertical, Text } from 'app-studio';
import { AgentMessage as AgentMessageType } from './AgentChat.props';
import { DefaultAgentChatStyles } from './AgentChat.style';
import { Loader } from '../../../Loader/Loader';
import { Avatar } from '../../../Avatar/Avatar';
import { MessageAttachmentPreview } from './MessageAttachmentPreview';

export interface AgentMessageProps {
  message: AgentMessageType;
  showTimestamp?: boolean;
  showAvatar?: boolean;
  isLast?: boolean;
  views?: {
    container?: any;
    content?: any;
    timestamp?: any;
    avatar?: any;
  };
}

/**
 * AgentMessage Component
 *
 * Renders individual messages in the chat with support for different message types,
 * attachments, function calls, code execution, and more.
 */
export const AgentMessage: React.FC<AgentMessageProps> = ({
  message,
  showTimestamp = true,
  showAvatar = true,
  isLast = false,
  views = {},
}) => {
  const isUser = message.role === 'user';
  const isThought = message.thought;
  const isLoading = message.isLoading;

  // Determine message styles
  const messageStyles = {
    ...DefaultAgentChatStyles.message,
    ...(isUser
      ? DefaultAgentChatStyles.userMessage
      : DefaultAgentChatStyles.botMessage),
    ...(isThought ? DefaultAgentChatStyles.thoughtMessage : {}),
    ...(isLoading ? DefaultAgentChatStyles.loadingMessage : {}),
    ...views.container,
  };

  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Render message content based on type
  const renderMessageContent = () => {
    if (isLoading) {
      return (
        <Horizontal alignItems="center" gap={8}>
          <Loader size="sm" />
          <Text color="color.gray.600">Thinking...</Text>
        </Horizontal>
      );
    }

    return (
      <Vertical gap={8}>
        {/* Text content */}
        {message.text && (
          <Text {...DefaultAgentChatStyles.messageContent} {...views.content}>
            {message.text}
          </Text>
        )}

        {/* Inline data (images, files, etc.) */}
        {message.inlineData && (
          <View {...DefaultAgentChatStyles.inlineData}>
            {message.inlineData.mediaType === 'image' ? (
              <img
                src={message.inlineData.data}
                alt={message.inlineData.displayName || 'Uploaded image'}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              />
            ) : message.inlineData.mediaType === 'video' ? (
              <video
                src={message.inlineData.data}
                controls
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              />
            ) : message.inlineData.mediaType === 'audio' ? (
              <audio
                src={message.inlineData.data}
                controls
                style={{ width: '100%' }}
              />
            ) : (
              <View
                padding={12}
                backgroundColor="color.gray.100"
                borderRadius="8px"
              >
                <Text fontSize="sm" fontWeight="500">
                  📄 {message.inlineData.displayName || 'File'}
                </Text>
                <Text fontSize="xs" color="color.gray.600">
                  {message.inlineData.mimeType}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <Horizontal gap={8} flexWrap="wrap">
            {message.attachments.map((attachment, index) => (
              <MessageAttachmentPreview key={index} attachment={attachment} />
            ))}
          </Horizontal>
        )}

        {/* Function Call */}
        {message.functionCall && (
          <View {...DefaultAgentChatStyles.functionCall}>
            <Text fontSize="sm" fontWeight="600" color="color.purple.700">
              🔧 Function Call: {message.functionCall.name}
            </Text>
            {message.functionCall.args && (
              <View marginTop={8}>
                <Text fontSize="xs" color="color.purple.600">
                  Arguments:
                </Text>
                <View
                  backgroundColor="color.purple.25"
                  padding={8}
                  borderRadius="4px"
                  marginTop={4}
                >
                  <Text fontSize="xs" fontFamily="Monaco, Consolas, monospace">
                    {JSON.stringify(message.functionCall.args, null, 2)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Function Response */}
        {message.functionResponse && (
          <View {...DefaultAgentChatStyles.functionResponse}>
            <Text fontSize="sm" fontWeight="600" color="color.green.700">
              ✅ Function Response: {message.functionResponse.name}
            </Text>
            {message.functionResponse.response && (
              <View marginTop={8}>
                <View
                  backgroundColor="color.green.25"
                  padding={8}
                  borderRadius="4px"
                >
                  <Text fontSize="xs" fontFamily="Monaco, Consolas, monospace">
                    {typeof message.functionResponse.response === 'string'
                      ? message.functionResponse.response
                      : JSON.stringify(
                          message.functionResponse.response,
                          null,
                          2
                        )}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Executable Code */}
        {message.executableCode && (
          <View {...DefaultAgentChatStyles.codeBlock}>
            <Text
              fontSize="sm"
              fontWeight="600"
              color="color.gray.100"
              marginBottom={8}
            >
              💻 Code ({message.executableCode.language})
            </Text>
            <Text fontSize="sm" fontFamily="Monaco, Consolas, monospace">
              {message.executableCode.code}
            </Text>
          </View>
        )}

        {/* Code Execution Result */}
        {message.codeExecutionResult && (
          <View {...DefaultAgentChatStyles.functionResponse}>
            <Text fontSize="sm" fontWeight="600" color="color.green.700">
              📊 Execution Result: {message.codeExecutionResult.outcome}
            </Text>
            {message.codeExecutionResult.output && (
              <View marginTop={8}>
                <View
                  backgroundColor="color.green.25"
                  padding={8}
                  borderRadius="4px"
                >
                  <Text fontSize="xs" fontFamily="Monaco, Consolas, monospace">
                    {message.codeExecutionResult.output}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Rendered Content (for search results, etc.) */}
        {message.renderedContent && (
          <View
            marginTop={8}
            padding={12}
            backgroundColor="color.blue.50"
            borderRadius="8px"
            border="1px solid"
            borderColor="color.blue.200"
          >
            <div
              dangerouslySetInnerHTML={{ __html: message.renderedContent }}
            />
          </View>
        )}

        {/* Evaluation Status */}
        {message.evalStatus && (
          <View
            marginTop={8}
            padding={8}
            backgroundColor={
              message.evalStatus === 'PASS' ? 'color.green.50' : 'color.red.50'
            }
            borderRadius="8px"
            border="1px solid"
            borderColor={
              message.evalStatus === 'PASS'
                ? 'color.green.200'
                : 'color.red.200'
            }
          >
            <Text
              fontSize="sm"
              fontWeight="600"
              color={
                message.evalStatus === 'PASS'
                  ? 'color.green.700'
                  : 'color.red.700'
              }
            >
              Evaluation: {message.evalStatus}
            </Text>
            {message.evalScore !== undefined && (
              <Text fontSize="xs" color="color.gray.600">
                Score: {message.evalScore} / {message.evalThreshold}
              </Text>
            )}
            {message.failedMetric && (
              <Text fontSize="xs" color="color.red.600">
                Failed Metric: {message.failedMetric}
              </Text>
            )}
          </View>
        )}
      </Vertical>
    );
  };

  return (
    <Horizontal
      gap={12}
      alignItems="flex-start"
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
      width="100%"
    >
      {/* Avatar for bot messages */}
      {showAvatar && !isUser && (
        <Avatar
          size="sm"
          backgroundColor="color.green.500"
          color="white"
          {...DefaultAgentChatStyles.botAvatar}
          {...views.avatar}
        >
          🤖
        </Avatar>
      )}

      {/* Message content */}
      <Vertical gap={4} maxWidth="80%">
        <View {...messageStyles}>{renderMessageContent()}</View>

        {/* Timestamp */}
        {showTimestamp && !isLoading && (
          <Text
            {...DefaultAgentChatStyles.timestamp}
            {...views.timestamp}
            textAlign={isUser ? 'right' : 'left'}
          >
            {formatTimestamp(message.timestamp)}
          </Text>
        )}
      </Vertical>

      {/* Avatar for user messages */}
      {showAvatar && isUser && (
        <Avatar
          size="sm"
          backgroundColor="color.blue.500"
          color="white"
          {...DefaultAgentChatStyles.userAvatar}
          {...views.avatar}
        >
          👤
        </Avatar>
      )}
    </Horizontal>
  );
};
