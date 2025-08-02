import React from 'react';
import { AgentTraceProps } from './AgentTrace/AgentTrace.props';
import AgentTraceView from './AgentTrace/AgentTrace.view';
import { useAgentTrace } from './AgentTrace/AgentTrace.state';

/**
 * AgentTrace Component
 * 
 * A comprehensive trace visualization component for ADK agents.
 * Displays execution traces, events, and performance metrics in an interactive format.
 * 
 * @example
 * ```tsx
 * <AgentTrace
 *   sessionId="session-123"
 *   userId="user123"
 *   appName="my-agent"
 *   onEventSelect={(event) => console.log('Event selected:', event)}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // With custom visualization and filtering
 * <AgentTrace
 *   sessionId="session-123"
 *   userId="user123"
 *   appName="my-agent"
 *   showTimeline={true}
 *   showMetrics={true}
 *   enableFiltering={true}
 *   enableExport={true}
 *   visualizationType="tree"
 *   autoRefresh={true}
 *   refreshInterval={5000}
 *   views={{
 *     container: { backgroundColor: 'color.gray.50' },
 *     timeline: { height: '200px' },
 *     eventList: { maxHeight: '400px' }
 *   }}
 * />
 * ```
 */
const AgentTrace: React.FC<AgentTraceProps> = (props) => {
  const traceState = useAgentTrace(props);

  return <AgentTraceView {...props} {...traceState} />;
};

export default AgentTrace;
export { AgentTrace };
export type { AgentTraceProps };
