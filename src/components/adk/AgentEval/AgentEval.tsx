import React from 'react';
import { AgentEvalProps } from './AgentEval/AgentEval.props';
import AgentEvalView from './AgentEval/AgentEval.view';
import { useAgentEval } from './AgentEval/AgentEval.state';

/**
 * AgentEval Component
 * 
 * A comprehensive evaluation component for ADK agents.
 * Handles evaluation creation, execution, monitoring, and results analysis.
 * 
 * @example
 * ```tsx
 * <AgentEval
 *   appName="my-agent"
 *   userId="user123"
 *   onEvaluationComplete={(result) => console.log('Evaluation complete:', result)}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // With custom evaluation configuration
 * <AgentEval
 *   appName="my-agent"
 *   userId="user123"
 *   enableBatchEvaluation={true}
 *   enableMetricsComparison={true}
 *   enableResultExport={true}
 *   maxConcurrentEvals={5}
 *   autoRefresh={true}
 *   refreshInterval={10000}
 *   views={{
 *     container: { backgroundColor: 'color.gray.50' },
 *     evaluationList: { maxHeight: '400px' },
 *     resultsPanel: { minHeight: '300px' }
 *   }}
 * />
 * ```
 */
const AgentEval: React.FC<AgentEvalProps> = (props) => {
  const evalState = useAgentEval(props);

  return <AgentEvalView {...props} {...evalState} />;
};

export default AgentEval;
export { AgentEval };
export type { AgentEvalProps };
