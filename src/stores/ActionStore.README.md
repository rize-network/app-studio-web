# ActionStore - Workflow Step Management

## Overview

The `ActionStore` is a Zustand-based state management solution for handling actions and their workflow steps. It provides special logic for merging results when starting and finishing workflow steps.

## Key Features

### 1. **Result Merging on Workflow Step Start**

When starting a step of type `workflow`, the store automatically:
- Retrieves the action's existing result
- Merges it with the provided workflow inputs
- Passes the merged data to start the workflow step

This ensures that workflow steps have access to all accumulated data from previous steps.

### 2. **Result Merging on Workflow Step Finish**

When finishing a step of type `workflow`, the store automatically:
- Takes the workflow's output result
- Merges it with the action's accumulated result
- Saves both the step result and updates the action's overall result

This ensures that results from workflow steps are preserved in the action's state.

## Installation

The ActionStore is already available in the stores directory:

```typescript
import { useActionStore, useAction } from 'src/stores/ActionStore';
```

## Basic Usage

### Starting a Workflow Step

```typescript
import { useActionStore } from 'src/stores/ActionStore';

const MyComponent = () => {
  const { startWorkflowStep } = useActionStore();

  const handleStart = async () => {
    const workflowInputs = {
      taskName: 'generate-content',
      parameters: { format: 'markdown' }
    };

    // The action's existing result will be merged with workflowInputs
    const result = await startWorkflowStep(actionId, stepId, workflowInputs);
  };

  return <button onClick={handleStart}>Start Step</button>;
};
```

**What happens internally:**
1. Action result: `{ userId: '123', projectData: {...} }`
2. Workflow inputs: `{ taskName: 'generate-content', parameters: {...} }`
3. **Merged inputs sent to workflow:** `{ userId: '123', projectData: {...}, taskName: 'generate-content', parameters: {...} }`

### Finishing a Workflow Step

```typescript
import { useActionStore } from 'src/stores/ActionStore';

const MyComponent = () => {
  const { finishWorkflowStep } = useActionStore();

  const handleFinish = async () => {
    const workflowResult = {
      generatedContent: { title: 'Article', body: '...' },
      status: 'success'
    };

    // The workflow result will be merged with the action's existing result
    const mergedResult = await finishWorkflowStep(actionId, stepId, workflowResult);
  };

  return <button onClick={handleFinish}>Finish Step</button>;
};
```

**What happens internally:**
1. Action result before: `{ userId: '123', projectData: {...} }`
2. Workflow result: `{ generatedContent: {...}, status: 'success' }`
3. **Merged action result after:** `{ userId: '123', projectData: {...}, generatedContent: {...}, status: 'success' }`

## Advanced Usage

### Complete Workflow Lifecycle

```typescript
const WorkflowComponent = ({ actionId, stepId }) => {
  const { startWorkflowStep, finishWorkflowStep } = useActionStore();

  const runWorkflow = async () => {
    // 1. Start with inputs
    const inputs = { taskType: 'analysis', config: {...} };
    await startWorkflowStep(actionId, stepId, inputs);

    // 2. Workflow executes (happens on backend or in separate process)
    // ... workflow processing ...

    // 3. Finish with results
    const results = { analysis: {...}, insights: [...] };
    const finalResult = await finishWorkflowStep(actionId, stepId, results);

    console.log('Final merged result:', finalResult);
  };

  return <button onClick={runWorkflow}>Run Workflow</button>;
};
```

### Accessing Action State

```typescript
import { useAction, useActionLoading, useActionError } from 'src/stores/ActionStore';

const ActionDetails = ({ actionId }) => {
  const action = useAction(actionId);
  const isLoading = useActionLoading();
  const error = useActionError();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!action) return <div>Not found</div>;

  return (
    <div>
      <h2>{action.name}</h2>
      <p>Current Step: {action.currentStepId}</p>

      {/* Display accumulated results */}
      <pre>{JSON.stringify(action.result, null, 2)}</pre>

      {/* Display steps */}
      {action.steps.map(step => (
        <div key={step.id}>
          {step.name} - {step.status}
          {step.type === 'workflow' && ' (Workflow)'}
        </div>
      ))}
    </div>
  );
};
```

### Manual Result Merging

```typescript
const { mergeResults } = useActionStore();

const baseResult = { userId: '123', settings: { theme: 'dark' } };
const newData = { settings: { language: 'es' }, newField: 'value' };

const merged = mergeResults(baseResult, newData);
// Result: { userId: '123', settings: { theme: 'dark', language: 'es' }, newField: 'value' }
```

## API Reference

### State

| Property | Type | Description |
|----------|------|-------------|
| `actions` | `Record<string, Action>` | Dictionary of actions by ID |
| `isLoading` | `boolean` | Loading state for async operations |
| `error` | `string \| null` | Error message if operation failed |

### Actions (Methods)

#### `getAction(actionId: string): Promise<Action | null>`
Fetches action details from the API and stores in state.

#### `setAction(action: Action): void`
Manually sets an action in the store.

#### `startWorkflowStep(actionId: string, stepId: string, workflowInputs?: any): Promise<any>`
**For workflow steps:** Merges action result with workflow inputs, then starts the step.

**Parameters:**
- `actionId` - The ID of the action
- `stepId` - The ID of the step to start
- `workflowInputs` - Optional inputs specific to this workflow

**Returns:** The API response from starting the step

**Behavior:**
- For workflow steps: Merges action result → workflow inputs → starts step
- For other steps: Simply starts the step

#### `finishWorkflowStep(actionId: string, stepId: string, workflowResult: any): Promise<any>`
**For workflow steps:** Merges workflow result with action result and saves both.

**Parameters:**
- `actionId` - The ID of the action
- `stepId` - The ID of the step to finish
- `workflowResult` - The result from the workflow execution

**Returns:** The merged result

**Behavior:**
- For workflow steps: Saves step result → merges with action result → updates action
- For other steps: Simply saves the step result

#### `updateStepResult(actionId: string, stepId: string, result: any): Promise<any>`
Generic method to update any step's result without merging logic.

#### `mergeResults(actionResult: any, workflowResult: any): any`
Helper method to deep merge two result objects. Workflow result properties override action result properties.

### Hooks

#### `useAction(actionId: string): Action | undefined`
Hook to access a specific action from the store.

#### `useActionLoading(): boolean`
Hook to access the loading state.

#### `useActionError(): string | null`
Hook to access the error state.

## Data Structures

### Action Type

```typescript
type Action = {
  id: string;
  name: string;
  projectId: string;
  steps: ActionStep[];
  result?: any;              // Accumulated results from all steps
  currentStepId?: string;    // Currently executing step
};
```

### ActionStep Type

```typescript
type ActionStep = {
  id: string;
  name: string;
  type: string;              // 'workflow', 'form', 'ai', etc.
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ERROR';
  result?: any;              // Step-specific result
  error?: any;               // Error if step failed
  inputs?: any;              // Inputs used for this step
};
```

## Result Merging Logic

The store uses **deep merging** to combine results:

```typescript
const actionResult = {
  user: { id: '123', name: 'John' },
  settings: { theme: 'dark', language: 'en' }
};

const workflowResult = {
  settings: { language: 'es', region: 'EU' },
  analysis: { score: 95 }
};

// Deep merge result:
{
  user: { id: '123', name: 'John' },        // Preserved from action
  settings: {
    theme: 'dark',                           // Preserved from action
    language: 'es',                          // Overridden by workflow
    region: 'EU'                             // Added by workflow
  },
  analysis: { score: 95 }                   // Added by workflow
}
```

**Rules:**
1. Nested objects are merged recursively
2. Workflow result properties override action result properties
3. Arrays are replaced (not merged)
4. `null` or `undefined` values are skipped

## When to Use Workflow Steps

Use workflow steps (with type `'workflow'`) when:
1. The step needs access to accumulated data from previous steps
2. The step produces results that should be merged with the action's state
3. The step is part of a larger multi-step process
4. You want automatic result preservation across steps

## Error Handling

```typescript
const { startWorkflowStep, error } = useActionStore();

const handleStart = async () => {
  try {
    await startWorkflowStep(actionId, stepId, inputs);
  } catch (err) {
    console.error('Failed to start workflow:', err);
    // The error will also be in useActionStore().error
  }
};
```

## Best Practices

1. **Always specify step type:** Mark workflow steps with `type: 'workflow'`
2. **Use descriptive result keys:** Make merged results easy to understand
3. **Avoid result conflicts:** Use unique keys for different step results
4. **Handle errors:** Always wrap async calls in try-catch
5. **Type safety:** Define specific types for your action results
6. **Load actions early:** Fetch action data before starting workflows

## Examples

See `ActionStore.example.tsx` for complete working examples of:
- Starting workflow steps with merged inputs
- Finishing workflow steps with merged results
- Complete workflow lifecycle management
- Using React hooks with ActionStore
- Manual result merging

## Testing

```typescript
// Mock example for testing
const mockActionStore = {
  actions: {
    'action-1': {
      id: 'action-1',
      name: 'Test Action',
      result: { userId: '123' }
    }
  },
  startWorkflowStep: jest.fn(),
  finishWorkflowStep: jest.fn(),
  mergeResults: (a, b) => ({ ...a, ...b })
};
```

## Notes

- The store automatically handles workflow step type detection
- Non-workflow steps are processed normally without merging
- Results are persisted to the backend via the ActionService API
- Local state is updated optimistically for better UX
