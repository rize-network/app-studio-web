import React from 'react';
import { View, Horizontal } from 'app-studio';
import {
  DefaultAgentChatStyles,
  TypingAnimationStyles,
} from './AgentChat.style';
import { Avatar } from '../../../Avatar/Avatar';

/**
 * AgentTypingIndicator Component
 *
 * Shows an animated typing indicator when the agent is processing a response
 */
export const AgentTypingIndicator: React.FC = () => {
  return (
    <Horizontal gap={12} alignItems="flex-start">
      {/* Bot Avatar */}
      <Avatar
        size="sm"
        backgroundColor="color.green.500"
        color="white"
        {...DefaultAgentChatStyles.botAvatar}
      >
        🤖
      </Avatar>

      {/* Typing Animation */}
      <View {...DefaultAgentChatStyles.typingIndicator}>
        <Horizontal gap={4} alignItems="center">
          <View
            {...DefaultAgentChatStyles.typingDot}
            style={{
              ...TypingAnimationStyles.dot1,
              animation: 'typing-pulse 1.4s infinite ease-in-out',
            }}
          />
          <View
            {...DefaultAgentChatStyles.typingDot}
            style={{
              ...TypingAnimationStyles.dot2,
              animation: 'typing-pulse 1.4s infinite ease-in-out',
            }}
          />
          <View
            {...DefaultAgentChatStyles.typingDot}
            style={{
              ...TypingAnimationStyles.dot3,
              animation: 'typing-pulse 1.4s infinite ease-in-out',
            }}
          />
        </Horizontal>
      </View>

      {/* Add CSS keyframes for typing animation */}
      <style>
        {`
          @keyframes typing-pulse {
            0%, 80%, 100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            40% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </Horizontal>
  );
};
