/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionListParam } from '../models/ActionListParam';
import type { CreateActionParams } from '../models/CreateActionParams';
import type { UpdateActionParams } from '../models/UpdateActionParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request, upload } from '../core/request';
import {
  useRequest,
  UseRequestOption,
  UseRequestProperties,
} from '@app-studio/react-request';

/**
 * Create a product and its generation action
 * @param objectType ObjectType: profile,news,comment,feature,feedback,project,action,page,component,grant,application,survey
 * @param requestBody
 * @returns any
 * @throws ApiError
 */
export const actionControllerCreate = (
  objectType:
    | 'profile'
    | 'news'
    | 'comment'
    | 'feature'
    | 'feedback'
    | 'project'
    | 'action'
    | 'page'
    | 'component'
    | 'grant'
    | 'application'
    | 'survey',
  requestBody: CreateActionParams
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/action/create/${objectType}`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As a user, I want to find a specific action by criteria
 * @param requestBody
 * @returns any Action found
 * @throws ApiError
 */
export const actionControllerList = (
  requestBody: ActionListParam
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/action/list`,
    body: requestBody,
    mediaType: 'application/json',
  });
};

/**
 * As an admin, I want to update a action
 * @param actionId
 * @param stepId
 * @param requestBody
 * @returns any action updated
 * @throws ApiError
 */
export const actionControllerUpdateStepResult = (
  actionId: string,
  stepId: string,
  requestBody: UpdateActionParams
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/action/step/${actionId}/${stepId}`,
    body: requestBody,
    mediaType: 'application/json',
    errors: {
      401: `Incorrect credentials`,
    },
  });
};

/**
 * As an admin, I want to update a action
 * @param stepId
 * @returns any action updated
 * @throws ApiError
 */
export const actionControllerUpdateStepStatus = (
  stepId: string
): CancelablePromise<any> => {
  return __request({
    method: 'PATCH',
    path: `/action/status/${stepId}`,
    errors: {
      401: `Incorrect credentials`,
      404: `action not found`,
    },
  });
};

/**
 * @param actionId
 * @returns any
 * @throws ApiError
 */
export const actionControllerAnalyze = (
  actionId: string
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/action/next/${actionId}`,
  });
};

/**
 * Restart a failed workflow step
 * @param actionId
 * @param stepId
 * @returns any Step restarted successfully
 * @throws ApiError
 */
export const actionControllerRestartStep = (
  actionId: string,
  stepId: string
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/action/restart-step/${actionId}/${stepId}`,
    errors: {
      404: `Action or step not found`,
    },
  });
};

/**
 * As a user, I want to read a specific action
 * @param actionId
 * @returns any action details fetched
 * @throws ApiError
 */
export const actionControllerGet = (
  actionId: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/action/details/${actionId}`,
    errors: {
      404: `action not found`,
    },
  });
};

/**
 * Get action configuration for a specific object type
 * @param objectType
 * @returns any Action configuration retrieved successfully
 * @throws ApiError
 */
export const actionControllerGetActionConfig = (
  objectType: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/action/config/${objectType}`,
    errors: {
      404: `Action configuration not found for the specified object type`,
    },
  });
};

/**
 * Get form configuration for a step by action ID and step name
 * @param actionId
 * @param stepName
 * @returns any Form configuration retrieved successfully
 * @throws ApiError
 */
export const actionControllerGetFormConfigByStepName = (
  actionId: string,
  stepName: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/action/form-config/${actionId}/${stepName}`,
    errors: {
      404: `Action or step not found, or step is not a form step`,
    },
  });
};

/**
 * Get workflow steps configuration for a step by action ID and step name
 * @param actionId
 * @param stepName
 * @returns any Workflow steps configuration retrieved successfully
 * @throws ApiError
 */
export const actionControllerGetWorkflowStepsByStepName = (
  actionId: string,
  stepName: string
): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/action/workflow-steps/${actionId}/${stepName}`,
    errors: {
      404: `Action or step not found`,
    },
  });
};

/**
 * Generate product content based on analysis
 * @param actionId
 * @param stepId
 * @returns any
 * @throws ApiError
 */
export const actionControllerGenerate = (
  actionId: string,
  stepId: string
): CancelablePromise<any> => {
  return __request({
    method: 'POST',
    path: `/action/start/${actionId}/${stepId}`,
  });
};

export const useActionControllerCreateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (
    objectType:
      | 'profile'
      | 'news'
      | 'comment'
      | 'feature'
      | 'feedback'
      | 'project'
      | 'action'
      | 'page'
      | 'component'
      | 'grant'
      | 'application'
      | 'survey',
    requestBody: CreateActionParams
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerCreate, { method, ...options });
};

export const useActionControllerListService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (requestBody: ActionListParam) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerList, { method, ...options });
};

export const useActionControllerUpdateStepResultService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (
    actionId: string,
    stepId: string,
    requestBody: UpdateActionParams
  ) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerUpdateStepResult, { method, ...options });
};

export const useActionControllerUpdateStepStatusService = ({
  method = 'PATCH',
  ...options
}: UseRequestOption = {}): {
  run: (stepId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerUpdateStepStatus, { method, ...options });
};

export const useActionControllerAnalyzeService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (actionId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerAnalyze, { method, ...options });
};

export const useActionControllerRestartStepService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (actionId: string, stepId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerRestartStep, { method, ...options });
};

export const useActionControllerGetService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (actionId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerGet, { method, ...options });
};

export const useActionControllerGetActionConfigService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (objectType: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerGetActionConfig, { method, ...options });
};

export const useActionControllerGetFormConfigByStepNameService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (actionId: string, stepName: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerGetFormConfigByStepName, {
    method,
    ...options,
  });
};

export const useActionControllerGetWorkflowStepsByStepNameService = ({
  method = 'GET',
  ...options
}: UseRequestOption = {}): {
  run: (actionId: string, stepName: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerGetWorkflowStepsByStepName, {
    method,
    ...options,
  });
};

export const useActionControllerGenerateService = ({
  method = 'POST',
  ...options
}: UseRequestOption = {}): {
  run: (actionId: string, stepId: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(actionControllerGenerate, { method, ...options });
};
