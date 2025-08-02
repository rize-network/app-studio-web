import React from 'react';
import { AgentSessionProps } from './AgentSession/AgentSession.props';
import AgentSessionView from './AgentSession/AgentSession.view';
import { useAgentSession } from './AgentSession/AgentSession.state';

/**
 * AgentSession Component
 * 
 * A comprehensive session management component for ADK agents.
 * Handles session creation, listing, selection, deletion, and state management.
 * 
 * @example
 * ```tsx
 * <AgentSession
 *   appName="my-agent"
 *   userId="user123"
 *   onSessionSelect={(session) => console.log('Selected:', session)}
 *   onSessionCreate={(session) => console.log('Created:', session)}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // With custom styling and features
 * <AgentSession
 *   appName="my-agent"
 *   userId="user123"
 *   showSessionHistory={true}
 *   enableSessionImport={true}
 *   enableSessionExport={true}
 *   maxSessions={50}
 *   autoRefresh={true}
 *   refreshInterval={30000}
 *   views={{
 *     container: { backgroundColor: 'color.gray.50' },
 *     sessionList: { maxHeight: '400px' },
 *     sessionItem: { borderRadius: '8px' }
 *   }}
 * />
 * ```
 */
const AgentSession: React.FC<AgentSessionProps> = (props) => {
  const sessionState = useAgentSession(props);

  return <AgentSessionView {...props} {...sessionState} />;
};

export default AgentSession;
export { AgentSession };
export type { AgentSessionProps };
