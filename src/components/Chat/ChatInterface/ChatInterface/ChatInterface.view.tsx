/**
 * ChatInterface View
 */

import React from 'react';
import { View } from 'app-studio';
import { Text } from '../../../Text/Text';
import { ChatInterfaceProps } from './ChatInterface.props';
import {
  defaultContainerStyles,
  defaultMessagesContainerStyles,
  defaultInputContainerStyles,
  defaultControlsContainerStyles,
  backgroundImageStyles,
  backgroundOverlayStyles,
} from './ChatInterface.style';
import { MessageBubble } from '../../MessageBubble/MessageBubble';
import { PromptInput } from '../../PromptInput/PromptInput';

interface Props extends ChatInterfaceProps {
  inputValue: string;
  isSubmitting: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleInputChange: (value: string) => void;
  handleSubmit: () => void;
}

export const ChatInterfaceView: React.FC<Props> = ({
  messages,
  onSubmit,
  onEdit,
  onDelete,
  isLoading = false,
  placeholder = 'Type a message...',
  enableFileUpload = false,
  enableVoiceInput = false,
  enableSuggestions = false,
  backgroundImageUrl,
  styles = {},
  children,
  inputValue,
  isSubmitting,
  messagesEndRef,
  handleInputChange,
  handleSubmit,
  ...props
}) => {
  return (
    <View {...defaultContainerStyles} {...props} {...styles.container}>
      {backgroundImageUrl && (
        <>
          <View
            {...backgroundImageStyles}
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
          <View {...backgroundOverlayStyles} />
        </>
      )}

      <View
        display="flex"
        flexDirection="column"
        flex={1}
        width="100%"
        maxWidth="100%"
        zIndex={10}
      >
        <View
          id="messages-container"
          {...defaultMessagesContainerStyles}
          {...styles.messagesContainer}
          ref={(el) => {
            // Attach the ref to the DOM element
            if (el && messagesEndRef.current) {
              (messagesEndRef as any).current = el;
            }
          }}
        >
          {messages.length === 0 ? (
            <View
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding="xl"
            >
              <View
                backgroundColor="color.gray.50"
                padding="xl"
                borderRadius="lg"
                maxWidth="500px"
                textAlign="center"
                boxShadow="sm"
                // '@media (prefers-color-scheme: dark)': {
                // backgroundColor="color.gray.800"
                // }
              >
                <Text size="xl" fontWeight="bold" marginBottom="md">
                  Welcome to the Chat
                </Text>
                <Text color="color.gray.600" marginBottom="lg">
                  Start a conversation by typing a message below.
                </Text>
              </View>
            </View>
          ) : (
            <View width="100%" paddingTop="2px">
              <View width="100%">
                {messages.map((message) => (
                  <View
                    key={message.id}
                    display="flex"
                    flexDirection="column"
                    justifyContent="between"
                    paddingX="5"
                    marginBottom="3"
                    width="100%"
                    maxWidth="100%"
                    marginX="auto"
                    borderRadius="lg"
                  >
                    <MessageBubble
                      message={message}
                      onEdit={
                        onEdit
                          ? (newContent) => onEdit(message.id, newContent)
                          : undefined
                      }
                      onDelete={
                        onDelete ? () => onDelete(message.id) : undefined
                      }
                    />
                  </View>
                ))}

                {isLoading && (
                  <View
                    display="flex"
                    flexDirection="column"
                    justifyContent="between"
                    paddingX="5"
                    marginBottom="3"
                    width="100%"
                    maxWidth="100%"
                    marginX="auto"
                    borderRadius="lg"
                  >
                    <MessageBubble
                      message={{
                        id: 'loading',
                        type: 'assistant',
                        content: '',
                        timestamp: new Date(),
                        isLoading: true,
                      }}
                    />
                  </View>
                )}

                <View paddingBottom="12px" />
                <View paddingBottom="6px" />
              </View>
            </View>
          )}
        </View>

        <View {...defaultInputContainerStyles} {...styles.inputContainer}>
          <View
            width="100%"
            marginX="auto"
            insetX="0"
            backgroundColor="transparent"
            display="flex"
            justifyContent="center"
          >
            <View
              display="flex"
              flexDirection="column"
              paddingX="3"
              width="100%"
              maxWidth="6xl"
            >
              <View position="relative">
                <PromptInput
                  value={inputValue}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  placeholder={placeholder}
                  isLoading={isSubmitting || isLoading}
                  enableFileUpload={enableFileUpload}
                  enableVoiceInput={enableVoiceInput}
                  enableSuggestions={enableSuggestions}
                  transparentBackground={!!backgroundImageUrl}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {children && (
        <View {...defaultControlsContainerStyles} {...styles.controlsContainer}>
          {children}
        </View>
      )}
    </View>
  );
};
