import React from 'react';
import { AgentChatProps } from './AgentChat/AgentChat.props';
import AgentChatView from './AgentChat/AgentChat.view';
import { useAgentChat } from './AgentChat/AgentChat.state';

/**
 * AgentChat Component
 *
 * A comprehensive chat interface for interacting with ADK agents.
 * Supports real-time messaging, file uploads, agent responses, and session management.
 *
 * @example
 * ```tsx
 * <AgentChat
 *   appName="my-agent"
 *   userId="user123"
 *   onSessionCreate={(session) => console.log('Session created:', session)}
 *   onMessageSent={(message) => console.log('Message sent:', message)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With custom styling and configuration
 * <AgentChat
 *   appName="my-agent"
 *   userId="user123"
 *   enableFileUpload={true}
 *   enableAudioRecording={true}
 *   enableVideoRecording={true}
 *   maxFileSize={10 * 1024 * 1024} // 10MB
 *   apiBaseUrl="http://localhost:3000/adk"
 *   views={{
 *     container: { backgroundColor: 'color.gray.50' },
 *     messageList: { maxHeight: '400px' },
 *     inputArea: { borderRadius: '12px' }
 *   }}
 * />
 * ```
 */
const AgentChat: React.FC<AgentChatProps> = (props) => {
  const chatState = useAgentChat(props);

  return <AgentChatView {...props} {...chatState} />;
};

export default AgentChat;
export { AgentChat };
export type { AgentChatProps };
