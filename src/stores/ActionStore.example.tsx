/**
 * Example Usage of ActionStore for Workflow Steps
 *
 * This file demonstrates how to use the ActionStore to manage workflow action steps
 * with proper result merging when starting and finishing steps.
 */

import React from 'react';
import { useActionStore, useAction } from './ActionStore';

/**
 * Example 1: Starting a workflow step with merged inputs
 */
export const StartWorkflowStepExample: React.FC<{
  actionId: string;
  stepId: string;
}> = ({ actionId, stepId }) => {
  const { startWorkflowStep, isLoading, error } = useActionStore();

  const handleStartWorkflowStep = async () => {
    try {
      // Define workflow-specific inputs
      const workflowInputs = {
        taskName: 'generate-content',
        parameters: {
          format: 'markdown',
          language: 'en',
        },
      };

      /**
       * When starting a workflow step:
       * 1. The action's existing result is retrieved
       * 2. It's merged with the workflow inputs
       * 3. The merged data is used to start the workflow
       *
       * Example:
       * - Action result: { userId: '123', projectData: { name: 'MyProject' } }
       * - Workflow inputs: { taskName: 'generate-content', parameters: {...} }
       * - Merged inputs: { userId: '123', projectData: {...}, taskName: '...', parameters: {...} }
       */
      const result = await startWorkflowStep(actionId, stepId, workflowInputs);

      console.log('Workflow step started with merged inputs:', result);
    } catch (err) {
      console.error('Failed to start workflow step:', err);
    }
  };

  return (
    <div>
      <button onClick={handleStartWorkflowStep} disabled={isLoading}>
        {isLoading ? 'Starting...' : 'Start Workflow Step'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

/**
 * Example 2: Finishing a workflow step with merged results
 */
export const FinishWorkflowStepExample: React.FC<{
  actionId: string;
  stepId: string;
}> = ({ actionId, stepId }) => {
  const { finishWorkflowStep, isLoading, error } = useActionStore();
  const action = useAction(actionId);

  const handleFinishWorkflowStep = async () => {
    try {
      // Define the workflow result
      const workflowResult = {
        generatedContent: {
          title: 'Generated Article',
          body: 'This is the generated content...',
          metadata: {
            wordCount: 500,
            readingTime: '2 min',
          },
        },
        status: 'success',
        timestamp: new Date().toISOString(),
      };

      /**
       * When finishing a workflow step:
       * 1. The workflow result is merged with the action's existing result
       * 2. The step result is saved
       * 3. The action result is updated with the merged data
       *
       * Example:
       * - Action result: { userId: '123', projectData: { name: 'MyProject' } }
       * - Workflow result: { generatedContent: {...}, status: 'success' }
       * - Merged result: { userId: '123', projectData: {...}, generatedContent: {...}, status: 'success' }
       */
      const mergedResult = await finishWorkflowStep(
        actionId,
        stepId,
        workflowResult
      );

      console.log('Workflow step finished. Merged result:', mergedResult);
    } catch (err) {
      console.error('Failed to finish workflow step:', err);
    }
  };

  return (
    <div>
      <button onClick={handleFinishWorkflowStep} disabled={isLoading}>
        {isLoading ? 'Finishing...' : 'Finish Workflow Step'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {action && (
        <div>
          <h3>Current Action Result:</h3>
          <pre>{JSON.stringify(action.result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

/**
 * Example 3: Complete workflow step lifecycle
 */
export const WorkflowStepLifecycleExample: React.FC<{
  actionId: string;
  stepId: string;
}> = ({ actionId, stepId }) => {
  const { startWorkflowStep, finishWorkflowStep, isLoading } = useActionStore();
  const action = useAction(actionId);
  const [step, setStep] = React.useState<'idle' | 'started' | 'finished'>('idle');

  const runWorkflowStep = async () => {
    try {
      // Step 1: Start the workflow step with inputs
      setStep('idle');
      const workflowInputs = {
        taskType: 'content-generation',
        config: {
          model: 'gpt-4',
          maxTokens: 2000,
        },
      };

      console.log('Starting workflow step...');
      await startWorkflowStep(actionId, stepId, workflowInputs);
      setStep('started');
      console.log('Workflow step started successfully');

      // Simulate workflow execution time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 2: Finish the workflow step with results
      const workflowResult = {
        output: {
          content: 'Generated content here...',
          tokensUsed: 1500,
        },
        executionTime: 1800,
        success: true,
      };

      console.log('Finishing workflow step...');
      const finalResult = await finishWorkflowStep(actionId, stepId, workflowResult);
      setStep('finished');
      console.log('Final merged result:', finalResult);
    } catch (err) {
      console.error('Workflow step lifecycle error:', err);
      setStep('idle');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Workflow Step Lifecycle</h3>
      <div style={{ marginBottom: '10px' }}>
        <strong>Status:</strong> {step}
      </div>
      <button onClick={runWorkflowStep} disabled={isLoading || step !== 'idle'}>
        {isLoading ? 'Processing...' : 'Run Complete Workflow'}
      </button>
      {action && (
        <div style={{ marginTop: '20px' }}>
          <h4>Action Details:</h4>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(action, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

/**
 * Example 4: Using the mergeResults helper directly
 */
export const MergeResultsExample: React.FC = () => {
  const { mergeResults } = useActionStore();

  const demonstrateMerging = () => {
    const actionResult = {
      userId: '123',
      projectData: {
        name: 'MyProject',
        settings: {
          theme: 'dark',
          language: 'en',
        },
      },
    };

    const workflowResult = {
      generatedContent: 'New content',
      projectData: {
        settings: {
          language: 'es', // This will override the action result's language
          region: 'EU', // This is new and will be added
        },
      },
      newField: 'This is completely new',
    };

    const merged = mergeResults(actionResult, workflowResult);

    console.log('Original action result:', actionResult);
    console.log('Workflow result:', workflowResult);
    console.log('Merged result:', merged);

    /**
     * Expected merged result:
     * {
     *   userId: '123',
     *   projectData: {
     *     name: 'MyProject',
     *     settings: {
     *       theme: 'dark',
     *       language: 'es',    // Updated from workflow
     *       region: 'EU'        // Added from workflow
     *     }
     *   },
     *   generatedContent: 'New content',
     *   newField: 'This is completely new'
     * }
     */

    return merged;
  };

  return (
    <div>
      <button onClick={demonstrateMerging}>
        Demonstrate Result Merging
      </button>
      <p>Check the console for output</p>
    </div>
  );
};

/**
 * Example 5: Using ActionStore with React hooks
 */
export const ActionStoreHooksExample: React.FC<{ actionId: string }> = ({
  actionId,
}) => {
  const { getAction } = useActionStore();
  const action = useAction(actionId);
  const isLoading = useActionStore((state) => state.isLoading);
  const error = useActionStore((state) => state.error);

  React.useEffect(() => {
    // Load action on mount
    getAction(actionId);
  }, [actionId]);

  if (isLoading) return <div>Loading action...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!action) return <div>Action not found</div>;

  return (
    <div>
      <h3>{action.name}</h3>
      <p>Project ID: {action.projectId}</p>
      <p>Current Step: {action.currentStepId || 'None'}</p>

      <h4>Steps:</h4>
      <ul>
        {action.steps?.map((step) => (
          <li key={step.id}>
            {step.name} - {step.status}
            {step.type === 'workflow' && ' (Workflow Step)'}
          </li>
        ))}
      </ul>

      {action.result && (
        <>
          <h4>Action Result:</h4>
          <pre>{JSON.stringify(action.result, null, 2)}</pre>
        </>
      )}
    </div>
  );
};
