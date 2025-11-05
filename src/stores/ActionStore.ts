import { create } from 'zustand';
import { ActionService } from 'src/services/api';
import type { UpdateActionParams } from 'src/services/api/models/UpdateActionParams';

/**
 * Helper function to deep merge two objects
 * Later properties overwrite earlier ones
 */
const deepMerge = (target: any, source: any): any => {
  if (!source) return target;
  if (!target) return source;

  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
};

const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Action Step type definition
 */
export type ActionStep = {
  id: string;
  name: string;
  type: string; // e.g., 'workflow', 'form', 'ai', etc.
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ERROR';
  result?: any;
  error?: any;
  inputs?: any;
};

/**
 * Action type definition
 */
export type Action = {
  id: string;
  name: string;
  projectId: string;
  steps: ActionStep[];
  result?: any;
  currentStepId?: string;
};

type ActionState = {
  actions: Record<string, Action>;
  isLoading: boolean;
  error: string | null;

  // Action CRUD operations
  getAction: (actionId: string) => Promise<Action | null>;
  setAction: (action: Action) => void;

  // Workflow step operations
  startWorkflowStep: (
    actionId: string,
    stepId: string,
    workflowInputs?: any
  ) => Promise<any>;
  finishWorkflowStep: (
    actionId: string,
    stepId: string,
    workflowResult: any
  ) => Promise<any>;

  // Step result operations
  updateStepResult: (
    actionId: string,
    stepId: string,
    result: any
  ) => Promise<any>;

  // Helper operations
  mergeResults: (actionResult: any, workflowResult: any) => any;
};

export const useActionStore = create<ActionState>((set, get) => ({
  actions: {},
  isLoading: false,
  error: null,

  /**
   * Fetch action details from the API
   */
  getAction: async (actionId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await ActionService.actionControllerGet(actionId);

      if (response?.data) {
        const action = response.data as Action;
        set((state) => ({
          actions: {
            ...state.actions,
            [actionId]: action,
          },
          isLoading: false,
        }));
        return action;
      }

      set({ isLoading: false });
      return null;
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to fetch action' });
      console.error('Error fetching action:', error);
      return null;
    }
  },

  /**
   * Set action in local state
   */
  setAction: (action: Action) => {
    set((state) => ({
      actions: {
        ...state.actions,
        [action.id]: action,
      },
    }));
  },

  /**
   * Start a workflow step
   * Merges action result with workflow inputs before starting
   *
   * When starting a step of type 'workflow', this method:
   * 1. Retrieves the current action and its result
   * 2. Merges the action result with the provided workflow inputs
   * 3. Starts the workflow step with the merged inputs
   */
  startWorkflowStep: async (
    actionId: string,
    stepId: string,
    workflowInputs?: any
  ) => {
    try {
      set({ isLoading: true, error: null });

      // Get the current action
      let action = get().actions[actionId];
      if (!action) {
        action = await get().getAction(actionId);
        if (!action) {
          throw new Error(`Action ${actionId} not found`);
        }
      }

      // Find the step
      const step = action.steps?.find((s) => s.id === stepId);
      if (!step) {
        throw new Error(`Step ${stepId} not found in action ${actionId}`);
      }

      // Check if this is a workflow step
      if (step.type === 'workflow') {
        // Merge action result with workflow inputs
        const mergedInputs = get().mergeResults(action.result, workflowInputs);

        // Update step with merged inputs
        const updatedSteps = action.steps.map((s) =>
          s.id === stepId
            ? { ...s, inputs: mergedInputs, status: 'IN_PROGRESS' as const }
            : s
        );

        // Update local state
        set((state) => ({
          actions: {
            ...state.actions,
            [actionId]: {
              ...action!,
              steps: updatedSteps,
              currentStepId: stepId,
            },
          },
        }));

        // Start the step via API
        const response = await ActionService.actionControllerGenerate(
          actionId,
          stepId
        );

        set({ isLoading: false });
        return response?.data || response;
      } else {
        // For non-workflow steps, just start them normally
        const response = await ActionService.actionControllerGenerate(
          actionId,
          stepId
        );

        set({ isLoading: false });
        return response?.data || response;
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to start workflow step'
      });
      console.error('Error starting workflow step:', error);
      throw error;
    }
  },

  /**
   * Finish a workflow step
   * Merges workflow result with action result and saves
   *
   * When finishing a step of type 'workflow', this method:
   * 1. Retrieves the current action and its result
   * 2. Merges the workflow result with the action result
   * 3. Updates both the step result and the action result
   */
  finishWorkflowStep: async (
    actionId: string,
    stepId: string,
    workflowResult: any
  ) => {
    try {
      set({ isLoading: true, error: null });

      // Get the current action
      let action = get().actions[actionId];
      if (!action) {
        action = await get().getAction(actionId);
        if (!action) {
          throw new Error(`Action ${actionId} not found`);
        }
      }

      // Find the step
      const step = action.steps?.find((s) => s.id === stepId);
      if (!step) {
        throw new Error(`Step ${stepId} not found in action ${actionId}`);
      }

      // Check if this is a workflow step
      if (step.type === 'workflow') {
        // Merge workflow result with action result
        const mergedResult = get().mergeResults(action.result, workflowResult);

        // Update the step result via API
        const updateParams: UpdateActionParams = {
          field: {
            result: workflowResult,
            status: 'COMPLETED',
          },
        };

        await ActionService.actionControllerUpdateStepResult(
          actionId,
          stepId,
          updateParams
        );

        // Update the action with merged result
        const actionUpdateParams: UpdateActionParams = {
          field: {
            result: mergedResult,
          },
        };

        // Note: If there's an API to update the entire action result, use it here
        // For now, we'll update local state
        const updatedSteps = action.steps.map((s) =>
          s.id === stepId
            ? { ...s, result: workflowResult, status: 'COMPLETED' as const }
            : s
        );

        // Update local state
        set((state) => ({
          actions: {
            ...state.actions,
            [actionId]: {
              ...action!,
              steps: updatedSteps,
              result: mergedResult,
            },
          },
          isLoading: false,
        }));

        return mergedResult;
      } else {
        // For non-workflow steps, just update the result normally
        const updateParams: UpdateActionParams = {
          field: {
            result: workflowResult,
            status: 'COMPLETED',
          },
        };

        const response = await ActionService.actionControllerUpdateStepResult(
          actionId,
          stepId,
          updateParams
        );

        set({ isLoading: false });
        return response?.data || response;
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to finish workflow step'
      });
      console.error('Error finishing workflow step:', error);
      throw error;
    }
  },

  /**
   * Update step result (general purpose)
   */
  updateStepResult: async (
    actionId: string,
    stepId: string,
    result: any
  ) => {
    try {
      set({ isLoading: true, error: null });

      const updateParams: UpdateActionParams = {
        field: { result },
      };

      const response = await ActionService.actionControllerUpdateStepResult(
        actionId,
        stepId,
        updateParams
      );

      // Update local state
      const action = get().actions[actionId];
      if (action) {
        const updatedSteps = action.steps.map((s) =>
          s.id === stepId ? { ...s, result } : s
        );

        set((state) => ({
          actions: {
            ...state.actions,
            [actionId]: {
              ...action,
              steps: updatedSteps,
            },
          },
          isLoading: false,
        }));
      } else {
        set({ isLoading: false });
      }

      return response?.data || response;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to update step result'
      });
      console.error('Error updating step result:', error);
      throw error;
    }
  },

  /**
   * Merge two result objects
   * Deep merges workflowResult into actionResult
   */
  mergeResults: (actionResult: any, workflowResult: any) => {
    return deepMerge(actionResult || {}, workflowResult || {});
  },
}));

/**
 * Selector hooks for convenient access to specific actions
 */
export const useAction = (actionId: string) => {
  return useActionStore((state) => state.actions[actionId]);
};

export const useActionLoading = () => {
  return useActionStore((state) => state.isLoading);
};

export const useActionError = () => {
  return useActionStore((state) => state.error);
};
